# 🚀 CampusFlow Cloud Deployment Guide

## Complete Step-by-Step Instructions

This guide will deploy your CampusFlow application to the cloud for FREE!

---

## 📋 What You'll Get

| Service | URL | Cost |
|---------|-----|------|
| **Database** | Neon (Cloud PostgreSQL) | FREE (0.5 GB) |
| **Backend API** | Railway.app | FREE (500 hrs/month) |
| **Frontend** | Vercel | FREE (Unlimited) |
| **Total** | - | **$0/month** 🎉 |

---

## Step 1: Deploy Backend to Railway

### 1.1 Create Railway Account

1. Go to **https://railway.app**
2. Click **"Start a New Project"**
3. Sign up with GitHub (recommended) or Email

### 1.2 Deploy from GitHub

**Option A: Deploy from GitHub Repository** (Recommended)

1. Push your code to GitHub first:
   ```bash
   cd /home/user/project
   git init
   git add .
   git commit -m "Initial commit - CampusFlow"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. In Railway dashboard:
   - Click **"New Project"**
   - Select **"Deploy from GitHub repo"**
   - Choose your `campusflow` repository
   - Railway will auto-detect it's a Node.js app

**Option B: Deploy from Local** (Alternative)

```bash
# Install Railway CLI
bun install -g @railway/cli

# Login to Railway
railway login

# Initialize project
cd /home/user/project/backend
railway init

# Deploy
railway up
```

### 1.3 Configure Environment Variables

In Railway Dashboard:
1. Go to your project → **Variables** tab
2. Add these variables:

```bash
# Database (from Neon)
DATABASE_URL=postgresql://neondb_owner:npg_PIO9jG7nlzVc@ep-muddy-sound-at3kvb3o.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require

# Security
JWT_SECRET=campusflow-super-secret-production-key-min-32-characters-long
JWT_EXPIRATION=7d

# Environment
NODE_ENV=production
PORT=5000

# CORS (Update after frontend deployment)
CORS_ORIGIN=*

# API
API_URL=https://your-app.railway.app
FRONTEND_URL=*
```

3. Click **"Save"**

### 1.4 Run Database Migrations

In Railway Dashboard:
1. Go to **"Deployments"** tab
2. Click on the latest deployment
3. Scroll to **"Deployments"** → Click **"Open Logs"**
4. Or use Railway CLI:

```bash
railway run -- bash -c "bun prisma migrate deploy && bun run seed"
```

This will:
- Create all database tables
- Seed demo users and data

### 1.5 Get Your Backend URL

After deployment completes:
1. Go to Railway Dashboard → Your Project
2. Click **"Settings"**
3. Find **"Domains"** section
4. Your URL will be: `https://campusflow-xxxx.railway.app`

**✅ Test Your Backend:**
```bash
curl https://your-backend-url.railway.app/api/docs
```

You should see the Swagger documentation!

---

## Step 2: Deploy Frontend to Vercel

### 2.1 Create Vercel Account

1. Go to **https://vercel.com**
2. Sign up with GitHub (recommended)

### 2.2 Install Vercel CLI

```bash
bun install -g vercel
```

### 2.3 Deploy Frontend

```bash
cd /home/user/project/frontend

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

**OR** deploy from Vercel Dashboard:

1. Click **"Add New..."** → **"Project"**
2. Import your GitHub repository
3. Vercel will auto-detect Expo
4. Click **"Deploy"**

### 2.4 Configure Environment Variables

In Vercel Dashboard:
1. Go to your project → **Settings** → **Environment Variables**
2. Add:

```bash
API_URL=https://your-backend.railway.app
```

3. Click **"Save"**
4. Redeploy to apply changes

### 2.5 Get Your Frontend URL

Your app will be at: `https://campusflow-xxxx.vercel.app`

---

## Step 3: Update CORS Settings

Now update the backend CORS to allow your frontend:

1. Go back to **Railway Dashboard**
2. Add/Update variable:
   ```bash
   CORS_ORIGIN=https://campusflow-xxxx.vercel.app
   ```
3. Save and redeploy

---

## Step 4: Test Your Application

### 4.1 Access Your App

Open in browser:
```
https://campusflow-xxxx.vercel.app
```

### 4.2 Login Credentials

Use the demo accounts:

| Role | Email | Password |
|------|-------|----------|
| Student | student@campus.com | password |
| Admin | admin@campus.com | password |
| Organizer | organizer@campus.com | password |

---

## 🎉 Congratulations!

Your CampusFlow is now live on the cloud! 🚀

### Your URLs:
- **Frontend**: `https://campusflow-xxxx.vercel.app`
- **Backend API**: `https://campusflow-xxxx.railway.app`
- **API Docs**: `https://campusflow-xxxx.railway.app/api/docs`
- **Database**: Neon (managed cloud)

---

## 📊 Monitor Your App

### Railway Monitoring:
- Go to Railway Dashboard → Your Project
- View logs, metrics, and deployments

### Vercel Monitoring:
- Go to Vercel Dashboard → Your Project
- View analytics, deployments, and logs

### Neon Database:
- Go to Neon Dashboard
- View database usage, run queries

---

## 🔧 Maintenance Commands

### View Backend Logs (Railway):
```bash
railway logs
```

### Redeploy Backend:
```bash
cd backend
railway up
```

### Redeploy Frontend:
```bash
cd frontend
vercel --prod
```

### Run Database Migrations:
```bash
railway run -- bun prisma migrate deploy
```

### Seed Database:
```bash
railway run -- bun run seed
```

---

## 🚨 Troubleshooting

### Backend won't start on Railway:
1. Check logs in Railway dashboard
2. Verify `DATABASE_URL` is correct
3. Ensure `prisma generate` ran in build

### Frontend can't connect to backend:
1. Check `API_URL` in Vercel environment variables
2. Verify CORS settings in backend
3. Make sure backend URL starts with `https://`

### Database migration fails:
```bash
# Reset and migrate
railway run -- bash -c "bun prisma migrate reset --force && bun prisma migrate deploy"
```

### CORS errors:
Update `CORS_ORIGIN` in Railway to match your Vercel URL exactly.

---

## 💡 Pro Tips

1. **Custom Domain** (Free on both):
   - Railway: Settings → Domains
   - Vercel: Settings → Domains

2. **Auto-deploy from GitHub**:
   - Every push to `main` will auto-deploy
   - No need to run CLI commands

3. **Environment Separation**:
   - Create separate Neon databases for dev/staging/prod
   - Use Railway environments for staging

4. **Monitor Free Tier Usage**:
   - Railway: 500 hours/month (~20 days continuous)
   - Vercel: Unlimited for personal projects
   - Neon: 0.5 GB storage

---

## 📚 Resources

- [Railway Docs](https://docs.railway.app)
- [Vercel Docs](https://vercel.com/docs)
- [Neon Docs](https://neon.tech/docs)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)

---

## Need Help?

If you get stuck at any step, just ask! I can help you:
- Debug deployment errors
- Configure environment variables
- Set up custom domains
- Optimize for production

Good luck with your deployment! 🎉