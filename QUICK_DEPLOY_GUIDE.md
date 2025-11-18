# 🚀 Quick Deployment Guide

Deploy all 4 sites in under 30 minutes!

## 📍 Deployment Plan

| Site | Platform | Folder | Time | Difficulty |
|------|----------|--------|------|------------|
| Portfolio | **GitHub Pages** | `site1-portfolio/` | 5 min | Easy |
| Weather | **Netlify** | `site2-weather/` | 3 min | Very Easy |
| Recipes | **Vercel** | `site3-recipes/` | 3 min | Very Easy |
| Game | **Cloudflare Pages** | `site4-game/` | 5 min | Easy |

---

## 1️⃣ Deploy Portfolio to GitHub Pages

### Steps:

1. **Go to your repository**: https://github.com/SK1P2ER/IH15-No06

2. **Go to Settings** → **Pages** (left sidebar)

3. **Configure Source**:
   - Source: Deploy from a branch
   - Branch: `main`
   - Folder: `/ (root)`
   - Click **Save**

4. **Wait 1-2 minutes** for deployment

5. **Your site will be live at**:
   ```
   https://sk1p2er.github.io/IH15-No06/site1-portfolio/
   ```

### Alternative: Use GitHub Pages with custom path

To make it just `/portfolio`:
- Create a new branch: `gh-pages`
- Copy only `site1-portfolio/*` files to root
- Set GitHub Pages to deploy from `gh-pages` branch

---

## 2️⃣ Deploy Weather to Netlify

### Steps:

1. **Go to**: https://app.netlify.com

2. **Sign up/Login** (free)

3. **Deploy Method A - Drag & Drop** (Fastest):
   - Scroll to "Want to deploy a new site without connecting to Git?"
   - **Drag** the `site2-weather` folder onto the drop zone
   - Done! Get instant URL like: `https://random-name.netlify.app`

4. **Deploy Method B - Git Integration**:
   - Click **"Add new site"** → **"Import an existing project"**
   - Choose **GitHub**
   - Select repository: `IH15-No06`
   - Build settings:
     - Base directory: `site2-weather`
     - Build command: (leave empty)
     - Publish directory: `.` or `/`
   - Click **Deploy site**

5. **Customize URL**:
   - Site settings → Change site name
   - Example: `ih15-weather-dashboard.netlify.app`

### Your site URL:
```
https://YOUR-SITE-NAME.netlify.app
```

---

## 3️⃣ Deploy Recipes to Vercel

### Steps:

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Navigate to recipe folder**:
   ```bash
   cd site3-recipes
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Follow prompts**:
   - Set up and deploy? **Y**
   - Which scope? (Select your account)
   - Link to existing project? **N**
   - Project name: `ih15-recipes`
   - In which directory? `./`
   - Override settings? **N**

5. **Deploy to production**:
   ```bash
   vercel --prod
   ```

### Alternative: Vercel Web UI

1. Go to: https://vercel.com/new
2. **Import Git Repository**
3. Select `IH15-No06` repository
4. Configure:
   - Root Directory: `site3-recipes`
   - Framework: Other
   - Build Command: (leave empty)
   - Output Directory: `.`
5. Click **Deploy**

### Your site URL:
```
https://ih15-recipes.vercel.app
```

---

## 4️⃣ Deploy Game to Cloudflare Pages

### Steps:

1. **Go to**: https://dash.cloudflare.com

2. **Sign up/Login** (free)

3. **Create New Project**:
   - Click **Pages** (left sidebar)
   - Click **Create application**
   - Choose **Connect to Git**

4. **Connect GitHub**:
   - Select **GitHub**
   - Authorize Cloudflare
   - Select repository: `IH15-No06`

5. **Configure Build**:
   - Project name: `ih15-click-game`
   - Production branch: `main`
   - Build settings:
     - Framework preset: **None**
     - Build command: (leave empty)
     - Build output directory: `site4-game`
   - Click **Save and Deploy**

6. **Wait 2-3 minutes** for deployment

### Your site URL:
```
https://ih15-click-game.pages.dev
```

### Custom Domain (Optional):
- Custom domains → Add a domain
- Follow DNS configuration steps

---

## 🎯 All Sites Deployed!

Once you've deployed all 4 sites, update the README.md with your live URLs:

```markdown
## 🔗 Live Sites

| Site | Platform | URL |
|------|----------|-----|
| Portfolio | GitHub Pages | https://sk1p2er.github.io/IH15-No06/site1-portfolio/ |
| Weather | Netlify | https://YOUR-SITE.netlify.app |
| Recipes | Vercel | https://ih15-recipes.vercel.app |
| Game | Cloudflare | https://ih15-click-game.pages.dev |
```

---

## 🔄 Auto-Deployment (After Initial Setup)

All platforms support automatic deployment:

- **Push to GitHub** → All sites automatically redeploy
- **Pull Request** → Get preview URLs (Netlify, Vercel, Cloudflare)
- **Rollback** → One-click rollback to previous versions

### Update your sites:
```bash
# Make changes to any site
git add .
git commit -m "Update site"
git push

# Wait 1-3 minutes for automatic deployment
```

---

## 🆓 Free Tier Limits

| Platform | Bandwidth | Build Minutes | Custom Domain |
|----------|-----------|---------------|---------------|
| **GitHub Pages** | 100 GB/month | Unlimited | 1 domain |
| **Netlify** | 100 GB/month | 300 min/month | Unlimited |
| **Vercel** | 100 GB/month | Unlimited | Unlimited |
| **Cloudflare** | Unlimited | 500 builds/month | Unlimited |

All have generous free tiers - perfect for your project!

---

## 🛠️ Troubleshooting

### Site not loading?
- Wait 2-5 minutes for deployment
- Check deployment logs in platform dashboard
- Verify file paths are relative (no `C:\...` paths)

### CSS/JS not working?
- Ensure `index.html`, `styles.css`, `script.js` are in same folder
- Check browser console for errors (F12)
- Clear browser cache (Ctrl + F5)

### Build failed?
- For static sites, leave build command empty
- Set output directory to `.` or `/` or folder name
- Check that all files are committed to GitHub

---

## ✅ Next Steps

1. ✅ Deploy all 4 sites
2. ✅ Test each site works correctly
3. ✅ Update README.md with live URLs
4. ✅ Share your project on LinkedIn/Twitter
5. ✅ Add to your resume/portfolio

---

## 📞 Support Links

- GitHub Pages: https://docs.github.com/pages
- Netlify: https://docs.netlify.com
- Vercel: https://vercel.com/docs
- Cloudflare: https://developers.cloudflare.com/pages

---

**Ready to deploy? Start with Netlify (easiest) and work your way through all 4!** 🚀
