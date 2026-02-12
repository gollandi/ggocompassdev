# Quick Start: Push to ggocompasswireframedesign

This is a quick reference guide to get your code mirrored to the `ggocompasswireframedesign` repository.

## What Was Done

✅ Created a GitHub Actions workflow that automatically pushes code from `ggocompassdev` to `ggocompasswireframedesign`  
✅ Added comprehensive setup documentation  
✅ Updated project documentation to reference the new capability

## Quick Setup (5 Minutes)

### Step 1: Create GitHub Token (2 minutes)

1. Visit: [https://github.com/settings/tokens/new](https://github.com/settings/tokens/new)
2. **Note**: `Mirror to ggocompasswireframedesign`
3. **Expiration**: Choose your preference (e.g., 90 days, 1 year)
4. **Scopes**: Check ✅ `repo` (Full control of private repositories)
5. Click "Generate token"
6. **Copy the token** (starts with `ghp_`) - you won't see it again!

### Step 2: Add Token to Repository (2 minutes)

1. Go to: [https://github.com/gollandi/ggocompassdev/settings/secrets/actions](https://github.com/gollandi/ggocompassdev/settings/secrets/actions)
2. Click "New repository secret"
3. **Name**: `WIREFRAME_REPO_TOKEN`
4. **Value**: Paste the token from Step 1
5. Click "Add secret"

### Step 3: Trigger the Mirror (1 minute)

**Option A - Automatic (when this PR is merged):**
- The workflow will run automatically when code is pushed to `main` branch

**Option B - Manual trigger:**
1. Go to: [https://github.com/gollandi/ggocompassdev/actions](https://github.com/gollandi/ggocompassdev/actions)
2. Click "Mirror to ggocompasswireframedesign" workflow
3. Click "Run workflow" dropdown
4. Select branch: `main`
5. Click "Run workflow" button

### Step 4: Verify (1 minute)

1. Check the workflow status in the [Actions tab](https://github.com/gollandi/ggocompassdev/actions)
2. When complete, verify code at: [https://github.com/gollandi/ggocompasswireframedesign](https://github.com/gollandi/ggocompasswireframedesign)

## Files Created

- `.github/workflows/mirror-to-wireframe.yml` - The workflow that does the mirroring
- `MIRROR_TO_WIREFRAME_SETUP.md` - Complete setup guide with troubleshooting
- `QUICKSTART_MIRROR.md` - This file (quick reference)

## What Happens Automatically

Once set up, the workflow will automatically:
- Push code to `ggocompasswireframedesign` whenever you push to `main` branch
- Mirror the entire codebase (force push)
- Keep both repositories in sync

## Important Notes

⚠️ **Force Push**: The workflow uses force push, so any changes made directly in the wireframe repository will be overwritten.

⚠️ **Token Expiration**: The GitHub token will expire based on the expiration you set. Set a calendar reminder to renew it before it expires.

✅ **No Vercel Secrets Needed**: This mirroring doesn't require Vercel credentials - only a GitHub token.

## Need Help?

- **Full setup guide**: [MIRROR_TO_WIREFRAME_SETUP.md](./MIRROR_TO_WIREFRAME_SETUP.md)
- **Troubleshooting**: See the troubleshooting section in [MIRROR_TO_WIREFRAME_SETUP.md](./MIRROR_TO_WIREFRAME_SETUP.md)
- **Workflow documentation**: [.github/workflows/README.md](.github/workflows/README.md)

## Next Steps After Mirroring

1. Set up deployment for the `ggocompasswireframedesign` repository on Vercel (if needed)
2. Configure environment variables for the new deployment
3. Test the wireframe repository deployment

---

**Last Updated**: February 11, 2026  
**Status**: ✅ Ready to Use
