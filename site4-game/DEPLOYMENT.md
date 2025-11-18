# 🚀 Deploying to Azure Static Web Apps

## Prerequisites
- Azure account (free tier available) - Sign up at [azure.microsoft.com](https://azure.microsoft.com/free/)
- GitHub account
- Git installed

## Why Azure Static Web Apps?

- ✅ **Free SSL certificates**
- ✅ **Global CDN distribution**
- ✅ **GitHub integration with CI/CD**
- ✅ **Custom domains**
- ✅ **Staging environments**
- ✅ **API integration ready** (Azure Functions)
- ✅ **Free tier (100 GB bandwidth/month)**

## Method 1: Azure Portal + GitHub (Recommended)

### Step 1: Prepare Your Repository

1. **Create Git repository**
   ```bash
   cd site4-game
   git init
   git add .
   git commit -m "Initial commit: Click Master game"
   ```

2. **Push to GitHub**
   - Create a new repository on GitHub named `click-master-game`
   - Push your code:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/click-master-game.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Create Azure Static Web App

1. **Sign in to Azure Portal**
   - Go to [portal.azure.com](https://portal.azure.com)
   - Sign in or create free account

2. **Create Static Web App**
   - Click **"Create a resource"**
   - Search for **"Static Web Apps"**
   - Click **"Create"**

3. **Configure Basic Settings**
   - **Subscription**: Select your subscription (or create free trial)
   - **Resource Group**: Create new → `click-master-rg`
   - **Name**: `click-master-game` (becomes your subdomain)
   - **Plan type**: Free
   - **Region**: Choose closest to you (e.g., West US 2, East US)

4. **Configure Deployment**
   - **Source**: GitHub
   - **Organization**: Your GitHub username
   - **Repository**: `click-master-game`
   - **Branch**: `main`

5. **Build Details**
   - **Build Presets**: Custom
   - **App location**: `/` (root)
   - **Api location**: Leave empty
   - **Output location**: Leave empty or `.`

6. **Review + Create**
   - Click **"Review + create"**
   - Click **"Create"**

7. **Wait for Deployment** (2-3 minutes)
   - Azure automatically:
     - Creates GitHub Actions workflow
     - Builds and deploys your site
     - Provides a URL like `https://happy-ocean-123abc.azurestaticapps.net`

### Step 3: Access Your Site

1. After deployment completes, click **"Go to resource"**
2. Click the **URL** shown
3. Your Click Master game is now live! 🎮

## Method 2: Azure CLI (For Developers)

### Install Azure CLI:
```bash
# Windows (using winget)
winget install Microsoft.AzureCLI

# macOS
brew install azure-cli

# Linux
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

### Deploy:
```bash
# Login to Azure
az login

# Create resource group
az group create --name click-master-rg --location eastus

# Create static web app
az staticwebapp create \
  --name click-master-game \
  --resource-group click-master-rg \
  --source https://github.com/YOUR-USERNAME/click-master-game \
  --location eastus \
  --branch main \
  --app-location "/" \
  --output-location "."
```

## Method 3: VS Code Extension (Easiest for Beginners)

### Steps:

1. **Install VS Code Extension**
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search for **"Azure Static Web Apps"**
   - Install it

2. **Sign in to Azure**
   - Click Azure icon in sidebar
   - Sign in to your Azure account

3. **Deploy**
   - Right-click your project folder
   - Select **"Create Static Web App"**
   - Follow prompts:
     - Choose subscription
     - Enter name: `click-master-game`
     - Choose region
     - Select build preset: **"Custom"**
     - App location: `/`
     - Output location: `.`

4. **Done!**
   - Extension handles GitHub repo creation and deployment
   - URL provided in output panel

## GitHub Actions Workflow

Azure automatically creates a workflow file at `.github/workflows/azure-static-web-apps-xxx.yml`:

```yaml
name: Azure Static Web Apps CI/CD

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - main

jobs:
  build_and_deploy_job:
    runs_on: ubuntu-latest
    name: Build and Deploy
    steps:
      - uses: actions/checkout@v2
      - name: Build And Deploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/"
          output_location: "."
```

## Updating Your Site

### Automatic Deployment:
```bash
# Make changes
git add .
git commit -m "Update game features"
git push
```

GitHub Actions automatically:
- Detects the push
- Builds your site
- Deploys to Azure
- Usually takes 2-3 minutes

### Manual Deployment:
```bash
# Using Azure CLI
az staticwebapp update \
  --name click-master-game \
  --resource-group click-master-rg
```

## Custom Domain

### Step 1: Add Custom Domain

1. Go to Azure Portal → Your Static Web App
2. Click **"Custom domains"** (left sidebar)
3. Click **"+ Add"**
4. Choose **"Custom domain on Azure DNS"** or **"Custom domain on other DNS"**

### Step 2: Configure DNS

**Option A - Using Azure DNS:**
- Follow Azure's instructions
- Azure manages DNS automatically

**Option B - Using External DNS (e.g., Namecheap):**

Add these DNS records:

**For root domain (clickmaster.com):**
- Type: `A`
- Host: `@`
- Value: `20.50.10.10` (example IP from Azure)

**For www subdomain:**
- Type: `CNAME`
- Host: `www`
- Value: `happy-ocean-123abc.azurestaticapps.net`

### Step 3: Validate Domain

1. Click **"Validate"** in Azure Portal
2. Wait for DNS propagation (5-60 minutes)
3. SSL certificate automatically issued (free)

## Environment Variables

### Add Environment Variables (for API keys, etc.):

1. Azure Portal → Your Static Web App
2. Click **"Configuration"** (left sidebar)
3. Click **"+ Add"**
4. Enter name and value
5. Click **"OK"** and **"Save"**

Access in JavaScript:
```javascript
// Note: Client-side env variables must be prefixed with PUBLIC_
const apiKey = process.env.PUBLIC_API_KEY;
```

## Staging Environments

Azure automatically creates preview environments for Pull Requests!

### How it works:
1. Create a PR on GitHub
2. GitHub Actions builds a preview
3. Get a unique URL like: `https://happy-ocean-123abc-pr-5.azurestaticapps.net`
4. Test changes before merging
5. Preview deleted when PR is closed/merged

## Azure Static Web Apps Features

### Free Tier Includes:
- ✅ 100 GB bandwidth/month
- ✅ Custom domains
- ✅ Free SSL certificates
- ✅ Global CDN (Azure Front Door)
- ✅ GitHub Actions integration
- ✅ Staging environments (preview deployments)
- ✅ 2 custom domains
- ✅ Authentication providers

### Standard Tier ($9/month):
- 100 GB bandwidth (extra $0.20/GB)
- Unlimited custom domains
- SLA guarantee
- Advanced routing

## Integrating Azure Functions (Optional)

Azure Static Web Apps can include serverless API endpoints!

### Create API folder:
```bash
mkdir api
cd api
```

### Example Function (`api/hello/index.js`):
```javascript
module.exports = async function (context, req) {
    context.res = {
        body: { message: "Hello from Azure!" }
    };
};
```

### Update workflow:
```yaml
api_location: "api"
```

### Access from frontend:
```javascript
fetch('/api/hello')
    .then(res => res.json())
    .then(data => console.log(data.message));
```

## Authentication (Built-in)

Azure Static Web Apps has built-in auth!

### Enable Authentication:
```javascript
// Check if user is logged in
fetch('/.auth/me')
    .then(res => res.json())
    .then(user => {
        if (user.clientPrincipal) {
            console.log('Logged in as:', user.clientPrincipal.userDetails);
        }
    });
```

### Login/Logout Links:
```html
<a href="/.auth/login/github">Login with GitHub</a>
<a href="/.auth/logout">Logout</a>
```

## Monitoring & Analytics

### View Metrics:
1. Azure Portal → Your Static Web App
2. Click **"Metrics"** (left sidebar)
3. View:
   - Request count
   - Bandwidth usage
   - Error rates

### Application Insights (Optional):
1. Create Application Insights resource
2. Link to your Static Web App
3. Get detailed analytics, performance tracking

## Troubleshooting

**Site not loading?**
- Check GitHub Actions tab for build errors
- Verify `app_location` is set to `/` or correct path
- Ensure `index.html` is in root directory

**Build failing?**
- Check workflow file syntax
- Verify repository permissions
- Check Azure Static Web Apps token in GitHub secrets

**Custom domain not working?**
- Wait for DNS propagation (can take up to 48 hours)
- Verify DNS records are correct
- Check domain validation status in Azure

**404 on page refresh?**
- Add `staticwebapp.config.json`:
```json
{
  "navigationFallback": {
    "rewrite": "/index.html"
  }
}
```

## Configuration File (Optional)

Create `staticwebapp.config.json` in root:

```json
{
  "routes": [
    {
      "route": "/api/*",
      "allowedRoles": ["authenticated"]
    }
  ],
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/images/*.{png,jpg,gif}", "/css/*"]
  },
  "responseOverrides": {
    "404": {
      "rewrite": "/404.html",
      "statusCode": 404
    }
  },
  "globalHeaders": {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY"
  }
}
```

## Cost Optimization

### Free Tier Limits:
- 100 GB bandwidth/month
- 2 custom domains
- No SLA

### Tips to Stay Free:
- Optimize images (use WebP)
- Enable caching
- Use Azure CDN effectively
- Monitor bandwidth usage

## Features of Click Master Game

✅ **3 Difficulty Levels** - Easy (30s), Medium (20s), Hard (10s)
✅ **Sound Effects** - Web Audio API with toggle
✅ **Combo System** - Build combos for visual feedback
✅ **Leaderboard** - Top 10 scores stored in localStorage
✅ **High Score Tracking** - Personal best with localStorage
✅ **Particle Effects** - Animated emojis on click
✅ **Keyboard Support** - Space to click, Enter to start, ESC to quit
✅ **Responsive Design** - Works on mobile and desktop
✅ **Statistics** - CPS (clicks per second), max combo
✅ **Easter Egg** - Konami code for rainbow mode!
✅ **Achievements System** - Track milestones (in code)

## Performance Tips

### Optimize for Azure:
1. **Minify files** (Azure does this automatically)
2. **Enable caching** (automatic with Azure CDN)
3. **Use HTTPS** (free and automatic)
4. **Lazy load resources** (if adding images)

### Monitor Performance:
```bash
# Check deployment status
az staticwebapp show \
  --name click-master-game \
  --resource-group click-master-rg
```

## Next Steps

- Add user authentication for global leaderboard
- Create Azure Function API for persistent scores
- Add achievements system with notifications
- Implement difficulty modifiers
- Add power-ups or special click modes
- Create multiplayer mode (real-time with SignalR)
- Add more games to the platform

## Resources

- [Azure Static Web Apps Documentation](https://docs.microsoft.com/azure/static-web-apps/)
- [GitHub Actions for Azure](https://github.com/Azure/static-web-apps-deploy)
- [Azure CLI Reference](https://docs.microsoft.com/cli/azure/staticwebapp)
- [Custom Domains Guide](https://docs.microsoft.com/azure/static-web-apps/custom-domain)
- [Azure Static Web Apps Pricing](https://azure.microsoft.com/pricing/details/app-service/static/)

## Comparison: Azure vs Other Platforms

| Feature | Azure | Vercel | Netlify | GitHub Pages |
|---------|-------|--------|---------|--------------|
| Free Bandwidth | 100 GB | 100 GB | 100 GB | 100 GB |
| Build Minutes | 1000/mo | Unlimited | 300/mo | N/A |
| API Support | ✅ Azure Functions | ✅ Serverless | ✅ Functions | ❌ |
| Auth | ✅ Built-in | 🔧 Add-on | 🔧 Add-on | ❌ |
| Staging | ✅ PR previews | ✅ Preview | ✅ Deploy Preview | ❌ |
| Enterprise | ✅ Excellent | ✅ Good | ✅ Good | ❌ |

**Azure is best for:**
- Learning cloud services (Azure ecosystem)
- Enterprise applications
- Built-in authentication
- Serverless API integration
- Microsoft stack integration

---

Enjoy your Click Master game on Azure! 🎮⚡

**Pro Tip**: Check out the GitHub Actions tab in your repository to watch automated deployments in real-time!
