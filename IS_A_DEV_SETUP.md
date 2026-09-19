# How to Host Your Portfolio on is-a.dev for FREE

## What is is-a.dev?
is-a.dev provides free subdomains for developers. You get a subdomain like `yourname.is-a.dev` pointing to your hosting service.

## Step 1: Choose Your Subdomain
Pick a name for your subdomain (e.g., `nehemiah.is-a.dev`, `nehemiahdeveloper.is-a.dev`)

## Step 2: Deploy to Netlify (Recommended)
Since you already have Netlify configuration:

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Deploy on Netlify:**
   - Go to https://netlify.com
   - Click "New site from Git"
   - Connect your GitHub repo
   - Deploy settings:
     - Build command: (leave empty for static site)
     - Publish directory: `/` (root)
   - Click "Deploy site"

3. **Get Your Netlify URL:**
   - After deployment, you'll get a URL like: `amazing-site-123.netlify.app`

## Step 3: Request is-a.dev Subdomain

1. **Fork the is-a-dev Repository:**
   - Go to: https://github.com/is-a-dev/register
   - Click "Fork" to create your own copy

2. **Add Your Domain Configuration:**
   - In your forked repo, go to `domains/` folder
   - Create a new file: `yourname.json` (replace with your chosen name)
   - Add this content:
   ```json
   {
     "description": "Nehemiah's Portfolio - Cybersecurity Expert & Developer",
     "repo": "https://github.com/YOUR_USERNAME/YOUR_REPO_NAME",
     "owner": {
       "username": "YOUR_GITHUB_USERNAME",
       "email": "your.email@example.com"
     },
     "record": {
       "CNAME": "your-netlify-site.netlify.app"
     }
   }
   ```

3. **Submit Pull Request:**
   - Commit your changes
   - Create a Pull Request to the main is-a-dev repository
   - Wait for approval (usually 1-7 days)

## Step 4: Configure Custom Domain in Netlify

Once your is-a.dev subdomain is approved:

1. **In Netlify Dashboard:**
   - Go to Site Settings > Domain management
   - Click "Add custom domain"
   - Enter: `yourname.is-a.dev`
   - Netlify will automatically configure SSL

## Alternative: Using Vercel

If you prefer Vercel:

1. **Deploy to Vercel:**
   - Go to https://vercel.com
   - Import your GitHub repo
   - Deploy

2. **In your is-a.dev JSON file, use:**
   ```json
   {
     "record": {
       "CNAME": "your-project.vercel.app"
     }
   }
   ```

## Alternative: Using GitHub Pages

1. **Enable GitHub Pages:**
   - In your repo: Settings > Pages
   - Source: Deploy from branch > main
   - Your site will be at: `username.github.io/repo-name`

2. **In your is-a.dev JSON file, use:**
   ```json
   {
     "record": {
       "CNAME": "username.github.io"
     }
   }
   ```

## Example is-a.dev Configuration

Here's a complete example for your `nehemiah.json` file:

```json
{
  "description": "Nehemiah's Portfolio - Cybersecurity Expert & Full Stack Developer",
  "repo": "https://github.com/nehemiah-dev/portfolio",
  "owner": {
    "username": "nehemiah-dev",
    "email": "nehemiah@example.com"
  },
  "record": {
    "CNAME": "nehemiah-portfolio.netlify.app"
  }
}
```

## Timeline
- **Immediate:** Deploy to hosting platform
- **1-7 days:** is-a.dev approval
- **24-48 hours:** DNS propagation

## Benefits of is-a.dev
✅ Free subdomain
✅ SSL certificate
✅ Professional appearance
✅ Easy to remember
✅ Developer-friendly
✅ No ads or limitations

## Tips for Success
1. Choose a unique, memorable subdomain name
2. Ensure your GitHub repo is public
3. Add a good description to your JSON file
4. Make sure your website is fully functional before applying
5. Follow is-a.dev naming guidelines (no offensive names, etc.)

## Next Steps
1. Create GitHub repository
2. Deploy to Netlify/Vercel
3. Fork is-a-dev/register repository
4. Create your domain JSON file
5. Submit pull request
6. Wait for approval
7. Configure custom domain in hosting platform

Your portfolio will then be accessible at `yourname.is-a.dev`!
