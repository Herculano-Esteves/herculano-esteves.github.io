/**
 * main.js — Application entry point.
 *
 * Measures the exact character cell dimensions, pre-computes all page grids,
 * builds the DOM, and wires every module together. This is the only file
 * that knows about all modules — every other module depends on ≤ 2 others.
 */

import { CONFIG, THEME }                              from './config.js';
import { PAGES }                                       from './pages.js';
import { initRenderer, buildDOM, getGridDimensions }  from './renderer.js';
import { initTransitions, triggerTransition }          from './transitions.js';
import { initCursorOverlay }                          from './cursor.js';
import { clearSelection }                             from './selection.js';
import { initInput }                                  from './input.js';

// ── DOM references (these divs never change) ──────────────────────────────────

const scene   = document.getElementById('scene');
const hud     = document.getElementById('hud');

// ── App state ─────────────────────────────────────────────────────────────────

let cur  = 0;
let dots = [];

// ── Boot ──────────────────────────────────────────────────────────────────────

document.fonts.ready.then(init);

function init() {
    // ── Measure exact character cell dimensions ────────────────────────────
    // Must wait for the font to load (document.fonts.ready) to get true metrics.
    const probe = document.createElement('span');
    probe.style.cssText = [
        'position:absolute', 'top:-9999px', 'left:-9999px',
        `font-family:'Share Tech Mono',monospace`,
        `font-size:${CONFIG.charSize}px`,
        'line-height:1', 'white-space:pre', 'visibility:hidden',
    ].join(';');
    probe.textContent = 'M';
    document.body.appendChild(probe);
    const rect = probe.getBoundingClientRect();
    document.body.removeChild(probe);

    const CHAR_W = Math.round(rect.width);
    const CHAR_H = Math.round(rect.height);
    const COLS   = Math.floor(window.innerWidth  / CHAR_W);
    const ROWS   = Math.floor(window.innerHeight / CHAR_H);

    // ── Initialise renderer ────────────────────────────────────────────────
    initRenderer(COLS, ROWS, CHAR_W, CHAR_H);

    // ── Pre-compute all page grids ─────────────────────────────────────────
    // Done once at init; never recomputed during transitions.
    const pageButtons = [];
    const grids = PAGES.map((page, idx) => {
        const buttons = [];
        const grid    = page.build(COLS, ROWS, buttons);
        pageButtons[idx] = buttons;
        return grid;
    });

    // ── CSS custom property (drives HUD dot colour) ────────────────────────
    document.documentElement.style.setProperty('--accent', THEME.primary);

    // ── Build DOM ──────────────────────────────────────────────────────────
    buildDOM(scene, grids);

    // ── Restore page from a debounced-resize reload ────────────────────────
    const saved = parseInt(sessionStorage.getItem('lastPage') ?? '0', 10);
    cur = (saved > 0 && saved < PAGES.length) ? saved : 0;
    sessionStorage.removeItem('lastPage');

    // If restoring a non-zero page, apply it instantly (no animation)
    if (cur !== 0) {
        triggerTransition(cur, { scrambleDurationMs: 1, scrambleIntervalMs: 1 });
    }

    // ── Initialise modules ─────────────────────────────────────────────────
    initCursorOverlay(CHAR_W, CHAR_H);
    initTransitions(grids, PAGES.length, clearSelection);

    // ── HUD ────────────────────────────────────────────────────────────────
    dots = PAGES.map((_, idx) => {
        const d = document.createElement('div');
        d.id        = 'dot-' + idx;
        d.className = 'dot' + (idx === cur ? ' active' : '');
        d.setAttribute('aria-label', 'Page ' + (idx + 1));
        d.addEventListener('click', () => goTo(idx));
        hud.appendChild(d);
        return d;
    });

    updateHUD(cur);

    // ── Input ──────────────────────────────────────────────────────────────
    initInput(scene, pageButtons, grids, () => cur, goTo, PAGES.length);
}

// ── Navigation ────────────────────────────────────────────────────────────────

function goTo(target) {
    if (target === cur || target < 0 || target >= PAGES.length) return;
    cur = target;
    updateHUD(target);
    triggerTransition(target);
}

function updateHUD(page) {
    dots.forEach((d, i) => d.classList.toggle('active', i === page));
}
