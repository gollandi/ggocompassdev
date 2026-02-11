# Vercel Secrets Setup Guide

This guide helps you fix the error:
```
Error: No existing credentials found. Please run `vercel login` or pass "--token"
```

## Quick Fix (5 minutes)

The error occurs because GitHub Actions doesn't have the Vercel authentication token. Follow these steps:

### Step 1: Get Your Vercel Token

1. Go to **[https://vercel.com/account/tokens](https://vercel.com/account/tokens)**
2. Click **"Create Token"**
3. Give it a name like `GitHub Actions Deploy`
4. Click **Create Token**
5. **Copy the token** (you won't see it again!)

### Step 2: Get Your Vercel Project IDs

1. Go to **[https://vercel.com](https://vercel.com)** and select your project
2. Click **Settings** → **General**
3. Scroll down and find:
   - **Project ID** (looks like: `prj_xxxxxxxxxxxxx`)
   - **Organization ID** or **Team ID** (looks like: `team_xxxxxxxxxxxxx`)
4. **Copy both IDs**

### Step 3: Add Secrets to GitHub

1. Go to your GitHub repository: **https://github.com/gollandi/ggocompassdev**
2. Click **Settings** (repository settings, not your account)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Add these three secrets one by one:

   **Secret 1:**
   - Name: `VERCEL_TOKEN`
   - Value: (paste the token from Step 1)
   
   **Secret 2:**
   - Name: `VERCEL_ORG_ID`
   - Value: (paste the Organization/Team ID from Step 2)
   
   **Secret 3:**
   - Name: `VERCEL_PROJECT_ID`
   - Value: (paste the Project ID from Step 2)

### Step 4: Trigger a New Deployment

Option A - Push a commit:
```bash
git commit --allow-empty -m "Trigger deployment with secrets"
git push origin main
```

Option B - Manually trigger the workflow:
1. Go to **Actions** tab in GitHub
2. Click **Deploy to Vercel** workflow
3. Click **Run workflow**
4. Select `main` branch
5. Click **Run workflow**

### Step 5: Verify It Works

1. Go to **Actions** tab in your GitHub repository
2. Watch the workflow run
3. You should see: ✅ All required Vercel secrets are configured
4. The deployment should proceed successfully

---

## Troubleshooting

### "Secret not found" even after adding it
- Make sure you added the secret to the **repository** (not your personal account)
- Check the secret name matches exactly (case-sensitive)
- Wait a few seconds and try again

### "Invalid token" error
- Your Vercel token may have expired
- Create a new token and update the GitHub secret
- Make sure you copied the entire token

### "Project not found" error
- Verify the Project ID and Organization ID are correct
- Make sure they're from the same Vercel project you want to deploy to
- Check you have access to the Vercel project

### Still having issues?
- See [.github/workflows/README.md](.github/workflows/README.md) for detailed documentation
- See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment guide
- Check Vercel deployment logs at https://vercel.com

---

## Alternative: Use Vercel Git Integration

If you don't want to use GitHub Actions, you can use Vercel's built-in Git integration:

1. Go to **[https://vercel.com/new](https://vercel.com/new)**
2. Click **Import Git Repository**
3. Select your GitHub repository `gollandi/ggocompassdev`
4. Configure environment variables in Vercel
5. Click **Deploy**

Vercel will automatically deploy on every push to `main` - no GitHub secrets needed!

**Pros:**
- Easier setup (no GitHub secrets required)
- Automatic preview deployments for PRs
- Built-in deployment previews

**Cons:**
- Less control over deployment process
- Can't add custom CI steps before deployment

---

## Summary

✅ **What you need:**
- `VERCEL_TOKEN` - from https://vercel.com/account/tokens
- `VERCEL_ORG_ID` - from Vercel project settings
- `VERCEL_PROJECT_ID` - from Vercel project settings

✅ **Where to add them:**
- GitHub → Repository Settings → Secrets and variables → Actions

✅ **What happens next:**
- GitHub Actions will use these secrets to deploy to Vercel
- Every push to `main` will trigger automatic deployment

---

**Last Updated:** February 11, 2026
