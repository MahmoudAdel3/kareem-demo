# GitHub Pages Deployment Guide

## 🚀 Deploy Your App to GitHub Pages

Follow these steps to publish your Opportunity Analyzer Demo online:

### Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and login
2. Click "New repository" (green button)
3. Name it: `opportunity-analyzer-demo` (or any name you prefer)
4. Choose "Public" or "Private"
5. **Don't** initialize with README (we already have one)
6. Click "Create repository"

### Step 2: Initialize Git and Push Code

Open your terminal in the project folder and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Opportunity Analyzer Demo"

# Add your GitHub repo as remote (replace YOUR-USERNAME and YOUR-REPO-NAME)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git push -u origin main
```

**Note:** If it asks for `master` instead of `main`, use:
```bash
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Click "Pages" in the left sidebar
4. Under "Source", select "GitHub Actions"
5. Click "Save"

### Step 4: Automatic Deployment

The GitHub Action will automatically:
- Build your app when you push to `main` branch
- Deploy to GitHub Pages
- Your site will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

**Wait 1-2 minutes** for the first deployment to complete.

### Step 5: Check Deployment Status

1. Go to the "Actions" tab in your GitHub repo
2. You'll see the "Deploy to GitHub Pages" workflow running
3. Once it shows a green checkmark ✅, your site is live!

---

## Alternative: Manual Deployment (No GitHub Actions)

If you prefer manual deployment:

### Step 1: Install gh-pages

```bash
npm install
```

(The `gh-pages` package is already added to package.json)

### Step 2: Update Vite Config (if needed)

If your repo name is NOT `KareemDemo`, update `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/YOUR-REPO-NAME/', // Replace with your actual repo name
})
```

### Step 3: Build and Deploy

```bash
npm run build
npm run deploy
```

This will:
- Build your app
- Create a `gh-pages` branch
- Push the built files to GitHub
- Your site will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

---

## Troubleshooting

### Issue: Page shows 404
- Make sure GitHub Pages is enabled in Settings → Pages
- Check that the source is set to "GitHub Actions" or "gh-pages branch"
- Wait a few minutes for DNS propagation

### Issue: Blank page
- Check if `base` in `vite.config.js` matches your repo name
- Make sure it's `/YOUR-REPO-NAME/` with slashes on both sides

### Issue: GitHub Action fails
- Check the Actions tab for error messages
- Make sure all dependencies are listed in package.json
- Verify the workflow file is in `.github/workflows/deploy.yml`

---

## Updating Your Site

After the initial deployment, any time you want to update:

```bash
git add .
git commit -m "Update: description of changes"
git push
```

The GitHub Action will automatically rebuild and redeploy! 🎉

---

## Custom Domain (Optional)

Want to use your own domain like `analyzer.yourcompany.com`?

1. In GitHub repo: Settings → Pages → Custom domain
2. Enter your domain
3. Add CNAME record in your DNS settings pointing to `YOUR-USERNAME.github.io`

---

**Your app will be live at:**
`https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

Replace `YOUR-USERNAME` with your GitHub username and `YOUR-REPO-NAME` with your repository name.
