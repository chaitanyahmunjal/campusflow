# 🚀 CampusFlow - Deployment Commands Cheat Sheet

## Quick Reference - All Commands You Need

---

## 1️⃣ Setup & Git (One Time)

```bash
# Navigate to project
cd /home/user/project

# Initialize Git
git init
git add .
git commit -m "Initial commit - CampusFlow"

# Connect to GitHub (replace with your repo)
git remote add origin https://github.com/yourusername/campusflow.git
git push -u origin main
```

---

## 2️⃣ Install Deployment Tools (One Time)

```bash
# Install Railway CLI
bun install -g @railway/cli

# Install Vercel CLI
bun install -g vercel

# Or use npm if bun doesn't work
npm install -g @railway/cli vercel
```

---

## 3️⃣ Deploy Backend to Railway

### Option A: Interactive Deploy
```bash
cd /home/user/project/backend
railway up
```

### Option B: Non-interactive
```bash
cd /home/user/project/backend
railway init
railway up
```

### Add Environment Variables (in Railway Dashboard)
```bash
# Or use Railway CLI
railway variables set DATABASE_URL="postgresql://neondb_owner:npg_PIO9jG7nlzVc@ep-muddy-sound-at3kvb3o.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require"
railway variables set JWT_SECRET="your-secret-key-min-32-characters"
railway variables set NODE_ENV="production"
railway variables set CORS_ORIGIN="*"
```

### Run Migrations
```bash
railway run -- bun prisma migrate deploy
railway run -- bun run seed
```

### View Logs
```bash
railway logs
```

---

## 4️⃣ Deploy Frontend to Vercel

### Option A: Quick Deploy
```bash
cd /home/user/project/frontend
vercel --prod
```

### Option B: Interactive Deploy
```bash
cd /home/user/project/frontend
vercel
```

### Add Environment Variables (in Vercel Dashboard)
```bash
# Or use Vercel CLI
vercel env add API_URL
# Enter your Railway URL when prompted
```

### Redeploy After Changes
```bash
vercel --prod
```

---

## 5️⃣ Update CORS (After Both Deployments)

```bash
# In Railway Dashboard, update:
CORS_ORIGIN=https://your-app.vercel.app

# Or use CLI
railway variables set CORS_ORIGIN="https://your-app.vercel.app"
```

---

## 6️⃣ Test Your Deployment

```bash
# Test backend is responding
curl https://your-app.railway.app

# Test API docs
curl https://your-app.railway.app/api/docs

# Test login endpoint
curl -X POST https://your-app.railway.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@campus.com","password":"password"}'

# Open frontend in browser
open https://your-app.vercel.app
```

---

## 7️⃣ Monitor Your Deployment

### Railway (Backend)
```bash
# View logs
railway logs

# View deployment info
railway status

# Open dashboard
railway open
```

### Vercel (Frontend)
```bash
# View deployments
vercel ls

# Open dashboard
vercel open
```

---

## 8️⃣ Update & Redeploy

### After Code Changes
```bash
# Commit changes
git add .
git commit -m "Your changes"
git push origin main

# Auto-deploy (if GitHub integration enabled)
# OR manual deploy:

# Backend
cd backend
railway up

# Frontend
cd frontend
vercel --prod
```

---

## 9️⃣ Database Management

### Run Migrations
```bash
railway run -- bun prisma migrate deploy
```

### Reset Database (⚠️ DANGER - Deletes all data)
```bash
railway run -- bun prisma migrate reset --force
```

### Seed Database
```bash
railway run -- bun run seed
```

### Open Prisma Studio (Local)
```bash
cd backend
bun prisma studio
```

---

## 🔟 Useful Commands

### Check Environment Variables
```bash
# Railway
railway variables

# Vercel
vercel env ls
```

### Rollback Deployment
```bash
# Railway
railway rollback <deployment-id>

# Vercel
vercel rollback
```

### Custom Domain Setup
```bash
# Railway
railway domain add yourdomain.com

# Vercel
vercel domains add yourdomain.com
```

---

## 🆘 Troubleshooting Commands

### Backend Won't Start
```bash
# Check logs
railway logs --follow

# Test database connection
railway run -- node -e "console.log('Testing DB...')"

# Rebuild
railway up --force
```

### Frontend Build Fails
```bash
# Check build logs
vercel --debug

# Test build locally
cd frontend
bun run web --no-dev
```

### Database Connection Issues
```bash
# Test connection
railway run -- bun prisma db pull

# Check Neon dashboard
# https://console.neon.tech
```

---

## 📞 Quick Links

| Service | URL | Command |
|---------|-----|---------|
| Railway Dashboard | https://railway.app | `railway open` |
| Vercel Dashboard | https://vercel.com | `vercel open` |
| Neon Dashboard | https://console.neon.tech | - |
| GitHub | https://github.com | - |

---

## 🎯 Complete Deployment in 3 Commands

If you have everything set up:

```bash
# 1. Deploy backend
cd backend && railway up

# 2. Deploy frontend
cd ../frontend && vercel --prod

# 3. Update CORS (in Railway dashboard)
# Set CORS_ORIGIN to your Vercel URL
```

That's it! 🎉

---

**For detailed instructions, see:** `DEPLOY_TO_CLOUD.md`