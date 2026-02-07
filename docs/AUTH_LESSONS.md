# 登录功能开发总结

## 遇到的问题

### 1. Prisma 7.x 兼容性问题
- **现象**：`PrismaClient needs to be constructed with a non-empty, valid PrismaClientOptions`
- **原因**：Prisma 7 是全新大版本，API 发生重大变化
- **解决**：降级到 Prisma 5.x

### 2. 环境变量无法读取
- **现象**：`Environment variable not found: DATABASE_URL`
- **原因**：Turbopack 缓存 + .env 格式问题
- **解决**：在 schema.prisma 中硬编码 URL（开发阶段），重启服务器

### 3. NextAuth Secret 缺失
- **现象**：`MissingSecret: Please define a 'secret'`
- **原因**：NextAuth v5 需要显式配置 secret
- **解决**：在 auth.ts 中添加 `secret` 配置项

### 4. 数据库表不存在
- **现象**：`The table 'main.User' does not exist`
- **原因**：修改 schema 后未执行数据库同步
- **解决**：执行 `npx prisma db push`

### 5. 表单无提交逻辑
- **现象**：点击注册按钮无反应
- **原因**：表单是静态模板，没有绑定 onSubmit
- **解决**：添加 handleSubmit 函数调用 signIn

### 6. 用户名显示为邮箱
- **现象**：导航栏显示邮箱而非用户名
- **原因**：signIn 时没传 username，session callback 没传 name
- **解决**：修改 credentials 定义、authorize 函数和 session callback

## 教训

1. **使用稳定版本**：生产项目避免使用 alpha/beta 版本
2. **先验证后端**：用 curl/Postman 测试 API 再开发前端
3. **完整执行迁移**：修改 schema 后立即执行 db push
4. **重启清缓存**：修改环境变量后重启服务器并清除 .next

## 推荐版本

```json
{
  "prisma": "5.22.0",
  "@prisma/client": "5.22.0",
  "next-auth": "5.0.0-beta.25",
  "@auth/prisma-adapter": "^2.0.0"
}
```

## 开发流程

1. 安装依赖 → 2. 配置 .env → 3. 定义 schema → 4. prisma db push
5. 创建 auth.ts → 6. 创建 API route → 7. 测试 API → 8. 开发前端
