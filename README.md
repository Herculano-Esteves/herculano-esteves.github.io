# herculano-esteves.github.io

This is a personal landing page presenting my academic profile and providing quick access links to my other websites and projects, rebuilt using **React + Vite** for modular layouts and clean CSS responsiveness.

## Features
- **Monospace Terminal Aesthetic**: Retains the retro monospace terminal theme, neon green active elements, and glow effects.
- **Scramble Transition Effects**: Built-in typing/scrambling animations on text elements when switching pages.
- **Custom Cursor & Interactions**: Retro white pointer cursor with pixel-aligned button hovers.
- **Fully Responsive**: Swapped cell-by-cell absolute positioning for CSS flexbox and grid layouts, making it fully responsive on mobile.
- **Native Selection**: Native browser copy/paste and highlight support.

## How to Run Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Dev Server**:
   You can run Vite's server directly:
   ```bash
   npm run dev
   ```
   Or continue using the legacy Python run script which redirects to Vite automatically:
   ```bash
   python3 run.py
   ```

## Deploying to GitHub Pages

This project is configured with a GitHub Actions workflow (`.github/workflows/deploy.yml`). 
Whenever you push changes to your default branch (`main` or `master`), GitHub will automatically compile the React application and deploy the static assets to GitHub Pages.