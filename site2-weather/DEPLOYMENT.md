# 🚀 Deploying to Netlify

## Prerequisites
- A Netlify account (free) - Sign up at [netlify.com](https://netlify.com)
- Git installed (optional for drag-and-drop method)

## Method 1: Drag & Drop (Easiest - 2 Minutes!)

This is the fastest way to deploy your weather dashboard!

### Steps:

1. **Sign up/Login to Netlify**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Sign up with GitHub, GitLab, Bitbucket, or Email

2. **Prepare your files**
   - Make sure you have these files in `site2-weather` folder:
     - `index.html`
     - `styles.css`
     - `script.js`

3. **Deploy via Drag & Drop**
   - In Netlify dashboard, scroll down to **"Want to deploy a new site without connecting to Git?"**
   - Drag the entire `site2-weather` folder onto the drag-and-drop area
   - OR click "browse to upload" and select the folder

4. **Wait for deployment** (10-30 seconds)
   - Netlify will automatically:
     - Upload your files
     - Generate a random URL like `https://random-name-12345.netlify.app`
     - Deploy your site

5. **Your site is live!** 🎉
   - Click the generated URL to view your weather dashboard
   - Share it with anyone!

### Customizing Your Site Name

1. Click **"Site settings"**
2. Under **"Site information"**, click **"Change site name"**
3. Enter a custom name (e.g., `my-weather-dashboard`)
4. Your new URL: `https://my-weather-dashboard.netlify.app`

## Method 2: Git-Based Deployment (Continuous Deployment)

For automatic updates whenever you push code changes.

### Steps:

1. **Create a Git Repository**
   ```bash
   cd site2-weather
   git init
   git add .
   git commit -m "Initial commit: Weather Dashboard"
   ```

2. **Push to GitHub**
   - Create a new repository on GitHub (e.g., `weather-dashboard`)
   - Push your code:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/weather-dashboard.git
   git branch -M main
   git push -u origin main
   ```

3. **Connect to Netlify**
   - In Netlify dashboard, click **"Add new site"** → **"Import an existing project"**
   - Choose **GitHub** and authorize Netlify
   - Select your `weather-dashboard` repository

4. **Configure Build Settings**
   - **Build command**: Leave empty (static site)
   - **Publish directory**: Leave as `/` or `.` (root)
   - Click **"Deploy site"**

5. **Automatic Deployments**
   - Every time you push to GitHub, Netlify automatically rebuilds and deploys!
   - You'll see deployment status in the Netlify dashboard

## Method 3: Netlify CLI (For Advanced Users)

### Install Netlify CLI:
```bash
npm install -g netlify-cli
```

### Deploy:
```bash
cd site2-weather
netlify deploy
```

Follow the prompts:
- Authorize with your Netlify account
- Create a new site or link to existing
- Set publish directory to `.` (current directory)

### Deploy to Production:
```bash
netlify deploy --prod
```

## Updating Your Site

### Drag & Drop Method:
1. Make changes to your files
2. Drag the updated folder to the Netlify dashboard again
3. Netlify will automatically update your site

### Git Method:
```bash
git add .
git commit -m "Update weather dashboard"
git push
```
Netlify automatically detects changes and redeploys (takes 1-2 minutes).

## Custom Domain (Optional)

### Using Netlify Subdomain:
- Automatically provided: `your-site-name.netlify.app`
- Free and HTTPS enabled

### Using Your Own Domain:
1. Buy a domain from Namecheap, GoDaddy, Google Domains, etc.
2. In Netlify: **Site settings** → **Domain management** → **Add custom domain**
3. Follow Netlify's instructions to configure DNS:
   - Add Netlify's nameservers to your domain provider
   - OR add CNAME record pointing to `your-site.netlify.app`
4. HTTPS certificate automatically provisioned by Netlify (free via Let's Encrypt)

## Advanced Features

### Environment Variables (for real API keys):
1. Site settings → Build & deploy → Environment variables
2. Add key: `WEATHER_API_KEY`, value: your API key
3. Access in JavaScript:
   ```javascript
   const apiKey = process.env.WEATHER_API_KEY;
   ```

### Custom Headers:
Create `netlify.toml` in your root:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
```

### Redirects:
```toml
[[redirects]]
  from = "/old-path"
  to = "/new-path"
  status = 301
```

### Form Handling:
Netlify has built-in form handling! Add `netlify` attribute to forms:
```html
<form netlify>
  <!-- form fields -->
</form>
```

## Integrating Real Weather API (Optional Upgrade)

Currently using mock data. To get real weather:

1. **Get API Key**
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api) (free tier)
   - Get your API key

2. **Update JavaScript**
   Replace mock data fetch with:
   ```javascript
   async function fetchWeather(city) {
     const apiKey = 'YOUR_API_KEY';
     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

     try {
       const response = await fetch(url);
       const data = await response.json();
       // Process real data
     } catch (error) {
       console.error('Error fetching weather:', error);
     }
   }
   ```

3. **For Production**: Use Netlify environment variables to store API key securely

## Troubleshooting

**Site not loading?**
- Check that `index.html` is in the root of your deployment folder
- Verify all file paths are relative (no absolute paths like `C:\...`)

**CSS/JS not working?**
- Ensure file names match exactly (case-sensitive)
- Check browser console for errors (F12)
- Verify files are in the same directory

**Changes not showing?**
- Clear browser cache (Ctrl + F5)
- Check Netlify deployment logs for errors
- Make sure you deployed the correct folder

**Deployment failed?**
- Check Netlify deploy log for specific errors
- Ensure no large files (>100MB limit for free tier)
- Verify folder structure is correct

## Features of This Weather Dashboard

✅ **Real-time Clock** - Updates every second
✅ **City Search** - Type any city or use quick chips
✅ **Temperature Toggle** - Switch between °F and °C
✅ **5-Day Forecast** - Detailed weather predictions
✅ **Weather Stats** - Wind, humidity, visibility, pressure
✅ **Responsive Design** - Works on all devices
✅ **Smooth Animations** - Loading states, card hovers, transitions
✅ **Mock Data** - Works without API key (ready for real API integration)

## Performance Tips

- Netlify provides global CDN automatically
- Your site loads fast worldwide
- Free SSL/HTTPS certificate
- Automatic asset optimization
- Instant cache invalidation on updates

## Resources

- [Netlify Documentation](https://docs.netlify.com)
- [Netlify Community Forum](https://answers.netlify.com)
- [OpenWeatherMap API Docs](https://openweathermap.org/api)
- [Netlify CLI Documentation](https://cli.netlify.com)

## Next Steps

- Add more cities to mock data
- Integrate real weather API
- Add weather alerts/warnings
- Include hourly forecast
- Add location detection (geolocation API)
- Create weather maps
- Add unit tests
