# Waqas Ishaque - Personal Blog & Tools

Personal blog and development tools built with Next.js, Fumadocs, Better Auth, and Fuma Comment.

## Prerequisites

- Node.js 18+ or Bun
- PostgreSQL database (Supabase/Neon recommended)
- GitHub OAuth App
- Google OAuth App (optional)

## Environment Setup

Create `apps/web/.env.local`:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# GitHub OAuth (required)
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

## OAuth Setup

### GitHub OAuth
1. Go to https://github.com/settings/developers
2. Create new OAuth App
3. Set Homepage URL: `http://localhost:3000`
4. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
5. Copy Client ID and Secret to `.env.local`

### Google OAuth
1. Go to https://console.cloud.google.com/apis/credentials
2. Create OAuth 2.0 Client ID
3. Add Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Copy Client ID and Secret to `.env.local`

## Installation

```bash
# Install dependencies
pnpm install

# Push database schema
cd apps/web
pnpm db:push

# Start development server
pnpm dev
```

Visit `http://localhost:3000`

## Database Management

```bash
# Push schema changes
pnpm db:push

# Generate migrations
pnpm db:generate

# Open Drizzle Studio
pnpm db:studio
```

## Production Setup

### Environment Variables

Add all `.env.local` variables to your hosting platform with production values:
- Update `NEXT_PUBLIC_APP_URL` to your domain
- Update OAuth callback URLs to production domain

### OAuth Production URLs

**GitHub:**
- Homepage URL: `https://yourdomain.com`
- Callback URL: `https://yourdomain.com/api/auth/callback/github`

**Google:**
- Authorized redirect URI: `https://yourdomain.com/api/auth/callback/google`

### Deploy

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

Or deploy to Vercel/Netlify (recommended).

## Content Management

### Add Blog Posts

Create MDX files in `apps/web/content/blog/`:

```mdx
---
title: Your Post Title
description: Post description
date: 2024-01-01
author: Your Name
tags: [tag1, tag2]
---

Your content here...
```

### Add Tools

Create tool pages in `apps/web/app/(home)/tools/[tool-name]/page.tsx`

## Features

- 📝 MDX blog with syntax highlighting
- 🔐 Authentication (GitHub/Google OAuth)
- 💬 Comments system (Fuma Comment)
- 🏷️ Tag-based filtering
- 🔍 Search functionality
- 🎨 CSS Clamp Calculator tool
- 📱 Responsive design
- 🌓 Dark mode

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Fumadocs (Blog & Docs)
- Better Auth (Authentication)
- Fuma Comment (Comments)
- Drizzle ORM (Database)
- PostgreSQL (Database)

## Project Structure

```
apps/web/
├── app/                    # Next.js app directory
│   ├── (home)/            # Main site pages
│   │   ├── blog/          # Blog pages
│   │   ├── tags/          # Tag pages
│   │   ├── tools/         # Tool pages
│   │   └── (auth)/        # Auth pages
│   └── api/               # API routes
├── components/            # React components
├── content/               # MDX blog content
│   └── blog/             # Blog posts
├── lib/                   # Utilities
├── server/               # Server-side code
│   ├── auth/             # Better Auth config
│   ├── comments/         # Fuma Comment config
│   └── db/               # Database & schemas
└── public/               # Static assets
```

## License

MIT
