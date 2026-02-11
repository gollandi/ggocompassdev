# Quick Start: Deploying GGO Compass

**Ready to deploy in 3 steps!** ⚡

---

## 🚀 Option 1: One-Click Deploy (Fastest)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/gollandi/ggocompassdev)

1. **Click the button** above
2. **Set 3 environment variables** in Vercel:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID = your_sanity_project_id
   NEXT_PUBLIC_SANITY_DATASET = production
   SANITY_API_TOKEN = your_sanity_token
   ```
3. **Click Deploy** ✨

**Done!** Your app will be live in ~2 minutes.

---

## 🔄 Option 2: Auto-Deploy with GitHub Actions

**Setup once, deploy automatically on every push to `main`**

### Step 1: Get Vercel Credentials
1. Go to https://vercel.com/account/tokens
2. Create new token → Copy it
3. Go to your Vercel project → Settings → General
4. Copy "Organization ID" and "Project ID"

### Step 2: Add GitHub Secrets
1. Go to your GitHub repo → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add these 3 secrets:
   - `VERCEL_TOKEN` = your token from step 1
   - `VERCEL_ORG_ID` = your org ID from step 1  
   - `VERCEL_PROJECT_ID` = your project ID from step 1

### Step 3: Deploy
```bash
git push origin main
```

**Done!** Every push to `main` now auto-deploys.

---

## 🛠️ Option 3: Manual Deploy with CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy to production
vercel --prod
```

---

## 📋 Before You Deploy

### 1. Get Sanity Credentials

Don't have Sanity set up yet?

1. Go to https://sanity.io
2. Create new project (free tier is fine)
3. Note your **Project ID**
4. Create **API Token** with read permissions
5. Go to http://localhost:3000/studio to populate content

### 2. Set Environment Variables

**In Vercel Dashboard:**
- Settings → Environment Variables → Add Variable

**Locally for testing:**
```bash
cp .env.example .env.local
# Edit .env.local with your real credentials
```

---

## ✅ Post-Deployment Checklist

After deploying, test these:

- [ ] Homepage loads
- [ ] Procedure selection works  
- [ ] Recovery timeline displays
- [ ] Sanity Studio accessible at `/studio`
- [ ] No console errors

---

## 🆘 Troubleshooting

**Build fails?**
- Check environment variables are set in Vercel
- Verify Sanity project ID is correct

**Empty content?**
- Populate content in Sanity Studio first
- Check Sanity token has read permissions

**More help?**
- [Full Deployment Guide](./DEPLOYMENT.md)
- [Workflow Documentation](.github/workflows/README.md)
- [Deployment Fixes Summary](./DEPLOYMENT_FIXES_SUMMARY.md)

---

## 📚 Documentation

| Guide | What's Inside |
|-------|---------------|
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Complete deployment guide with troubleshooting |
| [.github/workflows/README.md](.github/workflows/README.md) | GitHub Actions setup |
| [DEPLOYMENT_FIXES_SUMMARY.md](./DEPLOYMENT_FIXES_SUMMARY.md) | All bugs fixed in this release |

---

**Need help?** Check the [Deployment Guide](./DEPLOYMENT.md) for detailed instructions.

**Status:** ✅ Production Ready | Version 0.2.0 | Last Updated: 2026-02-11
