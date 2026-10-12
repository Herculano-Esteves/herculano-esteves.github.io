import React, { useEffect, useCallback, useRef } from 'react';
import { CONFIG } from '../config';

/**
 * KeyboardNav handles global keyboard navigation:
 * - Vim navigation: 'j' (down), 'k' (up), 'g' (top), 'G' (bottom)
 * - Arrow keys: ArrowDown (down), ArrowUp (up)
 * - Number jumps: '1' through '7' for direct section jumping
 * - Utility keys: Home (top), End (bottom), '?' (toggle popover), Esc (close)
 *
 * Renders a lightweight corner trigger button '[ ? ]' and a compact anchored popover.
 */
export function KeyboardNav({ simpleBarRef, showHelp, setShowHelp }) {
  const sections = CONFIG.sections;
  const containerRef = useRef(null);

  const scrollTo = useCallback((id) => {
    const target = document.getElementById(id);
    const scrollEl = simpleBarRef.current?.getScrollElement();
    if (target && scrollEl) {
      scrollEl.scrollTo({
        top: Math.max(0, target.offsetTop - 30),
        behavior: 'smooth',
      });
    }
  }, [simpleBarRef]);

  const getCurrentSectionIndex = useCallback(() => {
    const scrollEl = simpleBarRef.current?.getScrollElement();
    if (!scrollEl) return 0;
    const scrollPos = scrollEl.scrollTop + window.innerHeight * 0.35;
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i].id);
      if (el && el.offsetTop <= scrollPos) {
        return i;
      }
    }
    return 0;
  }, [sections, simpleBarRef]);

  // Click outside listener to dismiss popover
  useEffect(() => {
    if (!showHelp) return;

    const handlePointerDown = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowHelp(false);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, [showHelp, setShowHelp]);

  // Global keyboard shortcuts listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // 1. Ignore when typing into form fields
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) {
        return;
      }

      // 2. Ignore browser modifier shortcuts (Ctrl, Alt, Meta)
      if (e.ctrlKey || e.altKey || e.metaKey) {
        return;
      }

      // 3. Handle popover open state: Escape or '?' closes it
      if (showHelp) {
        if (e.key === 'Escape' || e.key === '?') {
          e.preventDefault();
          setShowHelp(false);
        }
        return;
      }

      // 4. Do not hijack navigation if an external modal (devlog / lightbox / assets) is open
      const isOtherModalOpen = Boolean(
        document.querySelector('.devlog-modal-overlay, .lightbox-overlay, .assets-gallery-overlay')
      );
      if (isOtherModalOpen) {
        return;
      }

      // 5. Toggle Help popover with '?'
      if (e.key === '?') {
        e.preventDefault();
        setShowHelp(true);
        return;
      }

      const key = e.key;

      // 6. Next section: 'j' or ArrowDown
      if (key === 'j' || key === 'ArrowDown') {
        e.preventDefault();
        const currentIdx = getCurrentSectionIndex();
        if (currentIdx < sections.length - 1) {
          scrollTo(sections[currentIdx + 1].id);
        }
        return;
      }

      // 7. Previous section: 'k' or ArrowUp
      if (key === 'k' || key === 'ArrowUp') {
        e.preventDefault();
        const currentIdx = getCurrentSectionIndex();
        if (currentIdx > 0) {
          scrollTo(sections[currentIdx - 1].id);
        }
        return;
      }

      // 8. Jump to Top: 'Home' or 'g' (lowercase, without Shift)
      if (key === 'Home' || (key === 'g' && !e.shiftKey)) {
        e.preventDefault();
        scrollTo(sections[0].id);
        return;
      }

      // 9. Jump to Bottom: 'End' or 'G' (uppercase, with Shift)
      if (key === 'End' || (key === 'G' && e.shiftKey)) {
        e.preventDefault();
        scrollTo(sections[sections.length - 1].id);
        return;
      }

      // 10. Direct numerical jump: '1' through '7'
      if (/^[1-7]$/.test(key)) {
        const num = parseInt(key, 10);
        if (num >= 1 && num <= sections.length) {
          e.preventDefault();
          scrollTo(sections[num - 1].id);
        }
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sections, showHelp, setShowHelp, scrollTo, getCurrentSectionIndex]);

  return (
    <div
      ref={containerRef}
      className="keyboard-nav-corner-container"
      style={{
        position: 'fixed',
        bottom: '1.25rem',
        right: '1.35rem',
        zIndex: 10000,
        fontFamily: 'inherit',
        userSelect: 'none',
      }}
    >
      {/* Non-intrusive Anchored Popover */}
      {showHelp && (
        <div
          className="keyboard-nav-popover"
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 0.5rem)',
            right: 0,
            width: '32ch',
            maxWidth: 'calc(100vw - 2.5rem)',
            backgroundColor: 'var(--bg)',
            border: '1px solid var(--primary)',
            padding: '0.8rem 1rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.85)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            fontSize: '0.82em',
            lineHeight: 1.25,
          }}
        >
          {/* Popover Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed var(--muted)', paddingBottom: '0.35rem' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 'bold', letterSpacing: '0.05em' }}>
              [ SHORTCUTS ]
            </span>
            <button
              onClick={() => setShowHelp(false)}
              className="btn-link"
              type="button"
              style={{ fontSize: '0.85em', padding: 0 }}
            >
              [x]
            </button>
          </div>

          {/* Keybindings List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginTop: '0.15rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>j / ↓</span>
              <span style={{ color: 'var(--dim)' }}>next section</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>k / ↑</span>
              <span style={{ color: 'var(--dim)' }}>prev section</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>1 - 7</span>
              <span style={{ color: 'var(--dim)' }}>jump 1..7</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>g / Home</span>
              <span style={{ color: 'var(--dim)' }}>jump top</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>G / End</span>
              <span style={{ color: 'var(--dim)' }}>jump bottom</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>?</span>
              <span style={{ color: 'var(--dim)' }}>toggle help</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Esc</span>
              <span style={{ color: 'var(--dim)' }}>close popup</span>
            </div>
          </div>
        </div>
      )}

      {/* Discreet Corner Trigger Button (Clean text only, no outline) */}
      <button
        onClick={() => setShowHelp((prev) => !prev)}
        type="button"
        title="Keyboard Shortcuts (?)"
        aria-label="Toggle Keyboard Shortcuts"
        style={{
          background: 'none',
          border: 'none',
          outline: 'none',
          padding: 0,
          margin: 0,
          color: showHelp ? 'var(--primary)' : 'var(--dim)',
          opacity: showHelp ? 1 : 0.45,
          fontSize: '0.75rem',
          cursor: 'pointer',
          fontFamily: 'inherit',
          letterSpacing: '0.05em',
          transition: 'color 0.2s ease, opacity 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--primary)';
          e.currentTarget.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = showHelp ? 'var(--primary)' : 'var(--dim)';
          e.currentTarget.style.opacity = showHelp ? '1' : '0.45';
        }}
      >
        [?]
      </button>
    </div>
  );
}
