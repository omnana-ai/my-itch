---
description: 常用开发命令
---

// turbo-all

## 启动开发服务器
```bash
npm run dev
```

## Git 提交推送
```bash
git add -A
git commit -m "提交信息"
git push
```

## 数据库操作
```bash
npx prisma db push
npx prisma generate
```

## 重启服务器
```bash
Stop-Process -Name "node" -Force; npm run dev
```
