import React, { useState, useEffect, useRef } from 'react';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';
import { CONFIG } from './config';

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

const PAGES = [
  { name: 'HOME', component: Home },
  { name: 'ABOUT', component: About },
  { name: 'PROJECTS', component: Projects },
  { name: 'CONTACT', component: Contact },
];

export default function App() {
  // Manage CRT toggle state in runtime memory (defaults to false)
  const [isCrtEnabled, setIsCrtEnabled] = useState(false);

  // Dynamically update CSS custom properties depending on CRT toggle state
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (isCrtEnabled) {
        root.style.setProperty('--font-size-px', CONFIG.fontSizePx);
        root.style.setProperty('--crt-opacity', CONFIG.crtOpacity);
        root.style.setProperty('--crt-bloom-px', CONFIG.crtBloomPx);
      } else {
        root.style.setProperty('--font-size-px', CONFIG.fontSizeNonCrtPx);
        root.style.setProperty('--crt-opacity', '0');
        root.style.setProperty('--crt-bloom-px', '0');
      }
    }
  }, [isCrtEnabled]);

  // Restore page index from sessionStorage
  const [activePage, setActivePage] = useState(() => {
    const saved = sessionStorage.getItem('lastPage');
    if (saved) {
      const idx = parseInt(saved, 10);
      if (idx >= 0 && idx < PAGES.length) return idx;
    }
    return 0;
  });

  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);
  const touchStartY = useRef(0);
  const wheelLock = useRef(false);

  // Sync activePage to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('lastPage', String(activePage));
  }, [activePage]);

  // Navigate helper
  const navigate = (dir) => {
    setActivePage((prev) => (prev + dir + PAGES.length) % PAGES.length);
  };


  // Keyboard navigation & Copy listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Arrow/Page Navigation
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        navigate(1);
        return;
      }
      if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        navigate(-1);
        return;
      }

      // Copy fallback (Ctrl+C / Cmd+C) when no text selection is active
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        const selectionText = window.getSelection()?.toString();
        if (!selectionText) {
          // No selection, copy whole page contents as text
          const pageEl = document.querySelector('.content-container');
          if (pageEl) {
            e.preventDefault();
            const textToCopy = pageEl.innerText || pageEl.textContent || '';
            navigator.clipboard.writeText(textToCopy)
              .then(() => triggerToast('COPIED PAGE'))
              .catch(() => {
                // Clipboard fallback
                const textarea = document.createElement('textarea');
                textarea.value = textToCopy;
                textarea.style.position = 'fixed';
                textarea.style.top = '-9999px';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                triggerToast('COPIED PAGE');
              });
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePage]);

  // Scroll Wheel navigation
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (wheelLock.current) return;

      wheelLock.current = true;
      navigate(e.deltaY > 0 ? 1 : -1);

      setTimeout(() => {
        wheelLock.current = false;
      }, 500); // Debounce delay
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // Touch swipe navigation
  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const dy = touchStartY.current - touchEndY;
      if (Math.abs(dy) > 50) {
        navigate(dy > 0 ? 1 : -1);
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    const timer = setTimeout(() => setShowToast(false), 900);
    return () => clearTimeout(timer);
  };

  // Render active page component
  const ActivePageContent = PAGES[activePage].component;

  return (
    <div className="terminal-screen">


      {/* Navigation Header */}
      <nav className="navbar" aria-label="Main Navigation">
        {PAGES.map((page, index) => (
          <button
            key={page.name}
            className={`nav-item ${activePage === index ? 'active' : ''}`}
            onClick={() => setActivePage(index)}
            type="button"
          >
            [ {page.name} ]
          </button>
        ))}
      </nav>

      {/* Dynamic Content Container */}
      <main className="content-container">
        <ActivePageContent key={activePage} />
      </main>

      {/* Toast Notification */}
      <div id="toast" className={showToast ? 'show' : ''}>
        {toastMsg}
      </div>

      {/* Floating Retro CRT Toggle Switch */}
      <div className="crt-switch-container">
        <button 
          onClick={() => setIsCrtEnabled(prev => !prev)} 
          className="btn-link"
          type="button"
          aria-label="Toggle CRT Monitor Effect"
        >
          {isCrtEnabled ? '[ CRT: ON ]' : '[ CRT: OFF ]'}
        </button>
      </div>
    </div>
  );
}
