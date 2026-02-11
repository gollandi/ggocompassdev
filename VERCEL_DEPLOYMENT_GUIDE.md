# Vercel Deployment Guide for GGO Compass

This guide explains how to deploy the GGO Compass application to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. Access to the Sanity CMS project credentials
3. GitHub repository access

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Import Project**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select the `gollandi/GGOCompass` repository
   - Click "Import"

2. **Configure Project**
   - **Framework Preset**: Next.js (should be auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Install Command**: `npm install --legacy-peer-deps`

3. **Set Environment Variables**
   
   Add the following environment variables in the Vercel project settings:
   
   | Variable Name | Description | Example Value |
   |--------------|-------------|---------------|
   | `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID | `m05ykm6e` |
   | `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name | `production` |
   | `SANITY_API_TOKEN` | Sanity API token for write access | `sk...` (from Sanity dashboard) |

   **Important**: 
   - These values are available in your `.env.example` file
   - For production, use your own Sanity project credentials
   - The `SANITY_API_TOKEN` should have appropriate read permissions

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (approximately 2-3 minutes)
   - Your app will be available at `https://your-project-name.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel

# Follow the prompts to:
# - Link to existing project or create new one
# - Set up environment variables
# - Deploy
```

## Environment Variables Setup

### Development Environment Variables
The `.env.example` file contains the default Sanity configuration:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=m05ykm6e
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk...
```

### Production Environment Variables
For production deployment on Vercel:

1. Go to your Vercel project dashboard
2. Navigate to "Settings" → "Environment Variables"
3. Add each variable:
   - Select environment: Production (and Preview if needed)
   - Add the variable name and value
   - Click "Save"

## Post-Deployment

### Verify Deployment

1. **Check Build Logs**
   - Go to Vercel dashboard → Your project → Deployments
   - Click on the latest deployment
   - Review the build logs for any errors

2. **Test the Application**
   - Visit your deployed URL
   - Test key features:
     - Homepage loads correctly
     - Procedure selection works
     - Location selection works
     - Recovery timeline displays
     - Sanity Studio is accessible at `/studio`

3. **Check Sanity Integration**
   - Verify procedures load from Sanity CMS
   - Verify locations load from Sanity CMS
   - Test content updates in Sanity Studio

### Custom Domain (Optional)

To add a custom domain:

1. Go to Vercel dashboard → Your project → Settings → Domains
2. Add your domain (e.g., `compass.ggo.med`)
3. Follow DNS configuration instructions
4. Wait for DNS propagation (usually 24-48 hours)

## Troubleshooting

### Build Failures

**Issue**: Build fails with "Configuration must contain `projectId`"
- **Solution**: Ensure `NEXT_PUBLIC_SANITY_PROJECT_ID` is set in environment variables

**Issue**: Build fails with TypeScript errors
- **Solution**: This has been fixed in the codebase. Pull the latest changes.

**Issue**: Build fails with peer dependency warnings
- **Solution**: Ensure install command uses `npm install --legacy-peer-deps`

### Runtime Issues

**Issue**: Pages show empty content
- **Solution**: Verify Sanity environment variables are correctly set and the Sanity project is accessible

**Issue**: Images don't load
- **Solution**: Check that `cdn.sanity.io` is allowed in `next.config.ts` (already configured)

**Issue**: Studio not accessible
- **Solution**: Ensure `/studio` route is not blocked and Sanity configuration is correct

## Automatic Deployments

Vercel automatically deploys:
- **Production**: When you push to the `main` branch
- **Preview**: When you push to other branches or open a pull request

To customize this behavior:
1. Go to Vercel dashboard → Your project → Settings → Git
2. Configure branch and deployment settings

## Performance Optimization

The application is configured for optimal Vercel performance:

- ✅ Static page generation for most routes
- ✅ Image optimization with Next.js Image component
- ✅ Sanity CDN enabled for faster content delivery
- ✅ Build caching enabled
- ✅ Automatic code splitting

## Monitoring

After deployment, monitor your application:

1. **Vercel Analytics**: View real-time performance metrics
2. **Build Logs**: Check deployment history and build logs
3. **Function Logs**: Monitor serverless function execution (if using API routes)

## Support

For issues related to:
- **Vercel Deployment**: Check [Vercel Documentation](https://vercel.com/docs)
- **Next.js**: Check [Next.js Documentation](https://nextjs.org/docs)
- **Sanity CMS**: Check [Sanity Documentation](https://www.sanity.io/docs)

## Deployment Checklist

Before deploying to production:

- [x] Build completes successfully locally
- [x] Environment variables configured
- [x] TypeScript errors fixed
- [x] Sanity CMS project is set up and populated with content
- [ ] Test the application locally with production environment variables
- [ ] Review security settings in Vercel dashboard
- [ ] Configure custom domain (if applicable)
- [ ] Set up monitoring and alerts
- [ ] Document any custom configurations

## Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Next.js Guide](https://vercel.com/docs/frameworks/nextjs)
- [Sanity Studio Deployment](https://www.sanity.io/docs/deployment)

---

**Version**: 1.0  
**Last Updated**: 2026-02-07  
**Status**: ✅ Ready for Deployment
