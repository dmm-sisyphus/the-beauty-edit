# The Beauty Edit 🌸

Your personal beauty product journal — track your full journey with every product, from purchase details to final verdict.

## Quick Start (run locally)

```bash
# 1. Unzip and enter the folder
cd the-beauty-edit

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open **http://localhost:5173** in your browser. That's it!

---

## Deploy to your iPhone (free, takes 5 minutes)

### Option A: Deploy with Vercel (recommended)

1. **Create a free account** at [vercel.com](https://vercel.com)
2. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```
3. **Build & deploy:**
   ```bash
   npm run build
   vercel --prod
   ```
4. Vercel gives you a URL like `https://the-beauty-edit.vercel.app`
5. **On your iPhone:** Open the URL in Safari → tap the Share button → tap **"Add to Home Screen"**
6. The app now lives on your home screen like a real app!

### Option B: Deploy with Netlify

1. **Create a free account** at [netlify.com](https://netlify.com)
2. **Build the project:**
   ```bash
   npm run build
   ```
3. **Drag and drop** the `dist/` folder to [app.netlify.com/drop](https://app.netlify.com/drop)
4. Open the URL on your iPhone in Safari → Share → **"Add to Home Screen"**

### Option C: Deploy with GitHub Pages

1. Push this project to a GitHub repo
2. In the repo settings, go to **Pages** → deploy from the `dist/` folder
3. Open the GitHub Pages URL on your iPhone → Share → **"Add to Home Screen"**

---

## Project Structure

```
the-beauty-edit/
├── index.html          # Entry HTML with PWA meta tags & iOS support
├── package.json        # Dependencies (React + Vite)
├── vite.config.js      # Vite configuration
├── public/
│   ├── manifest.json   # PWA manifest (app name, icons, theme)
│   ├── sw.js           # Service worker for offline support
│   └── icons/          # App icons (192px, 512px, favicon)
└── src/
    ├── main.jsx        # React entry point
    ├── index.css       # Global styles & resets
    └── App.jsx         # Full app (all screens, state, navigation)
```

## Features

- **Product Journal** — Track products with photos, purchase details, ratings, and dated thought entries
- **Wishlist** — Curate products you want to try, with "Promote to Journal" action
- **Stats & Insights** — See spending by category, repurchase rates, top brands
- **Offline Support** — Works without internet (service worker caching)
- **iPhone-first** — Designed for one-handed use, fullscreen PWA experience
- **Local Persistence** — All data saved to localStorage on your device

## Tech Stack

- React 18
- Vite 6
- localStorage for persistence
- Service Worker for offline PWA
- No external UI libraries — all custom components
