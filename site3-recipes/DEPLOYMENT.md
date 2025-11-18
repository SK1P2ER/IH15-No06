# 🚀 Deploying to Vercel

## Prerequisites
- A Vercel account (free) - Sign up at [vercel.com](https://vercel.com)
- Git installed (optional for drag-and-drop)

## Method 1: Vercel CLI (Recommended - 3 Minutes!)

The fastest way to deploy with automatic optimizations.

### Steps:

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to your project**
   ```bash
   cd site3-recipes
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - **Set up and deploy?** → `Y` (Yes)
   - **Which scope?** → Select your account
   - **Link to existing project?** → `N` (No)
   - **What's your project's name?** → `vegan-recipes` (or any name)
   - **In which directory is your code located?** → `./` (current directory)
   - **Want to modify settings?** → `N` (No)

5. **Your site is live!** 🎉
   - Vercel will provide a URL like `https://vegan-recipes.vercel.app`
   - Your site is automatically deployed with global CDN

### Deploy to Production:
```bash
vercel --prod
```

## Method 2: Git-Based Deployment (Continuous Deployment)

Automatically deploy on every git push.

### Steps:

1. **Create a Git Repository**
   ```bash
   cd site3-recipes
   git init
   git add .
   git commit -m "Initial commit: Vegan recipe collection"
   ```

2. **Push to GitHub**
   - Create a new repository on GitHub (e.g., `vegan-recipes`)
   - Push your code:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/vegan-recipes.git
   git branch -M main
   git push -u origin main
   ```

3. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click **"Import Project"**
   - Choose **"Import Git Repository"**
   - Authorize Vercel to access your GitHub
   - Select your `vegan-recipes` repository

4. **Configure (mostly automatic)**
   - **Project Name**: vegan-recipes
   - **Framework Preset**: Other (for vanilla HTML/CSS/JS)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty or `.`
   - Click **"Deploy"**

5. **Automatic Deployments**
   - Every push to `main` branch auto-deploys
   - Pull requests get preview URLs
   - Instant rollbacks available

## Method 3: Drag & Drop (Easiest - No Git Required)

### Steps:

1. **Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub, GitLab, or email

2. **Prepare Files**
   - Make sure your `site3-recipes` folder contains:
     - `index.html`
     - `styles.css`
     - `script.js`

3. **Deploy**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Scroll to **"Or, deploy a Template"**
   - Click **"Browse"** or drag your `site3-recipes` folder
   - Vercel uploads and deploys automatically

4. **Done!**
   - Get instant URL: `https://random-name.vercel.app`

## Updating Your Site

### CLI Method:
```bash
cd site3-recipes
vercel --prod
```

### Git Method:
```bash
git add .
git commit -m "Update recipes"
git push
```
Vercel automatically detects changes and redeploys (30-60 seconds).

### Drag & Drop:
- Make changes to your files
- Drag the updated folder to Vercel dashboard again
- Previous versions are preserved

## Custom Domain

### Using Vercel Subdomain (Free):
- Automatically provided: `your-project-name.vercel.app`
- Free HTTPS included

### Using Your Own Domain:

1. **Buy a domain** (Namecheap, GoDaddy, Google Domains, etc.)

2. **Add domain in Vercel:**
   - Go to your project dashboard
   - Click **"Settings"** → **"Domains"**
   - Enter your domain (e.g., `vegandelights.com`)
   - Click **"Add"**

3. **Configure DNS:**

   **Option A - Using Vercel Nameservers (Recommended):**
   - Vercel provides nameservers
   - Update your domain provider's nameservers to Vercel's
   - Vercel manages all DNS automatically

   **Option B - Using CNAME:**
   - Add CNAME record at your domain provider:
     - Name: `www` or `@`
     - Value: `cname.vercel-dns.com`

4. **SSL Certificate:**
   - Automatically provisioned (free via Let's Encrypt)
   - Usually ready in 5-10 minutes

## Advanced Configuration

### Create `vercel.json` (Optional)

```json
{
  "version": 2,
  "buildCommand": null,
  "outputDirectory": ".",
  "framework": null,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/old-recipe",
      "destination": "/",
      "permanent": true
    }
  ]
}
```

### Environment Variables

1. Go to **Project Settings** → **Environment Variables**
2. Add variables (e.g., API keys)
3. Access in JavaScript:
   ```javascript
   const apiKey = process.env.API_KEY;
   ```

### Custom 404 Page

Create `404.html` in your root directory:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Recipe Not Found</title>
</head>
<body>
    <h1>🍽️ Recipe Not Found</h1>
    <p>This recipe doesn't exist yet!</p>
    <a href="/">Back to Recipes</a>
</body>
</html>
```

## Vercel Features

✅ **Global CDN** - Lightning-fast worldwide
✅ **Automatic HTTPS** - Free SSL certificates
✅ **Git Integration** - Deploy on push
✅ **Preview Deployments** - Every PR gets a URL
✅ **Instant Rollbacks** - One-click to previous versions
✅ **Analytics** (Pro plan) - Traffic insights
✅ **Custom Domains** - Unlimited domains
✅ **Zero Configuration** - Works out of the box

## Performance Optimizations

Vercel automatically optimizes:
- **Image Optimization** (if you add images later)
- **Compression** - Gzip/Brotli
- **Caching** - Smart cache headers
- **Edge Network** - 100+ global locations

### Manual Optimizations:

1. **Minify CSS/JS** (optional, Vercel does this):
   ```bash
   npm install -g minify
   minify styles.css > styles.min.css
   minify script.js > script.min.js
   ```

2. **Optimize Images** (when you add real images):
   - Use WebP format
   - Compress with TinyPNG or ImageOptim
   - Vercel has built-in image optimization

## Deployment URLs

Vercel provides multiple URLs:

1. **Production URL**: `your-project.vercel.app`
2. **Git Branch URLs**: `branch-name-project.vercel.app`
3. **Commit URLs**: `project-git-commit-hash.vercel.app`
4. **Custom Domains**: Your own domain

## Collaboration

### Add Team Members:
1. Project Settings → Team
2. Invite by email
3. Set permissions (Viewer, Developer, Admin)

### Deploy Previews:
- Every pull request gets a preview URL
- Share with team for review
- Merge when ready

## Monitoring & Debugging

### View Logs:
```bash
vercel logs https://your-project.vercel.app
```

### Analytics (Free tier):
- Visit project dashboard
- Click "Analytics" tab
- See visitor stats, top pages, etc.

### Speed Insights (Pro):
- Real user performance metrics
- Lighthouse scores
- Web Vitals tracking

## Troubleshooting

**Site not loading?**
- Check that `index.html` is in root directory
- Verify file paths are relative (no absolute paths)
- Check Vercel deployment logs for errors

**CSS/JS not working?**
- Ensure file names match exactly (case-sensitive)
- Check browser console for errors (F12)
- Verify files are in the same directory

**Changes not showing?**
- Clear browser cache (Ctrl + F5)
- Check deployment status in Vercel dashboard
- Make sure you deployed to production (`vercel --prod`)

**Build failed?**
- Check Vercel build logs
- Ensure no build command is set (static site)
- Verify all files are committed (Git method)

## Features of This Recipe Site

✅ **Flip Cards** - 3D card animations to view recipes
✅ **Category Filtering** - Breakfast, Lunch, Dinner, Dessert
✅ **Grid/List View Toggle** - Switch layouts
✅ **Smooth Animations** - Parallax hero, stagger effects
✅ **Responsive Design** - Works on all devices
✅ **Keyboard Navigation** - Press ESC to flip cards back
✅ **Intersection Observer** - Cards animate on scroll
✅ **LocalStorage Ready** - Favorite recipes (bonus feature)
✅ **Print Recipes** - Print-friendly format (bonus feature)

## Scaling & Pricing

### Free Tier (Hobby):
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ HTTPS included
- ✅ Custom domains
- ✅ Preview deployments
- ✅ Automatic optimizations

### Pro Tier ($20/month):
- Everything in Free
- Analytics
- Team collaboration
- 1 TB bandwidth
- Priority support

## Next Steps

- Add more recipes (duplicate HTML structure)
- Replace emoji placeholders with real food images
- Implement search functionality
- Add "favorites" feature with localStorage
- Create recipe rating system
- Add recipe submission form
- Implement recipe categories expansion
- Create a recipe API endpoint (Vercel Serverless Functions)

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Vercel Git Integration](https://vercel.com/docs/git)
- [Custom Domains Guide](https://vercel.com/docs/custom-domains)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

## Comparison: Vercel vs Netlify vs GitHub Pages

| Feature | Vercel | Netlify | GitHub Pages |
|---------|--------|---------|--------------|
| Deployment Speed | ⚡ Fastest | ⚡ Fast | 🐌 Slow |
| CDN | Global (100+) | Global (190+) | Limited |
| HTTPS | ✅ Auto | ✅ Auto | ✅ Auto |
| Custom Domains | ✅ Unlimited | ✅ Unlimited | ✅ Limited |
| Build Minutes | Unlimited | 300/mo free | N/A |
| Framework Support | Excellent | Excellent | Basic |
| Preview URLs | ✅ | ✅ | ❌ |

**Vercel is optimal for:**
- Fastest global performance
- Next.js and React apps
- Serverless functions
- Instant deployments

---

Enjoy your lightning-fast Vegan Recipe site on Vercel! 🌱⚡
