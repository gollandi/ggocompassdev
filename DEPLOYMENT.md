# Deployment Guide - GGO Compass

Complete guide for deploying the GGO Compass application to production.

## 🚀 Quick Deploy Options

### Option 1: Deploy to Vercel (Recommended)

**One-Click Deploy:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/gollandi/ggocompassdev)

Click the button above and follow the prompts to deploy.

**Manual Deploy via Dashboard:**

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository: `gollandi/ggocompassdev`
3. Configure project settings (see Configuration section below)
4. Click Deploy

### Option 2: GitHub Actions Auto-Deploy

Push to the `main` branch to automatically deploy via GitHub Actions.

**Prerequisites:**
- Configure GitHub Secrets (see GitHub Actions Setup below)
- Configure Vercel Environment Variables

---

## 📋 Pre-Deployment Checklist

- [ ] **Sanity CMS Setup**
  - [ ] Create Sanity project at [sanity.io](https://sanity.io)
  - [ ] Note your Project ID
  - [ ] Create API token with read permissions
  - [ ] Populate content via Sanity Studio

- [ ] **Environment Variables Ready**
  - [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - [ ] `NEXT_PUBLIC_SANITY_DATASET`
  - [ ] `SANITY_API_TOKEN`

- [ ] **Code Quality**
  - [ ] Build passes locally: `npm run build`
  - [ ] No TypeScript errors
  - [ ] Dependencies installed: `npm install --legacy-peer-deps`

---

## 🔧 Configuration

### Vercel Project Settings

| Setting | Value |
|---------|-------|
| **Framework** | Next.js |
| **Root Directory** | `./` (default) |
| **Build Command** | `npm run build` |
| **Install Command** | `npm install --legacy-peer-deps` |
| **Output Directory** | `.next` |
| **Node Version** | 20.x |

### Environment Variables

**IMPORTANT:** Environment variables must be configured directly in the Vercel Dashboard, not in the `vercel.json` file.

Add these in Vercel Dashboard → Settings → Environment Variables:

```env
# Required
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_actual_api_token
```

**How to get these values:**

1. **NEXT_PUBLIC_SANITY_PROJECT_ID**
   - Go to [sanity.io/manage](https://sanity.io/manage)
   - Select your project
   - Find Project ID in Settings

2. **NEXT_PUBLIC_SANITY_DATASET**
   - Usually `production` or `development`
   - Set in Sanity project settings

3. **SANITY_API_TOKEN**
   - Go to [sanity.io/manage](https://sanity.io/manage)
   - Select your project → API → Tokens
   - Create new token with **Read** permissions
   - Copy the token (you won't see it again!)

---

## 🤖 GitHub Actions Setup

### Prerequisites

Configure these secrets in GitHub → Settings → Secrets and variables → Actions:

| Secret | How to Get It |
|--------|---------------|
| `VERCEL_TOKEN` | [Vercel Account → Tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Vercel Project → Settings → General |
| `VERCEL_PROJECT_ID` | Vercel Project → Settings → General |

### Workflows Included

1. **CI Workflow** (`.github/workflows/ci.yml`)
   - Runs on every push and pull request
   - Validates build succeeds
   - Runs linter
   - No secrets required

2. **Vercel Deploy Workflow** (`.github/workflows/deploy-vercel.yml`)
   - Runs on push to `main` branch
   - Requires Vercel secrets configured
   - Deploys to production

See [.github/workflows/README.md](.github/workflows/README.md) for detailed documentation.

---

## 🐛 Bug Fixes Applied

This deployment includes fixes for critical bugs identified in the codebase:

### Fixed Issues

✅ **Security: Removed exposed API token from .env.example**
- Replaced real credentials with placeholders
- Prevents accidental credential exposure

✅ **Unified Sanity Client Configuration**
- Consolidated dual client setup
- All clients now use same environment configuration
- Unified API version: `2025-11-12`

✅ **Environment Variable Validation**
- Build fails fast with clear errors if env vars missing
- No more silent failures with placeholder values

✅ **Error Boundaries Added**
- Global error handler for better UX
- Application-level error boundary
- Proper error messages for users

✅ **CI/CD Pipeline Created**
- Automated build validation
- Automated deployment to Vercel
- Build artifacts uploaded for debugging

---

## 🧪 Testing Deployment

### Local Build Test

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your actual Sanity credentials
nano .env.local

# Install dependencies
npm install --legacy-peer-deps

# Build application
npm run build

# Test production build locally
npm run start
```

Visit [http://localhost:3000](http://localhost:3000) to test.

### Production Verification

After deploying, verify these features:

- [ ] **Homepage** loads without errors
- [ ] **Procedure Selection** (`/procedure`) displays procedures from Sanity
- [ ] **Location Selection** works
- [ ] **Recovery Timeline** (`/recovery/1`) displays content
- [ ] **Sanity Studio** accessible at `/studio`
- [ ] **All pages** are accessible
- [ ] **Images** load correctly
- [ ] **No console errors** in browser

---

## 🔍 Troubleshooting

### Build Errors

**Error: Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID**

✅ **Solution**: Set all required environment variables in Vercel Dashboard → Settings → Environment Variables

**Error: Build fails with TypeScript errors**

✅ **Solution**: Run `npm run build` locally to see the full error. Fix TypeScript issues in the code.

**Error: `npm ci` fails with peer dependency issues**

✅ **Solution**: Use `npm install --legacy-peer-deps` instead (already configured in Vercel settings)

### Runtime Errors

**Error: Pages show empty content or "Loading..." forever**

✅ **Solution**: 
1. Check Sanity credentials are correct
2. Verify Sanity project has content
3. Check browser console for API errors

**Error: Images don't load (404 errors)**

✅ **Solution**: 
1. Verify `cdn.sanity.io` is configured in `next.config.ts` (already done)
2. Check image references in Sanity CMS

**Error: Sanity Studio (/studio) shows "Configuration must contain `projectId`"**

✅ **Solution**: 
1. Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is set
2. Redeploy after adding environment variable
3. Clear browser cache

### Deployment Errors

**Error: Vercel build fails**

✅ **Solution**:
1. Check Vercel build logs for specific error
2. Verify environment variables are set for "Production" environment
3. Try deploying again (sometimes transient network issues)

**Error: GitHub Actions deployment fails**

✅ **Solution**:
1. Verify all GitHub secrets are configured
2. Check workflow logs in GitHub Actions tab
3. Ensure Vercel token hasn't expired

---

## 📊 Monitoring

### Vercel Dashboard

- **Deployments**: View history and status
- **Logs**: Real-time function logs
- **Analytics**: Performance metrics (if enabled)
- **Build Cache**: Monitor build performance

### GitHub Actions

- **Actions Tab**: View workflow runs
- **Build Status**: Check CI/CD pipeline status
- **Artifacts**: Download build outputs

---

## 🔒 Security Best Practices

✅ **Environment Variables**
- Never commit `.env.local` or actual credentials
- Use Vercel's encrypted environment variables
- Rotate API tokens periodically

✅ **API Tokens**
- Use minimum required permissions (Read only for frontend)
- Keep admin tokens separate and secure
- Regenerate if compromised

✅ **CORS and Security**
- Sanity CORS is configured in Sanity project settings
- Next.js handles security headers automatically
- Review security settings in Vercel dashboard

---

## 🚦 Deployment Status

### Build Status

![CI Status](https://github.com/gollandi/ggocompassdev/workflows/CI/badge.svg)
![Deploy Status](https://github.com/gollandi/ggocompassdev/workflows/Deploy%20to%20Vercel/badge.svg)

### Version

- **Current Version**: 0.2.0
- **Last Updated**: 2026-02-11
- **Status**: ✅ Production Ready

---

## 📚 Additional Resources

- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Sanity CMS**: [sanity.io/docs](https://sanity.io/docs)
- **GitHub Actions**: [docs.github.com/actions](https://docs.github.com/actions)

---

## 🆘 Support

If you encounter issues:

1. Check this deployment guide
2. Review error messages in:
   - Vercel deployment logs
   - GitHub Actions logs
   - Browser console
3. Verify all environment variables are set correctly
4. Check Sanity CMS is accessible and has content

---

**Maintained by**: GGO Dev Team  
**Last Updated**: February 11, 2026
