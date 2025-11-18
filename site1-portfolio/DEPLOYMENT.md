# 🚀 Deploying to GitHub Pages

## Prerequisites
- A GitHub account
- Git installed on your computer

## Step-by-Step Deployment

### Method 1: Using GitHub Web Interface (Easiest)

1. **Create a new repository on GitHub**
   - Go to [GitHub](https://github.com) and log in
   - Click the "+" icon in the top right → "New repository"
   - Name it: `portfolio` (or any name you prefer)
   - Make it **Public**
   - Don't add README, .gitignore, or license
   - Click "Create repository"

2. **Initialize Git in your project folder**
   Open terminal/command prompt in the `site1-portfolio` folder and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Personal portfolio"
   ```

3. **Connect to GitHub and push**
   Replace `YOUR-USERNAME` with your actual GitHub username:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** (top right)
   - Scroll down to **Pages** (left sidebar)
   - Under "Source", select:
     - Branch: `main`
     - Folder: `/ (root)`
   - Click **Save**

5. **Wait for deployment** (1-2 minutes)
   - Your site will be live at: `https://YOUR-USERNAME.github.io/portfolio/`
   - GitHub will show the URL in the Pages section

### Method 2: Using GitHub Desktop (For Beginners)

1. **Download GitHub Desktop**
   - Go to [desktop.github.com](https://desktop.github.com)
   - Install and sign in with your GitHub account

2. **Create repository**
   - Click "Create a New Repository on your Hard Drive"
   - Name: `portfolio`
   - Local Path: Choose `site1-portfolio` folder
   - Click "Create Repository"

3. **Publish to GitHub**
   - Click "Publish repository" button
   - Uncheck "Keep this code private"
   - Click "Publish Repository"

4. **Enable GitHub Pages** (same as Method 1, step 4)

## Updating Your Site

Whenever you make changes:

```bash
git add .
git commit -m "Update portfolio content"
git push
```

GitHub Pages will automatically rebuild and deploy (takes 1-2 minutes).

## Custom Domain (Optional)

1. Buy a domain from Namecheap, GoDaddy, etc.
2. In your repository settings → Pages → Custom domain
3. Enter your domain and click Save
4. Add a `CNAME` file in your repository with your domain name
5. Configure DNS settings at your domain provider:
   - Add CNAME record pointing to `YOUR-USERNAME.github.io`

## Troubleshooting

**Site not loading?**
- Check that GitHub Pages is enabled in Settings
- Ensure branch is set to `main` and folder to `/ (root)`
- Wait a few minutes for deployment

**404 Error?**
- Make sure your main file is named `index.html`
- Check that files are in the root of the repository

**CSS/JS not loading?**
- Use relative paths (e.g., `styles.css` not `/styles.css`)
- Check file names match exactly (case-sensitive)

## Testing Locally

Before deploying, test locally by opening `index.html` in your browser, or use:

```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000 in your browser
```

## Features of This Portfolio

✅ **Responsive Design** - Works on all devices
✅ **Dark/Light Theme** - Toggle with localStorage persistence
✅ **Smooth Animations** - Typing effect, scroll animations
✅ **Interactive Elements** - Skill bars, hover effects
✅ **Contact Form** - Form validation (ready for backend integration)
✅ **SEO Friendly** - Semantic HTML structure

## Next Steps

- Replace placeholder content with your actual information
- Add your own projects to the Projects section
- Update social links with your actual profiles
- Add real images instead of emoji placeholders
- Connect contact form to a backend service (FormSpree, EmailJS, etc.)

## Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
- [Markdown Guide](https://www.markdownguide.org/)
