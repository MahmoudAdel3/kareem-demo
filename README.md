# Opportunity Analyzer Demo

A React + Vite demo application that simulates an AI-powered opportunity analysis interface with file upload and mock responses.

## Features

- 📝 Text input for user prompts
- 📁 Drag-and-drop file upload (PDF, DOCX, XLSX)
- 🎨 Jing Admin branded UI
- ⚡ Fast Vite development server
- 🎭 Mock AI responses from local JSON
- ⏱️ 2-second loading simulation

## Setup Instructions

### Fix PowerShell Execution Policy (Required for Windows)

If you see an error like "running scripts is disabled on this system", run this command in PowerShell **as Administrator**:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Or use Command Prompt instead of PowerShell to run npm commands.

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## Usage

1. Enter a message in the text area (optional)
2. Upload one of the test files:
   - `companyA.pdf` - Returns: "Strong partnership potential — 80% match."
   - `companyB.docx` - Returns: "Moderate opportunity — needs compliance alignment."
   - `companyC.xlsx` - Returns: "Low fit — outside current target industries."
3. Click "Analyze" button
4. Wait 2 seconds for the simulated AI response

## Project Structure

```
KareemDemo/
├── public/
│   └── responses.json      # Mock response data
├── src/
│   ├── App.jsx            # Main application component
│   ├── App.css            # Application styles
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── package.json           # Dependencies
└── vite.config.js         # Vite configuration
```

## Mock Response Format

Edit `public/responses.json` to add more test files:

```json
{
  "filename.pdf": "Your response text here",
  "another.docx": "Another response here"
}
```

## Technologies

- React 18.3
- Vite 5.4
- Plain CSS (no framework)
- No backend required

## Build for Production

```bash
npm run build
```

Built files will be in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## Deployment Options

### Option 1: Vercel (Recommended - Fastest)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts - that's it! ✅

**Or use Vercel Web UI:**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repo or drag & drop the project folder
- Auto-deploys on every push!

### Option 2: Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Build and deploy:
   ```bash
   npm run build
   netlify deploy --prod
   ```

**Or use Netlify Drag & Drop:**
- Go to [netlify.com/drop](https://app.netlify.com/drop)
- Drag the `dist/` folder after running `npm run build`
- Instant deployment! ✅

### Option 3: GitHub Pages

1. Add to package.json scripts:
   ```json
   "deploy": "gh-pages -d dist"
   ```

2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Build and deploy:
   ```bash
   npm run build
   npm run deploy
   ```

### Option 4: Static File Hosting (Any Web Server)

Just upload the contents of the `dist/` folder to any web hosting service:
- AWS S3 + CloudFront
- Azure Static Web Apps
- Firebase Hosting
- Cloudflare Pages
- Any Apache/Nginx server

