import React, { useEffect, useState, useRef } from 'react';
import { Home } from './pages/Home';
import { Education } from './pages/Education';
import { Research } from './pages/Research';
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
  root.style.setProperty('--secondary', CONFIG.theme.secondary);
  root.style.setProperty('--dim', CONFIG.theme.dim);
  root.style.setProperty('--muted', CONFIG.theme.muted);
  root.style.setProperty('--border', CONFIG.theme.border);
  root.style.setProperty('--crt-scanline-height-px', CONFIG.crtScanlineHeightPx);
  root.style.setProperty('--crt-aperture-width-px', CONFIG.crtApertureWidthPx);
  root.style.setProperty('--total-cols', CONFIG.totalCols);
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const simpleBarRef = useRef(null);

  // Secret backdoor: check URL query params on mount (e.g. ?assets=true)
  const [showAssets, setShowAssets] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('assets') === 'true';
    }
    return false;
  });

  // Disable CRT styles on startup (default mode, since button is removed)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--font-size-px', CONFIG.fontSizeNonCrtPx);
      root.style.setProperty('--crt-opacity', '0');
      root.style.setProperty('--crt-bloom-px', '0');
    }
  }, []);

  // Listen to scroll events on SimpleBar content wrapper
  useEffect(() => {
    const scrollEl = simpleBarRef.current?.getScrollElement();

    const checkScroll = () => {
      const st = scrollEl ? scrollEl.scrollTop : (window.scrollY || document.documentElement.scrollTop);
      setScrolled(st > 40);
    };

    if (scrollEl) {
      scrollEl.addEventListener('scroll', checkScroll, { passive: true });
    }
    window.addEventListener('scroll', checkScroll, { passive: true });

    return () => {
      if (scrollEl) {
        scrollEl.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  return (
    <>
      <SimpleBar ref={simpleBarRef} style={{ maxHeight: '100dvh', width: '100%' }}>
        <div className="terminal-screen">
          {/* Dynamic Content Container - Stacking all sections vertically */}
          <main className="content-container">
            <Home scrolled={scrolled} />
            <Education />
            <Research />
            <Projects />
          </main>
        </div>
      </SimpleBar>

      {/* Secret Design System Modal Overlay - Triggered via ?assets=true URL parameter */}
      {showAssets && <AssetsGallery onClose={() => setShowAssets(false)} />}
    </>
  );
}
