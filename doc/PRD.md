# 产品需求文档 (PRD)

**文档版本：** V1.0

**状态：** 草案/原型开发中

**技术栈：** Node.js (Backend) + React/Next.js (Frontend)

------

## 1. 项目目标

打造一个简易的去中心化游戏托管平台，允许开发者上传 HTML5 游戏包，并允许玩家直接在网页端进行在线试玩。

## 2. 用户角色定义

- **开发者 (Creator)：** 能够上传游戏 ZIP 包，填写基础描述。
- **玩家 (Player)：** 能够浏览游戏列表，点击进入详情页并在浏览器内运行游戏。

------

## 3. 核心功能需求

### 3.1 账号系统 (Identity)

- **注册/登录：** 基础用户名和密码校验。
- **个人中心：** 用户可以查看自己已上传的游戏列表。

### 3.2 游戏上传模块 (Game Submission)

- **元数据填写：** 标题、简介。
- **封面上传：** 支持 `.jpg` 或 `.png`。
- **游戏包上传：**
  - 仅限 `.zip` 格式。
  - 后端逻辑：接收 -> 验证 -> 解压至静态资源目录 -> 存储 `index.html` 的相对路径。
  - **限制：** 第一阶段单文件最大支持 100MB。

### 3.3 游戏展示与试玩 (Discovery & Play)

- **首页列表：** 展示所有已上传游戏的封面、标题。
- **游戏详情页：**
  - 展示游戏简介。
  - **核心功能：** 嵌入一个 `<iframe>` 容器，加载后端托管的 HTML5 游戏入口文件。
- **全屏功能：** 提供一个按钮，触发 `iframe` 进入全屏模式。

------

## 4. 业务流程图

------

## 5. 技术接口需求 (API Specification)

| **接口路径**         | **方法** | **说明**     | **关键参数**             |
| -------------------- | -------- | ------------ | ------------------------ |
| `/api/auth/register` | POST     | 用户注册     | username, password       |
| `/api/games`         | GET      | 获取游戏列表 | page, limit              |
| `/api/games/:id`     | GET      | 获取游戏详情 | gameId                   |
| `/api/games/upload`  | POST     | 上传游戏包   | file (zip), title, cover |

------

## 6. 数据模型设计 (Database Schema)

### **User Table**

- `id`: UUID
- `username`: String (Unique)
- `password_hash`: String

### **Game Table**

- `id`: UUID
- `title`: String
- `description`: Text
- `author_id`: ForeignKey (User.id)
- `cover_path`: String (存储图片 URL)
- `game_folder_name`: String (解压后的文件夹名，例如 `game_17072100`)
- `created_at`: Timestamp

------

## 7. 非功能性需求 (Non-Functional)

1. **安全性：** `iframe` 必须开启 `sandbox` 属性，防止游戏脚本访问父页面的 Cookie。
2. **跨域：** 后端需开启 CORS 允许前端端口访问。
3. **异常处理：** 如果 ZIP 包中缺失 `index.html`，后端应返回明确的报错信息，不记录该条数据。

------

## 8. V1.1 预留扩展 (Backlog)

- 多平台下载按钮（支持 Windows/Mac 压缩包下载）。
- 评论系统。
- 开发者自定义页面背景色。

