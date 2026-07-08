# CampusFlow - Cloud Deployment Guide (Free Tier)

## 🌟 Complete Free Stack

| Service | Purpose | Provider | Cost |
|---------|---------|----------|------|
| Database | PostgreSQL | Neon | Free (0.5 GB) |
| Backend API | Node.js Server | Railway/Render | Free (500 hrs/month) |
| Frontend | Web App | Vercel/Netlify | Free |
| Redis (Optional) | Caching | Redis Cloud | Free (30 MB) |

---

## 1️⃣ Database: Neon (PostgreSQL)

### Setup Steps:

1. **Create Account**: https://neon.tech
2. **Create Project**: Name it `campusflow`
3. **Get Connection String**:
   - Go to Project Settings → Connection Details
   - Copy the connection string (looks like: `postgresql://user:pass@ep-xxx.aws.neon.tech/db?sslmode=require`)

### Update `.env`:
```bash
DATABASE_URL="postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/campusflow?sslmode=require"
```

### Run Migrations:
```bash
cd backend
bun install
bun prisma generate
bun prisma migrate dev --name init
bun run seed
```

✅ Database is ready!

---

## 2️⃣ Backend: Railway.app

### Setup Steps:

1. **Create Account**: https://railway.app
2. **New Project** → "Deploy from GitHub repo"
3. **Connect your repository**
4. **Add Variables** (Settings → Variables):
   ```
   DATABASE_URL=your-neon-connection-string
   JWT_SECRET=your-secret-key-min-32-characters
   JWT_EXPIRATION=7d
   NODE_ENV=production
   PORT=5000
   API_URL=https://your-app.railway.app
   FRONTEND_URL=https://your-app.vercel.app
   CORS_ORIGIN=https://your-app.vercel.app
   ```

5. **Deploy!**
   - Railway will auto-detect it's a Node.js app
   - It will start on `https://your-app.railway.app`

### Alternative: Render.com

1. **Create Account**: https://render.com
2. **New Web Service** → Connect GitHub
3. **Build Command**: `cd backend && bun install && bun prisma generate`
4. **Start Command**: `cd backend && bun run start:prod`
5. **Add Environment Variables** (same as above)

---

## 3️⃣ Frontend: Vercel

### Setup Steps:

1. **Build for Web**:
   ```bash
   cd frontend
   
   # Update app.config.js or create vercel.json
   echo '{"rewrites": [{"source": "/(.*)", "destination": "/"}]}' > vercel.json
   
   # Build
   bun run web --no-dev
   ```

2. **Deploy to Vercel**:
   ```bash
   # Install Vercel CLI
   bun install -g vercel
   
   # Deploy
   cd frontend
   vercel --prod
   ```

3. **Set Environment Variables** in Vercel dashboard:
   ```
   API_URL=https://your-backend.railway.app
   ```

### Alternative: Netlify

```bash
# Install Netlify CLI
bun install -g netlify-cli

# Deploy
cd frontend
netlify deploy --prod
```

---

## 4️⃣ Redis (Optional - Can Skip for Small Apps)

### Redis Cloud Free Tier:

1. **Create Account**: https://redis.com/try-free/
2. **Create Free Database** (30 MB)
3. **Get Connection URL**
4. **Update Backend `.env`**:
   ```bash
   REDIS_URL=redis://user:pass@redis-cloud-url:port
   ```

Or skip Redis entirely for development - the app will still work!

---

## 🎯 Quick Deploy Commands

### Backend to Railway:
```bash
# Install Railway CLI
bun install -g @railway/cli

# Login
railway login

# Deploy
cd backend
railway up
```

### Frontend to Vercel:
```bash
# Install Vercel CLI
bun install -g vercel

# Deploy
cd frontend
vercel --prod
```

---

## 🔧 Environment Variables Template

### Backend (.env):
```bash
DATABASE_URL=postgresql://...
JWT_SECRET=super-secret-key-at-least-32-characters-long
JWT_EXPIRATION=7d
NODE_ENV=production
PORT=5000
API_URL=https://your-backend.railway.app
FRONTEND_URL=https://your-frontend.vercel.app
CORS_ORIGIN=https://your-frontend.vercel.app
```

### Frontend (.env):
```bash
API_URL=https://your-backend.railway.app
```

---

## ✅ Post-Deployment Checklist

1. ✅ Database migrated: `bun prisma migrate deploy`
2. ✅ Database seeded: `bun run seed`
3. ✅ Backend responding: Check `/api/docs`
4. ✅ Frontend can login: Test with demo credentials
5. ✅ CORS working: Frontend can call backend API

---

## 🎉 Free Tier Limits

- **Neon**: 0.5 GB storage, unlimited bandwidth
- **Railway**: 500 hours/month (~20 days continuous)
- **Vercel**: Unlimited deployments, 100 GB bandwidth/month
- **Redis Cloud**: 30 MB storage

Perfect for development, demos, and small production apps!

---

## 🚨 Troubleshooting

### Backend won't start on Railway:
- Check logs in Railway dashboard
- Ensure `DATABASE_URL` has `?sslmode=require`
- Verify build command includes `prisma generate`

### Frontend can't connect to backend:
- Check CORS settings in backend
- Verify `API_URL` in frontend matches backend URL
- Ensure backend is using HTTPS

### Database migration fails:
```bash
# Reset and migrate
bun prisma migrate reset
bun prisma migrate deploy
bun run seed
```

---

## 💡 Pro Tips

1. **Use separate databases** for dev/staging/production
2. **Store secrets** in Railway/Vercel environment variables, not `.env`
3. **Enable GitHub auto-deploy** for CI/CD
4. **Monitor usage** to stay within free limits
5. **Add a custom domain** (free on Vercel/Railway)

---

## 📚 Resources

- [Neon Docs](https://neon.tech/docs)
- [Railway Docs](https://docs.railway.app)
- [Vercel Docs](https://vercel.com/docs)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)

Ready to deploy! 🚀