- # 核心开发指令集

  ## 1. 概述 (Overview)

  本项目的目标是构建一个类似 itch.io 的游戏分发平台原型。核心逻辑是：开发者上传包含 `index.html` 的 ZIP 压缩包，系统自动解压并提供在线试玩（Iframe 托管）。

  - **架构选择：** 前后端完全分离。
  - **后端：** Node.js (Express) + MongoDB。
  - **前端：** React (Vite) + Tailwind CSS。
  - **交付目标：** 实现从用户登录到游戏上传、自动解压、在线运行的完整闭环 Demo。

  ------

  ## 2. 开发规范 (Development Standards)

  ### 2.1 目录结构规范

  - `/backend`: 所有的 API 逻辑。
    - `/public/games`: 存放解压后的游戏静态资源。
    - `/uploads`: 存放 multer 接收的临时压缩包。
  - `/frontend`: 所有的 UI 逻辑。

  ### 2.2 命名与编码规范

  - **API 路由：** 遵循 RESTful 原则，统一前缀为 `/api/v1`。
  - **文件名：** 统一使用小写字母及中划线（kebab-case），如 `game-controller.js`。
  - **异步处理：** 强制使用 `async/await` 结合 `try-catch` 进行错误捕获。
  - **跨域：** 使用 `cors` 中间件，开发环境下允许 `origin: '*'`，生产环境需严格校验。

  ------

  ## 3. 设计要求 (Design Requirements)

  ### 3.1 核心流程指令

  - **上传逻辑：** 使用 `multer` 接收文件，文件重命名为 `Date.now() + originalName` 以防冲突。
  - **解压逻辑：** 1. 使用 `unzipper` 或 `adm-zip` 库。 2. 解压路径：`backend/public/games/{game_id}/`。 3. **自愈能力：** 若解压失败，必须物理删除已创建的半成品目录。
  - **展示逻辑：** 1. 前端 `GameCard` 需展示封面及标题。 2. 详情页使用 `iframe` 加载游戏。

  ### 3.2 UI/UX 设计

  - **主题：** 白色模式（White Mode），参考 itch.io 的品牌视觉。
  - **反馈：** 所有的 API 请求（登录、上传、加载）必须有 Loading 状态。
  - **安全保护：** `iframe` 必须包含 `sandbox="allow-scripts allow-same-origin"` 属性。

  ------

  ## 4. 注意事项 (Critical Precautions)

  ### 4.1 技术坑点预警

  - **ZIP 嵌套问题：** 许多引擎导出的 ZIP 会多包一层文件夹。AI 在执行解压逻辑时，需增加逻辑检查：若根目录没找到 `index.html`，需深入搜索一层或报错。
  - **静态资源 MIME：** 在 Express 托管静态目录时，必须确保 `.wasm` 文件的 `Content-Type` 为 `application/wasm`，否则部分游戏引擎（如 Unity）会无法加载。
  - **存储清理：** 定期清理 `/uploads` 里的原始压缩包，只保留解压后的静态资源。

  ### 4.2 安全与限制

  - **文件限制：** MVP 版本限制 ZIP 大小为 100MB。
  - **内存溢出：** 解压大型 ZIP 时建议使用 **流式处理 (Stream)** 而非一次性读取到内存。
  - **权限防护：** 虽然第一版不考虑复杂审核，但 API 必须验证 Token，防止未登录用户恶意灌水。
