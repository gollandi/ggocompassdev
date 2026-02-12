# ✅ Setup Checklist: Mirror to ggocompasswireframedesign

Follow this checklist to set up automatic mirroring from ggocompassdev to ggocompasswireframedesign.

## Prerequisites
- [ ] You have admin access to the `gollandi/ggocompassdev` repository
- [ ] You have access to the `gollandi/ggocompasswireframedesign` repository
- [ ] You are signed in to GitHub

## Step 1: Create GitHub Personal Access Token
- [ ] Open in a new tab: https://github.com/settings/tokens/new
- [ ] Fill in the form:
  - [ ] **Note**: Enter `Mirror to ggocompasswireframedesign`
  - [ ] **Expiration**: Select `90 days` (or your preference)
  - [ ] **Scopes**: Check ✅ `repo` (this checks all sub-scopes automatically)
- [ ] Click "Generate token" button at the bottom
- [ ] **IMPORTANT**: Copy the token (starts with `ghp_`) and keep this tab open

## Step 2: Add Secret to Repository
- [ ] Open in a new tab: https://github.com/gollandi/ggocompassdev/settings/secrets/actions
- [ ] Click "New repository secret" button
- [ ] Enter the secret details:
  - [ ] **Name**: `WIREFRAME_REPO_TOKEN` (exact spelling, all caps)
  - [ ] **Secret**: Paste the token you copied in Step 1
- [ ] Click "Add secret" button
- [ ] Verify the secret appears in the list

## Step 3: Merge This PR (or Trigger Manually)

### Option A: Merge the PR
- [ ] Review the changes in this PR
- [ ] Merge this PR to the `main` branch
- [ ] The workflow will run automatically

### Option B: Manual Trigger (for testing)
- [ ] Open in a new tab: https://github.com/gollandi/ggocompassdev/actions/workflows/mirror-to-wireframe.yml
- [ ] Click "Run workflow" button (on the right side)
- [ ] Select branch: `main`
- [ ] Click the green "Run workflow" button

## Step 4: Verify the Workflow Runs
- [ ] Go to: https://github.com/gollandi/ggocompassdev/actions
- [ ] Click on the "Mirror to ggocompasswireframedesign" workflow run (the top one)
- [ ] Wait for it to complete (should take 30-60 seconds)
- [ ] Check for green checkmark ✅ indicating success

## Step 5: Verify Code Was Pushed
- [ ] Go to: https://github.com/gollandi/ggocompasswireframedesign
- [ ] Verify the repository has code
- [ ] Check the latest commit matches the source repository
- [ ] Verify all files are present

## Done! 🎉

Your automatic mirroring is now set up. From now on:
- ✅ Every push to `main` branch in ggocompassdev will automatically mirror to ggocompasswireframedesign
- ✅ You can manually trigger the mirror anytime from the Actions tab
- ✅ The repositories stay in sync automatically

## Troubleshooting

### ❌ Workflow fails with "WIREFRAME_REPO_TOKEN secret is not configured"
**Fix**: Go back to Step 2 and ensure you:
- Used the exact name: `WIREFRAME_REPO_TOKEN`
- Pasted the full token value
- Clicked "Add secret"

### ❌ Workflow fails with "Authentication failed" or "Permission denied"
**Possible causes**:
- Token doesn't have `repo` scope
- Token expired
- Wrong token value

**Fix**: 
- Delete the existing secret
- Create a new token (Step 1)
- Add the new token as a secret (Step 2)
- Try again

### ❌ Workflow fails with "Repository not found"
**Possible causes**:
- The wireframe repository doesn't exist
- Token owner doesn't have access to it

**Fix**:
- Verify https://github.com/gollandi/ggocompasswireframedesign exists
- If not, create it first
- Ensure the GitHub account that created the token has access to it

### ✅ Workflow succeeded but I don't see my code
**Check**:
- Are you looking at the `main` branch in the wireframe repository?
- Try refreshing the page
- Check if any files were actually changed in the source repository

## Next Steps

After successful mirroring:

1. **Set up Deployment** (if needed)
   - Connect the wireframe repository to Vercel
   - Configure environment variables
   - Deploy!

2. **Test the Deployment**
   - Verify the app works
   - Test all features
   - Check Sanity integration

3. **Monitor**
   - Watch the Actions tab for automatic mirror runs
   - Check that changes propagate correctly

## Need More Help?

📖 **Detailed Guides**:
- [QUICKSTART_MIRROR.md](./QUICKSTART_MIRROR.md) - Quick reference guide
- [MIRROR_TO_WIREFRAME_SETUP.md](./MIRROR_TO_WIREFRAME_SETUP.md) - Complete setup guide
- [SOLUTION_SUMMARY.md](./SOLUTION_SUMMARY.md) - Overview and benefits

🔧 **Workflow Documentation**:
- [.github/workflows/README.md](.github/workflows/README.md) - All workflows explained

---

**Last Updated**: February 11, 2026  
**Status**: Ready to use  
**Estimated Time**: 5 minutes
