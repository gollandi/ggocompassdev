# GitHub Actions Workflows

This directory contains GitHub Actions workflows for CI/CD automation.

## Workflows

### 1. CI Workflow (`ci.yml`)

**Trigger**: Runs on push to `main` or `develop` branches, and on pull requests to these branches.

**Purpose**: Validates code quality and ensures the application builds successfully.

**Steps**:
- Checks out the code
- Sets up Node.js environment
- Installs dependencies
- Runs linting (non-blocking)
- Builds the application
- Uploads build artifacts

**Requirements**: No secrets needed. Uses placeholder environment variables for build validation.

### 2. Vercel Deployment Workflow (`deploy-vercel.yml`)

**Trigger**: Runs on push to `main` branch or manual trigger via workflow_dispatch.

**Purpose**: Automatically deploys the application to Vercel production environment.

> **⚠️ Getting "No credentials found" error?**  
> See [VERCEL_SECRETS_SETUP.md](../../VERCEL_SECRETS_SETUP.md) for a quick 5-minute fix!

**Steps**:
- Checks out the code
- Sets up Node.js environment
- Installs Vercel CLI
- Pulls Vercel environment configuration
- Builds the project
- Deploys to Vercel production

### 3. Mirror to Wireframe Workflow (`mirror-to-wireframe.yml`)

**Trigger**: Runs on push to `main` branch or manual trigger via workflow_dispatch.

**Purpose**: Automatically pushes code to the `ggocompasswireframedesign` repository.

> **📖 Setup Required**  
> See [MIRROR_TO_WIREFRAME_SETUP.md](../../MIRROR_TO_WIREFRAME_SETUP.md) for complete setup instructions!

**Steps**:
- Checks out the code with full git history
- Validates GitHub Personal Access Token
- Configures git
- Adds wireframe repository as remote
- Pushes to wireframe repository

**Requirements**: Requires `WIREFRAME_REPO_TOKEN` secret configured in GitHub repository settings.

## Required GitHub Secrets

> **🚨 IMPORTANT:** The deployment workflow will fail without these secrets!  
> **Getting "No credentials found" error?** → [Quick Fix Guide](../../VERCEL_SECRETS_SETUP.md)

To use the Vercel deployment workflow, you need to configure the following secrets in your GitHub repository:

### How to Add Secrets

1. Go to your GitHub repository
2. Click on **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each of the following secrets:

### Required Secrets

| Secret Name | Description | How to Obtain |
|-------------|-------------|---------------|
| `VERCEL_TOKEN` | Vercel authentication token | 1. Go to https://vercel.com/account/tokens<br>2. Click "Create Token"<br>3. Name it "GitHub Actions"<br>4. Copy the token |
| `VERCEL_ORG_ID` | Your Vercel organization ID | 1. Go to your Vercel project settings<br>2. Find in Project Settings → General<br>3. Copy the "Organization ID" |
| `VERCEL_PROJECT_ID` | Your Vercel project ID | 1. Go to your Vercel project settings<br>2. Find in Project Settings → General<br>3. Copy the "Project ID" |
| `WIREFRAME_REPO_TOKEN` | GitHub Personal Access Token for mirroring | 1. Go to https://github.com/settings/tokens/new<br>2. Select scope: `repo` (Full control)<br>3. Click "Generate token"<br>4. Copy the token<br>**See [MIRROR_TO_WIREFRAME_SETUP.md](../../MIRROR_TO_WIREFRAME_SETUP.md) for details** |

### Environment Variables in Vercel

Don't forget to also configure these environment variables in your Vercel project dashboard:

1. Go to https://vercel.com
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add the following variables for **Production** environment:

| Variable Name | Description | Example |
|---------------|-------------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID | `m05ykm6e` |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name | `production` |
| `SANITY_API_TOKEN` | Sanity API token with read access | `sk...` |

## Alternative: Vercel Git Integration

If you prefer automatic deployments without GitHub Actions, you can use Vercel's built-in Git integration:

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure environment variables in Vercel dashboard
4. Vercel will automatically deploy on every push to `main`

**Pros of Git Integration**:
- Zero configuration in GitHub
- Automatic preview deployments for PRs
- Built-in deployment previews

**Pros of GitHub Actions**:
- More control over deployment process
- Can add additional steps (tests, notifications, etc.)
- Centralized CI/CD configuration

## Monitoring Deployments

### Via GitHub Actions

1. Go to your repository
2. Click the **Actions** tab
3. View workflow runs and their status

### Via Vercel Dashboard

1. Go to https://vercel.com
2. Select your project
3. View deployment history and logs

## Troubleshooting

### Build Fails in CI

**Issue**: Build fails with environment variable errors

**Solution**: The CI workflow uses placeholder values. This is expected if testing with a real Sanity connection. The workflow validates that the build process works, not that Sanity is connected.

### Deployment Fails

**Issue**: Vercel deployment fails with authentication error

**Solution**: 
1. Verify all three secrets are correctly set in GitHub
2. Ensure the Vercel token has not expired
3. Check that the project and organization IDs match your Vercel project

### Missing Environment Variables in Production

**Issue**: App shows errors about missing Sanity configuration

**Solution**: Ensure all environment variables are set in Vercel dashboard under Settings → Environment Variables

## Manual Deployment via CLI

You can also deploy manually using Vercel CLI:

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

## Status Badges

Add these badges to your README to show build status:

```markdown
![CI Status](https://github.com/gollandi/ggocompassdev/workflows/CI/badge.svg)
![Deploy Status](https://github.com/gollandi/ggocompassdev/workflows/Deploy%20to%20Vercel/badge.svg)
```

## Next Steps

1. ✅ Configure GitHub secrets (if using GitHub Actions deployment)
2. ✅ Set up Vercel environment variables
3. ✅ Push to `main` branch to trigger first deployment
4. ✅ Monitor deployment in GitHub Actions and Vercel dashboard
5. ✅ Test your deployed application

---

**Last Updated**: 2026-02-11  
**Maintained by**: GGO Dev Team
