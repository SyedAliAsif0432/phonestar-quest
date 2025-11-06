# Vercel Deployment Guide for Phonester Quest

This guide will walk you through deploying your Phaser.js game to Vercel step by step.

## Prerequisites

- A GitHub, GitLab, or Bitbucket account
- A Vercel account (free tier is fine)
- Your project should be pushed to a Git repository

## Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. **Ensure your project is in a Git repository:**
   ```bash
   git status
   ```
   If you're not in a Git repo, initialize one:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - ready for Vercel deployment"
   ```

2. **Push to a remote repository:**
   - Create a new repository on GitHub/GitLab/Bitbucket
   - Push your code:
   ```bash
   git remote add origin <your-repository-url>
   git branch -M main
   git push -u origin main
   ```

### Step 2: Create a Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Log In"**
3. Sign up using your GitHub/GitLab/Bitbucket account (recommended for easier integration)

### Step 3: Import Your Project

1. **From Vercel Dashboard:**
   - Click **"Add New..."** → **"Project"**
   - You'll see a list of your repositories
   - Find and click **"Import"** next to your `phonester-quest` repository

2. **If your repo isn't listed:**
   - Click **"Adjust GitHub App Permissions"** or **"Import Git Repository"**
   - Grant Vercel access to your repositories
   - Refresh and try again

### Step 4: Configure Project Settings

Vercel should auto-detect your Vite project, but verify these settings:

1. **Framework Preset:** Should be set to **"Vite"** (auto-detected)
2. **Root Directory:** Leave as **"."** (root)
3. **Build Command:** Should be `npm run build` (already configured in `vercel.json`)
4. **Output Directory:** Should be `dist` (already configured in `vercel.json`)
5. **Install Command:** Should be `npm install` (default)

**Note:** The `vercel.json` file in your project already has these settings configured, so Vercel should use them automatically.

### Step 5: Environment Variables (if needed)

If your project uses any environment variables:

1. In the project settings, go to **"Environment Variables"**
2. Add any required variables (e.g., API keys, configuration)
3. For now, you likely don't need any unless you have external services

### Step 6: Deploy

1. Click **"Deploy"** button
2. Vercel will:
   - Install dependencies (`npm install`)
   - Build your project (`npm run build`)
   - Deploy to a production URL

3. **Wait for deployment to complete** (usually 1-3 minutes)

### Step 7: Verify Deployment

1. Once deployment is complete, you'll see:
   - A success message
   - A production URL (e.g., `phonester-quest.vercel.app`)
   - Option to add a custom domain

2. **Click the URL** to test your game:
   - Verify all assets load correctly
   - Test game functionality
   - Check that all scenes work properly

### Step 8: Custom Domain (Optional)

1. In your project dashboard, go to **"Settings"** → **"Domains"**
2. Add your custom domain (e.g., `phonester-quest.com`)
3. Follow Vercel's instructions to configure DNS records
4. Wait for DNS propagation (can take up to 24 hours)

## Automatic Deployments

Vercel automatically deploys:
- **Production:** Every push to `main` branch
- **Preview:** Every push to other branches (creates preview URLs)

## Troubleshooting

### Build Fails

1. **Check build logs** in Vercel dashboard
2. **Common issues:**
   - Missing dependencies: Ensure all packages are in `package.json`
   - TypeScript errors: Fix any TS errors locally first
   - Asset path issues: Ensure assets are in `public/` or `src/assets/`

### Assets Not Loading

1. **Check asset paths:**
   - Use relative paths or paths starting with `/`
   - Assets in `public/` are served from root
   - Assets in `src/assets/` are bundled by Vite

2. **Verify build output:**
   - Check if assets are in the `dist` folder after local build
   - Run `npm run build` locally to test

### Routing Issues (404 on refresh)

- The `vercel.json` already includes SPA rewrites
- If you still have issues, ensure the rewrite rule is correct

### Performance Issues

1. **Optimize images:**
   - Compress large images
   - Use appropriate formats (WebP when possible)

2. **Check bundle size:**
   - Run `npm run build` locally
   - Check `dist` folder size
   - Consider code splitting if bundle is too large

## Updating Your Deployment

1. **Make changes** to your code
2. **Commit and push:**
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```
3. **Vercel automatically:**
   - Detects the push
   - Builds the new version
   - Deploys it (usually in 1-2 minutes)

## Useful Vercel Features

- **Preview Deployments:** Every branch gets its own URL
- **Analytics:** Enable in project settings (may require upgrade)
- **Speed Insights:** Monitor performance (may require upgrade)
- **Logs:** View real-time logs in the dashboard

## Next Steps

- ✅ Your project is now live on Vercel!
- 🔗 Share your game URL with others
- 🔄 Continue developing - every push auto-deploys
- 📊 Monitor performance and errors in Vercel dashboard

## Support

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Vite Deployment:** [vitejs.dev/guide/static-deploy.html](https://vitejs.dev/guide/static-deploy.html)
- **Vercel Support:** Available in dashboard or [vercel.com/support](https://vercel.com/support)

---

**Happy Deploying! 🚀**

