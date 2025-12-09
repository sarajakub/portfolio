# Netlify Deployment Instructions

## Setup

This portfolio uses Netlify Functions to keep the Gemini API key secure on the server.

### Initial Deployment

1. **Push code to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Add Netlify serverless function for AI chat"
   git push origin main
   ```

2. **Create Netlify account** (if needed)
   - Go to https://netlify.com
   - Sign up with GitHub

3. **Import repository to Netlify**
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your `portfolio` repository
   - Build settings should auto-detect:
     - Build command: `npm run build`
     - Publish directory: `build`
   - Click "Deploy site"

4. **Add Environment Variable**
   - After deployment, go to Site settings → Environment variables
   - Click "Add a variable"
   - Key: `GEMINI_API_KEY`
   - Value: Your Gemini API key (from https://aistudio.google.com/apikey)
   - Click "Save"

5. **Trigger Redeploy**
   - Go to Deploys tab
   - Click "Trigger deploy" → "Clear cache and deploy site"

6. **Update Custom Domain** (optional)
   - Go to Site settings → Domain management
   - Add custom domain: `sarajakub.com`
   - Follow DNS configuration instructions

### Future Updates

Just push to GitHub - Netlify will auto-deploy:
```bash
git add .
git commit -m "Your update message"
git push origin main
```

### Local Development

The serverless function won't work locally without Netlify CLI. To test locally:

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Run local dev server:
   ```bash
   netlify dev
   ```

This will run your React app AND the serverless functions locally.

### Troubleshooting

**AI chat not working after deployment:**
- Check that `GEMINI_API_KEY` is set in Netlify environment variables
- Check function logs in Netlify dashboard → Functions tab
- Verify function deployed successfully (should see `chat.js` listed)

**API key still showing as exposed:**
- Make sure you're deploying to Netlify, NOT GitHub Pages
- The old gh-pages branch can be deleted from GitHub
- GitHub will stop scanning once the key is removed from public branches
