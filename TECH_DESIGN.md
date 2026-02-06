# Technical Design Document - My-Itch

## 1. Technology Stack
- **Frontend**: Next.js 14+ (App Router), React, TailwindCSS.
- **Backend**: Next.js API Routes (Serverless functions).
- **Database**: Supabase (PostgreSQL) or Local SQLite for dev.
- **Storage**: Supabase Storage or AWS S3 (for game files).
- **Authentication**: NextAuth.js (Auth.js) or Supabase Auth.
- **Deployment**: Vercel.

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
/lib               # Utilities, DB clients
/public            # Static assets
```

### 2.2 Database Schema (Draft)
- **Users**: id, username, email, role, avatar_url.
- **Games**: id, developer_id, title, description, price, tags, status.
- **Builds**: id, game_id, file_path, version, platform.
- **Comments**: id, user_id, game_id, content, created_at.

## 3. Key Technical Challenges
- **Large File Uploads**: Need chunked uploads for game builds.
- **Security**: Sandboxing HTML5 games (iframe isolation).
- **Performance**: Caching game pages and assets.

## 4. Development Workflow
- `npm run dev`: Local development server.
- ESLint + Prettier for code quality.
