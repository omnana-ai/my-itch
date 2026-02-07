# Technical Design Document - My-Itch

## 1. Technology Stack - CN Optimized
- **Frontend**: Next.js 14+ (App Router), React, TailwindCSS.
- **Backend**: Next.js Server Actions.
- **Database**: Tencent Cloud PostgreSQL (or MySQL).
- **ORM**: Prisma (Type-safe database client).
- **Storage**: Tencent Cloud COS (Object Storage) + CDN.
- **Authentication**: Auth.js (NextAuth) - Email/Password, optionally WeChat/GitHub.
- **Deployment**: Tencent Cloud Webify or CVM (Docker).

## 2. Architecture
### 2.1 Monorepo Structure
We will use a standard Next.js project structure:
```
/app
  /page.tsx        # Landing
  /browse/page.tsx # Discovery
  /games/[id]/     # Game details
  /dashboard/      # Developer tools
/components        # Shared UI components
/lib
  /prisma.ts       # DB Client
  /cos.ts          # Tencent Cloud Storage Client
/prisma
  schema.prisma    # Database Schema
/public            # Static assets
```

### 2.2 Database Schema (Prisma Draft)
- **User**: id, email, password_hash, name, avatar_url.
- **Game**: id, authorId, title, description, price, published.
- **Build**: id, gameId, file_key (COS key), version, platform.
- **Comment**: id, userId, gameId, content.

## 3. Key Technical Challenges
- **Large File Uploads**: Need chunked uploads for game builds.
- **Security**: Sandboxing HTML5 games (iframe isolation).
- **Performance**: Caching game pages and assets.

## 4. Development Workflow
- `npm run dev`: Local development server.
- ESLint + Prettier for code quality.
