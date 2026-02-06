#  技术设计方案

## 1. 系统架构概述 (Architecture Overview)

项目采用典型的前后端分离（Decoupled）架构，通过 RESTful API 进行交互。

- **Frontend:** React (Vite) + Tailwind CSS + Axios
- **Backend:** Node.js (Express)
- **Database:** MongoDB
- **Storage:** Local File System (MVP 阶段使用本地存储，预留 OSS 接口)

------

## 2. 数据模型设计 (Data Models)

### 2.1 用户模型 (User)

JavaScript

```
{
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // 存储为 Bcrypt Hash
  createdAt: { type: Date, default: Date.now }
}
```

### 2.2 游戏模型 (Game)

JavaScript

```
{
  title: { type: String, required: true },
  description: { type: String },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  coverPath: { type: String }, // 封面图片的相对访问路径
  gameFolderName: { type: String, required: true }, // 解压后的目录名
  entryPoint: { type: String, default: 'index.html' }, // 入口文件名
  createdAt: { type: Date, default: Date.now }
}
```

------

## 3. 核心功能流程 (Core Logic)

### 3.1 游戏上传与解压流程

这是本项目的技术核心，需确保文件处理的原子性。

1. **接收请求：** `multer` 拦截请求，将 `.zip` 临时存入 `/uploads`。
2. **创建目录：** 基于 `uuid` 或时间戳在 `public/games/` 下创建唯一目录。
3. **流式解压：** 使用 `unzipper` 管道流将压缩包解压至目标目录。
4. **结构验证：** 扫描目标目录根路径。若不存在 `index.html`，触发回滚（删除目录和数据库记录）。
5. **静态激活：** 游戏现在可以通过 `http://host/content/{gameFolderName}/index.html` 访问。

### 3.2 Iframe 安全沙箱设计

为防止恶意游戏脚本攻击主站，前端渲染容器必须遵循以下配置：

HTML

```
<iframe
  src={playUrl}
  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
  allow="autoplay; fullscreen; keyboard"
  loading="lazy"
></iframe>
```

- `allow-same-origin`: 允许加载同源资源（如 .wasm）。
- `allow-scripts`: 允许游戏运行逻辑。

------

## 4. 关键接口定义 (API Endpoints)

### 4.1 游戏管理

- **POST `/api/games/upload`**
  - Content-Type: `multipart/form-data`
  - Payload: `{ title, description, file: Binary, cover: Binary }`
  - Success: `{ success: true, gameId, playUrl }`
- **GET `/api/games`**
  - Success: `[{ id, title, coverUrl, authorName }]`

------

## 5. 静态资源托管配置 (Static Assets)

后端 Express 需要特殊配置以支持 HTML5 游戏的各种 MIME 类型（特别是游戏引擎生成的特殊后缀）：

JavaScript

```
app.use('/content', express.static(path.join(__dirname, 'public/games'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.wasm')) res.set('Content-Type', 'application/wasm');
        if (path.endsWith('.data')) res.set('Content-Type', 'application/octet-stream');
    }
}));
```

------

## 6. 异常处理策略 (Error Handling)

| **场景**     | **处理方式**                   | **返回状态码**           |
| ------------ | ------------------------------ | ------------------------ |
| ZIP 损坏     | 捕获 `unzipper` 错误并返回报错 | 400 Bad Request          |
| 缺失入口文件 | 物理删除已解压目录，终止入库   | 422 Unprocessable Entity |
| 文件过大     | Multer 拦截并返回限制信息      | 413 Payload Too Large    |
| 跨域阻止     | 配置 `cors` 白名单中间件       | 403 Forbidden            |

------

## 7. 开发路线图 (Roadmap)

1. **Sprint 1:** 环境搭建与 `multer` 文件上传通路打通。
2. **Sprint 2:** 实现 `unzipper` 自动解压与物理文件校验。
3. **Sprint 3:** 前端 Iframe 容器开发与静态资源联调。
4. **Sprint 4:** 用户认证与个人作品集功能。
