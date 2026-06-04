# herculano-esteves.github.io

A retro-inspired personal portfolio page built using **React + Vite** and Vanilla CSS, mimicking the aesthetic of a classic monospace terminal.

## Key Features

- **Monospace Terminal Grid**: Implements a clean, responsive layout designed like a character cell grid.
- **CRT Monitor Emulation**: Optional CRT screen overlay with scanlines, RGB subpixel mask, and custom analog light bleed/bloom.
- **Interactive Scrambling**: Real-time typing and scramble animations when navigating between pages.
- **Global Configuration**: Fully configurable font sizes, layout column widths, CRT resolutions, and scramble parameters via a central configuration file.

## Centralized Configuration

All core style and behavior variables are managed in `src/config.js`:
- Adjust `totalCols` and `fontSizePx` to customize terminal size.
- Toggle and customize the CRT simulation with `crtScanlineHeightPx`, `crtApertureWidthPx`, and `crtBloomPx`.
- Customize scramble speed and character sets.

## Running Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

## Deployment to GitHub Pages

The repository contains a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically compiles the production build and deploys the assets to GitHub Pages on every push to `main`.