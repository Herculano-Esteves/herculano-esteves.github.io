import React, { useEffect, useState } from 'react';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { AssetsGallery } from './components/AssetsGallery';
import { CONFIG } from './config';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

// Synchronize static global JS configurations with CSS variables on startup
if (typeof document !== 'undefined') {
  const root = document.documentElement;
  root.style.setProperty('--bg', CONFIG.theme.bg);
  root.style.setProperty('--primary', CONFIG.theme.primary);
  root.style.setProperty('--dim', CONFIG.theme.dim);
  root.style.setProperty('--muted', CONFIG.theme.muted);
  root.style.setProperty('--crt-scanline-height-px', CONFIG.crtScanlineHeightPx);
  root.style.setProperty('--crt-aperture-width-px', CONFIG.crtApertureWidthPx);
  root.style.setProperty('--total-cols', CONFIG.totalCols);
}

export default function App() {
  const [showAssets, setShowAssets] = useState(false);

  // Disable CRT styles on startup (default mode, since button is removed)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--font-size-px', CONFIG.fontSizeNonCrtPx);
      root.style.setProperty('--crt-opacity', '0');
      root.style.setProperty('--crt-bloom-px', '0');
    }
  }, []);

  return (
    <>
      <SimpleBar style={{ maxHeight: '100vh', width: '100%' }}>
        <div className="terminal-screen">
          {/* Dynamic Content Container - Stacking all sections vertically */}
          <main className="content-container">
            <Home />
            <Projects />

            {/* Discrete Design System Button at the bottom of the page */}
            <div className="btn-assets-container">
              <button onClick={() => setShowAssets(true)} className="btn-assets" type="button">
                [ design-system ]
              </button>
            </div>
          </main>
        </div>
      </SimpleBar>

      {/* Assets Gallery Modal Overlay - Rendered outside to avoid CSS filter containing block bug */}
      {showAssets && <AssetsGallery onClose={() => setShowAssets(false)} />}
    </>
  );
}
