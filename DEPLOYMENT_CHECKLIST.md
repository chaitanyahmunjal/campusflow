# ✅ CampusFlow Deployment Checklist

## Pre-Deployment (Do This First)

### 1. Create Accounts
- [ ] GitHub account (https://github.com)
- [ ] Railway account (https://railway.app)
- [ ] Vercel account (https://vercel.com)
- [ ] Neon account (✅ Already done!)

### 2. Prepare Your Code
- [ ] Code is in `/home/user/project/`
- [ ] Database is connected to Neon ✅
- [ ] Database schema is migrated ✅
- [ ] Demo data is seeded ✅

### 3. Push to GitHub
```bash
cd /home/user/project
git init
git add .
git commit -m "Initial commit - CampusFlow"
# Create repo on GitHub, then:
git remote add origin <your-github-repo-url>
git push -u origin main
```
- [ ] Code pushed to GitHub

---

## Backend Deployment (Railway)

### Quick Deploy
```bash
cd /home/user/project/backend
railway up
```

### Configuration
- [ ] Go to Railway Dashboard
- [ ] Add environment variables:
  - [ ] `DATABASE_URL` (Neon connection string)
  - [ ] `JWT_SECRET` (min 32 characters)
  - [ ] `NODE_ENV=production`
  - [ ] `CORS_ORIGIN=*` (temporary, update later)
- [ ] Save variables

### Database Setup
- [ ] Run migrations: `railway run -- bun prisma migrate deploy`
- [ ] Seed data: `railway run -- bun run seed`
- [ ] Verify deployment in logs

### Get Backend URL
- [ ] Copy your Railway URL (e.g., `https://campusflow-abc123.railway.app`)
- [ ] Test: `curl https://your-url.railway.app/api/docs`

---

## Frontend Deployment (Vercel)

### Quick Deploy
```bash
cd /home/user/project/frontend
vercel --prod
```

### Configuration
- [ ] Go to Vercel Dashboard
- [ ] Add environment variable:
  - [ ] `API_URL=<your-railway-url>`
- [ ] Save and redeploy

### Get Frontend URL
- [ ] Copy your Vercel URL (e.g., `https://campusflow-xyz.vercel.app`)
- [ ] Open in browser

---

## Final Configuration

### Update CORS
- [ ] Go back to Railway Dashboard
- [ ] Update `CORS_ORIGIN` to your Vercel URL
- [ ] Save and redeploy backend

### Test Everything
- [ ] Open frontend URL in browser
- [ ] Login as student: `student@campus.com` / `password`
- [ ] Browse events
- [ ] Register for an event
- [ ] View QR code ticket
- [ ] Test as organizer: `organizer@campus.com` / `password`
- [ ] Create an event
- [ ] Test as admin: `admin@campus.com` / `password`
- [ ] Approve an event

---

## Post-Deployment (Optional)

### Custom Domain
- [ ] Railway: Settings → Domains → Add custom domain
- [ ] Vercel: Settings → Domains → Add custom domain
- [ ] Update DNS records

### Monitoring Setup
- [ ] Enable Railway monitoring
- [ ] Enable Vercel analytics
- [ ] Set up Neon database monitoring

### Security Hardening
- [ ] Change default demo passwords
- [ ] Update JWT_SECRET to a strong random value
- [ ] Enable rate limiting
- [ ] Set up SSL certificates (automatic on both platforms)

---

## Troubleshooting

### Backend Issues
- [ ] Check Railway logs
- [ ] Verify DATABASE_URL format
- [ ] Ensure `prisma generate` ran
- [ ] Check port is set to 5000

### Frontend Issues
- [ ] Check Vercel build logs
- [ ] Verify API_URL is correct
- [ ] Clear browser cache
- [ ] Check browser console for errors

### Database Issues
- [ ] Test Neon connection locally
- [ ] Verify SSL mode is required
- [ ] Check Neon dashboard for errors

---

## Success Criteria ✅

You're done when:
- [ ] Frontend loads without errors
- [ ] Can login with demo accounts
- [ ] Can browse events
- [ ] Can create events (as organizer)
- [ ] Can approve events (as admin)
- [ ] Can register and get QR tickets
- [ ] API docs are accessible
- [ ] No console errors in browser

---

## Resources

- **Deployment Guide**: `DEPLOY_TO_CLOUD.md`
- **Quick Start**: `./deploy.sh`
- **Architecture**: `DEPLOYMENT_SUMMARY.md`
- **Project Info**: `README.md`

---

## Need Help?

If stuck, check:
1. Railway dashboard logs
2. Vercel deployment logs
3. Browser console errors
4. Neon database connection

Or ask for help with specific error messages! 🚀

---

**Good luck with your deployment!** 🎉