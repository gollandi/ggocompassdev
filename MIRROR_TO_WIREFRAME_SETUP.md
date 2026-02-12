# Mirror to ggocompasswireframedesign Repository

This guide explains how to automatically push (mirror) code from the `ggocompassdev` repository to the `ggocompasswireframedesign` repository.

## Overview

A GitHub Actions workflow has been created that will automatically push all code from the `main` branch of `ggocompassdev` to the `main` branch of `ggocompasswireframedesign` whenever:
- Code is pushed to the `main` branch
- The workflow is manually triggered

## Setup Instructions

### Step 1: Create a GitHub Personal Access Token (PAT)

1. **Go to GitHub Token Settings**
   - Visit: [https://github.com/settings/tokens/new](https://github.com/settings/tokens/new)
   - Or navigate: GitHub → Settings (top-right profile menu) → Developer settings → Personal access tokens → Tokens (classic)

2. **Configure the Token**
   - **Note**: `Mirror to ggocompasswireframedesign`
   - **Expiration**: Choose an appropriate expiration (e.g., 90 days, 1 year, or no expiration)
   - **Scopes**: Select the following:
     - ✅ `repo` (Full control of private repositories)
       - This includes: `repo:status`, `repo_deployment`, `public_repo`, `repo:invite`, `security_events`

3. **Generate and Copy the Token**
   - Click "Generate token"
   - **IMPORTANT**: Copy the token immediately - you won't be able to see it again!
   - The token will look something like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Step 2: Add the Token to GitHub Secrets

1. **Go to Repository Secrets**
   - Navigate to: [https://github.com/gollandi/ggocompassdev/settings/secrets/actions](https://github.com/gollandi/ggocompassdev/settings/secrets/actions)
   - Or: Repository → Settings → Secrets and variables → Actions

2. **Add New Secret**
   - Click "New repository secret"
   - **Name**: `WIREFRAME_REPO_TOKEN`
   - **Value**: Paste the Personal Access Token you copied in Step 1
   - Click "Add secret"

### Step 3: Verify the Workflow

1. **Check Workflow File**
   - The workflow file is located at: `.github/workflows/mirror-to-wireframe.yml`
   - This file is already created and configured

2. **Trigger the Workflow**
   
   **Option A: Push to main branch**
   ```bash
   # Make a change and push to main
   git checkout main
   git add .
   git commit -m "Trigger mirror to wireframe"
   git push origin main
   ```

   **Option B: Manual trigger**
   - Go to: [Actions tab](https://github.com/gollandi/ggocompassdev/actions)
   - Select "Mirror to ggocompasswireframedesign" workflow
   - Click "Run workflow"
   - Select branch: `main`
   - Click "Run workflow"

3. **Monitor the Workflow**
   - Go to the [Actions tab](https://github.com/gollandi/ggocompassdev/actions)
   - Click on the workflow run
   - Watch the progress - it should complete in about 30-60 seconds

### Step 4: Verify the Mirror

1. **Check the Target Repository**
   - Visit: [https://github.com/gollandi/ggocompasswireframedesign](https://github.com/gollandi/ggocompasswireframedesign)
   - Verify that the code has been pushed
   - Check that the commits match the source repository

## How It Works

The workflow performs the following steps:

1. **Checks out the code** from `ggocompassdev` with full git history
2. **Validates** that the `WIREFRAME_REPO_TOKEN` secret is configured
3. **Configures git** with a bot identity
4. **Adds a remote** pointing to the `ggocompasswireframedesign` repository
5. **Pushes** the `main` branch to the wireframe repository
6. **Reports** the status

## Workflow Configuration

```yaml
# Workflow triggers:
- Push to main branch
- Manual workflow dispatch

# What it pushes:
- Source: ggocompassdev (main branch)
- Target: ggocompasswireframedesign (main branch)
- Method: Force push (overwrites target)
```

## Troubleshooting

### Error: "WIREFRAME_REPO_TOKEN secret is not configured"

**Solution**: Follow Step 2 above to add the GitHub Personal Access Token as a secret.

### Error: "Authentication failed" or "Permission denied"

**Possible causes:**
1. The Personal Access Token has expired
2. The token doesn't have the correct scopes (needs `repo` scope)
3. The token was revoked or deleted

**Solution**: 
1. Create a new Personal Access Token (Step 1)
2. Update the `WIREFRAME_REPO_TOKEN` secret (Step 2)
3. Re-run the workflow

### Error: "Repository not found"

**Possible causes:**
1. The `ggocompasswireframedesign` repository doesn't exist
2. The PAT doesn't have access to the repository

**Solution**:
1. Verify the repository exists: [https://github.com/gollandi/ggocompasswireframedesign](https://github.com/gollandi/ggocompasswireframedesign)
2. If it doesn't exist, create it first
3. Ensure the PAT owner has access to both repositories

### The workflow doesn't trigger automatically

**Check**:
1. Is the workflow file on the `main` branch?
2. Is the workflow enabled? (Actions tab → Workflows → Mirror to ggocompasswireframedesign)
3. Are Actions enabled for the repository? (Settings → Actions → General)

## Security Notes

🔐 **Important Security Considerations:**

1. **Token Security**
   - Never commit the Personal Access Token to the repository
   - Store it only in GitHub Secrets
   - Treat it like a password

2. **Token Scope**
   - The token has full access to all repositories you have access to
   - Consider creating a dedicated machine user with limited access if this is a concern

3. **Token Expiration**
   - Set an appropriate expiration date
   - Set a calendar reminder to rotate the token before it expires
   - When the token expires, the workflow will stop working until you update it

4. **Force Push**
   - The workflow uses `--force` to push to the wireframe repository
   - This means it will overwrite any changes in the wireframe repository
   - If you make changes directly in the wireframe repository, they will be lost on the next mirror

## Manual Push (Alternative Method)

If you prefer to push manually without using GitHub Actions:

```bash
# Add the wireframe repository as a remote
git remote add wireframe https://github.com/gollandi/ggocompasswireframedesign.git

# Push to the wireframe repository
git push wireframe main:main

# For subsequent pushes
git push wireframe main:main
```

Note: This will prompt for your GitHub credentials. You can use a Personal Access Token as the password.

## Next Steps

After successfully mirroring the code:

1. ✅ Verify the code is in the `ggocompasswireframedesign` repository
2. ✅ Set up deployment for the wireframe repository (if needed)
3. ✅ Update any documentation to reference the new repository
4. ✅ Test the deployment from the wireframe repository

## Support

If you encounter issues:

1. Check the [Actions tab](https://github.com/gollandi/ggocompassdev/actions) for error messages
2. Review this setup guide
3. Verify all secrets are configured correctly
4. Check GitHub status: [https://www.githubstatus.com/](https://www.githubstatus.com/)

---

**Last Updated**: February 11, 2026  
**Status**: ✅ Ready to Use
