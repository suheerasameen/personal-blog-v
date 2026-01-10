# Waqas Ishaque - Personal Blog

Personal blog and development tools built with Next.js 15, Fumadocs, Better Auth, and Fuma Comment.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Fumadocs (Blog)
- Better Auth (GitHub/Google OAuth)
- Fuma Comment (Comments)
- Drizzle ORM + PostgreSQL
- UploadThing (Image uploads)
- GitHub Discussions (Feedback)
- Turborepo (Monorepo)

## Prerequisites

- Node.js 18+
- PostgreSQL database (Supabase/Neon recommended)
- GitHub OAuth App
- Google OAuth App (optional)
- UploadThing account


## Environment Variables

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

# UploadThing (for image uploads in comments)
UPLOADTHING_TOKEN="your_uploadthing_token"

# GitHub App (for Feedback)
GITHUB_APP_ID="your_app_id"
GITHUB_APP_PRIVATE_KEY="your_private_key_pem"
```

## Installation

```bash
# Install dependencies
pnpm install

# Push database schema
cd apps/web
pnpm db:push

# Start development server
cd ../..
pnpm dev
```

Visit http://localhost:3000

## OAuth Setup

### GitHub OAuth
1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Homepage URL: `http://localhost:3000`
4. Callback URL: `http://localhost:3000/api/auth/callback/github`
5. Copy Client ID and Secret to `.env.local`

### Google OAuth
1. Go to https://console.cloud.google.com/apis/credentials
2. Create OAuth 2.0 Client ID
3. Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Copy Client ID and Secret to `.env.local`

### UploadThing
1. Go to https://uploadthing.com/dashboard
2. Sign up and create an app
3. Copy secret token to `.env.local` as `UPLOADTHING_TOKEN`

### Feedback Feature Setup (GitHub Discussions)
To enable the "Was this helpful?" feedback feature:
1. Create a **GitHub App** in your account settings.
2. Generate a **Private Key** and download the `.pem` file.
3. Install the App in your repository.
4. Create a Discussion Category named **"Docs Feedback"** in your repo.
5. Add variables to `.env.local`:
```env
GITHUB_APP_ID="your_app_id"
GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n..."
```

## Deployment to Vercel

### 1. Push to GitHub

```bash
git push origin main
```

### 2. Deploy on Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository
5. **Root Directory**: Leave as `./` (auto-detects monorepo)
6. **Framework Preset**: Next.js
7. Click "Deploy"

### 3. Add Environment Variables

In Vercel project settings → Environment Variables, add all variables from `.env.local`:

```
DATABASE_URL=postgresql://...
NEXT_PUBLIC_APP_URL=https://yourdomain.vercel.app
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
UPLOADTHING_TOKEN=...
```

### 4. Update OAuth Callback URLs

**GitHub:**
- Homepage URL: `https://yourdomain.vercel.app`
- Callback URL: `https://yourdomain.vercel.app/api/auth/callback/github`

**Google:**
- Authorized redirect URI: `https://yourdomain.vercel.app/api/auth/callback/google`

### 5. Redeploy

Click "Redeploy" in Vercel dashboard after updating OAuth settings.

## Database Commands

```bash
# Push schema changes
pnpm db:push

# Generate migrations
pnpm db:generate

# Open Drizzle Studio
pnpm db:studio
```

## Project Structure

```
apps/web/               # Main Next.js application
├── app/               # App router pages
├── components/        # React components
├── content/blog/      # MDX blog posts
├── lib/              # Utilities
├── public/           # Static assets
└── server/           # Server-side code
    ├── auth/         # Better Auth config
    ├── comments/     # Fuma Comment config
    └── db/           # Database schemas

packages/              # Shared packages
├── fumadocs-blog/    # Blog components
├── shadverse/        # UI components
└── ui/               # Shared UI
```

## Adding Blog Posts

Create MDX files in `apps/web/content/blog/`:

```mdx
---
title: Your Post Title
description: Post description
date: 2024-01-01
author: Waqas Ishaque
tags: [tag1, tag2]
image: /images/blog/your-image.png
---

Your content here...
```

## License

MIT
