# 🎯 CampusFlow Deployment - Quick Start

## Choose Your Deployment Method:

### Option 1: Automated Deployment (Recommended) ⚡

Run this command to start the deployment wizard:

```bash
./deploy.sh
```

This will:
- Initialize Git (if needed)
- Install Railway & Vercel CLI tools
- Guide you through deployment step-by-step

---

### Option 2: Manual Deployment (Step-by-Step) 📖

Follow the complete guide: **[DEPLOY_TO_CLOUD.md](DEPLOY_TO_CLOUD.md)**

---

### Option 3: Quick Commands (For Experienced Users) 🚀

#### Deploy Backend to Railway:
```bash
cd backend
railway up
# Add environment variables in dashboard
railway run -- bun prisma migrate deploy
railway run -- bun run seed
```

#### Deploy Frontend to Vercel:
```bash
cd frontend
vercel --prod
# Add API_URL in Vercel dashboard
```

---

## 📊 Architecture Overview

```
┌─────────────────┐
│   Users/Browser │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Vercel CDN    │  ← Frontend (React Native Web)
│  (campusflow.   │     https://campusflow.vercel.app
│   vercel.app)   │
└────────┬────────┘
         │ API Calls
         ▼
┌─────────────────┐
│   Railway       │  ← Backend API (NestJS)
│  (campusflow.   │     https://campusflow.railway.app
│  railway.app)   │
└────────┬────────┘
         │ SQL Queries
         ▼
┌─────────────────┐
│   Neon DB       │  ← PostgreSQL Database
│  (Cloud)        │     Serverless PostgreSQL
└─────────────────┘
```

---

## 🎉 What You'll Get

| Component | Platform | URL Pattern | Cost |
|-----------|----------|-------------|------|
| Frontend | Vercel | `campusflow.vercel.app` | FREE |
| Backend API | Railway | `campusflow.railway.app` | FREE |
| API Docs | Railway | `campusflow.railway.app/api/docs` | FREE |
| Database | Neon | Cloud PostgreSQL | FREE |
| **Total** | - | - | **$0/month** |

---

## ⏱️ Estimated Time

- **Backend Deployment**: 5-7 minutes
- **Frontend Deployment**: 2-3 minutes
- **Database Setup**: 1-2 minutes
- **Total**: ~10 minutes

---

## 🔐 Pre-Configured Settings

### Backend (.env.production):
- ✅ Neon database connection
- ✅ Production JWT secret
- ✅ CORS enabled
- ✅ Rate limiting configured

### Frontend (vercel.json):
- ✅ SPA routing configured
- ✅ Security headers added
- ✅ Build optimization enabled

---

## 📝 What You Need to Do

1. **Create Accounts** (5 minutes):
   - [ ] Railway.app account
   - [ ] Vercel account
   - [ ] GitHub account (if you don't have)

2. **Push to GitHub** (2 minutes):
   ```bash
   git init
   git add .
   git commit -m "CampusFlow"
   git remote add origin <your-repo>
   git push -u origin main
   ```

3. **Deploy** (10 minutes):
   - Follow `./deploy.sh` wizard
   - OR read `DEPLOY_TO_CLOUD.md`

---

## 🆘 Need Help?

### Common Issues:

**Backend won't start on Railway:**
```bash
# Check logs
railway logs

# Re-run migrations
railway run -- bun prisma migrate deploy
```

**Frontend can't connect:**
- Verify `API_URL` in Vercel environment variables
- Check CORS settings in Railway

**Database errors:**
- Ensure `DATABASE_URL` has `?sslmode=require`
- Check Neon dashboard for connection string

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `DEPLOY_TO_CLOUD.md` | Complete deployment guide |
| `deploy.sh` | Automated deployment wizard |
| `IMPLEMENTATION_STATUS.md` | What's implemented |
| `README.md` | Project overview |

---

## 🎯 Next Steps After Deployment

1. ✅ Test login with demo credentials
2. ✅ Create your first event
3. ✅ Register as a student
4. ✅ Generate QR code ticket
5. ✅ Test check-in scanning
6. ✅ Set up custom domain (optional)
7. ✅ Invite team members

---

## 💡 Pro Tips

- **Auto-deploy**: Enable GitHub auto-deploy in Railway/Vercel
- **Environment variables**: Store secrets in platform dashboards, not code
- **Monitoring**: Check Railway/Vercel dashboards for logs
- **Backups**: Export Neon database regularly
- **Custom domain**: Free on both platforms!

---

**Ready to deploy?** Run `./deploy.sh` or open `DEPLOY_TO_CLOUD.md`! 🚀