/**
 * input.js — All user input event handling.
 *
 * PERFORMANCE FIXES:
 *  1. mousemove is throttled via requestAnimationFrame — the actual handler
 *     runs at most once per display frame (~16ms) instead of on every raw event.
 *  2. resize is debounced 200ms before reloading — prevents repeated reloads
 *     from the mobile browser address bar toggling or window snapping.
 *  3. The two separate keydown listeners (navigation + copy) are consolidated
 *     into a single handler.
 */

import { CONFIG, THEME } from './config.js';
import { getCharDimensions, getGridDimensions } from './renderer.js';
import {
    clearCursor, moveCursor,
    getActiveHoveredButton, updateButtonHover,
} from './cursor.js';
import {
    isSelecting, startSelection, extendSelection, endSelection,
    clearSelection, hasSelection, getSelectionText,
} from './selection.js';

// ── Module state (set by initInput) ───────────────────────────────────────────

let scene       = null;
let pageButtons = [];
let grids       = [];
let getCur      = () => 0;
let goToFn      = () => {};
let numPages    = 1;

// ── Init ──────────────────────────────────────────────────────────────────────

/**
 * @param {HTMLElement}  sceneEl         - #scene div
 * @param {object[][]}   pageButtonsArr  - pageButtons[pageIdx]
 * @param {object[][][]} pageGrids       - pre-computed page grids
 * @param {Function}     getCurFn        - () => current page index
 * @param {Function}     goToPageFn      - (index) => void
 * @param {number}       pageCount
 */
export function initInput(sceneEl, pageButtonsArr, pageGrids, getCurFn, goToPageFn, pageCount) {
    scene       = sceneEl;
    pageButtons = pageButtonsArr;
    grids       = pageGrids;
    getCur      = getCurFn;
    goToFn      = goToPageFn;
    numPages    = pageCount;

    setupMouse();
    setupKeyboard();
    setupTouch();
    setupWheel();
    setupResize();
}

// ── Navigation ────────────────────────────────────────────────────────────────

function navigate(dir) {
    goToFn((getCur() + dir + numPages) % numPages);
}

// ── Cell-aligned, throttled mousemove ──────────────────────────────────────────

let rafPending     = false;
let lastMouseEvent = null;
let lastPage       = -1;
let lastCol        = -1;
let lastRow        = -1;

function processMouseMove(e) {
    const { CHAR_W, CHAR_H } = getCharDimensions();
    const { COLS, ROWS }     = getGridDimensions();
    const col = Math.floor(e.clientX / CHAR_W);
    const row = Math.floor(e.clientY / CHAR_H);

    // ── Selection drag ────────────────────────────────────────────────────
    if (isSelecting) {
        const cc = Math.max(0, Math.min(COLS - 1, col));
        const rr = Math.max(0, Math.min(ROWS - 1, row));
        extendSelection(cc, rr);
        return;
    }

    // ── Button hover ──────────────────────────────────────────────────────
    const buttons = pageButtons[getCur()] ?? [];
    const active  = updateButtonHover(col, row, buttons);
    if (active) { clearCursor(); return; }

    // ── Character cursor ──────────────────────────────────────────────────
    moveCursor(col, row);
}

function setupMouse() {
    // Throttle: fire processMouseMove at most once per animation frame,
    // and ONLY when mouse transitions to a different character cell or page.
    window.addEventListener('mousemove', e => {
        const { CHAR_W, CHAR_H } = getCharDimensions();
        const col = Math.floor(e.clientX / CHAR_W);
        const row = Math.floor(e.clientY / CHAR_H);

        const currentPage = getCur();
        if (currentPage !== lastPage) {
            lastCol = -1;
            lastRow = -1;
            lastPage = currentPage;
        }

        if (col === lastCol && row === lastRow) return;

        lastCol = col;
        lastRow = row;
        lastMouseEvent = e;

        if (!rafPending) {
            rafPending = true;
            requestAnimationFrame(() => {
                processMouseMove(lastMouseEvent);
                rafPending = false;
            });
        }
    });

    scene.addEventListener('mousedown', e => {
        if (e.button !== 0) return;
        const active = getActiveHoveredButton();
        if (active) { active.action(); return; }
        clearCursor();
        const { CHAR_W, CHAR_H } = getCharDimensions();
        const { COLS, ROWS }     = getGridDimensions();
        const col = Math.max(0, Math.min(COLS - 1, Math.floor(e.clientX / CHAR_W)));
        const row = Math.max(0, Math.min(ROWS - 1, Math.floor(e.clientY / CHAR_H)));
        startSelection(col, row);
    });

    window.addEventListener('mouseup', () => endSelection());

    scene.addEventListener('mouseleave', () => {
        clearCursor();
        lastCol = -1;
        lastRow = -1;
    });
}

// ── Keyboard (consolidated single listener) ───────────────────────────────────

function setupKeyboard() {
    window.addEventListener('keydown', e => {
        // Navigation
        if (e.key === 'ArrowDown'  || e.key === 'PageDown'  || e.key === 'ArrowRight') { e.preventDefault(); navigate(1);  return; }
        if (e.key === 'ArrowUp'    || e.key === 'PageUp'    || e.key === 'ArrowLeft')  { e.preventDefault(); navigate(-1); return; }

        // Copy — Ctrl+C / Cmd+C
        if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
            const text = hasSelection()
                ? getSelectionText(grids, getCur())
                : getPageText(grids[getCur()]);
            writeToClipboard(text);
        }
    });
}

// ── Touch ─────────────────────────────────────────────────────────────────────

function setupTouch() {
    let touchY0 = 0;
    window.addEventListener('touchstart', e => { touchY0 = e.touches[0].clientY; }, { passive: true });
    window.addEventListener('touchend',   e => {
        const dy = touchY0 - e.changedTouches[0].clientY;
        if (Math.abs(dy) > 50) navigate(dy > 0 ? 1 : -1);
    }, { passive: true });
}

// ── Scroll wheel ──────────────────────────────────────────────────────────────

function setupWheel() {
    let wLock = false;
    window.addEventListener('wheel', e => {
        e.preventDefault();
        if (wLock) return;
        wLock = true;
        navigate(e.deltaY > 0 ? 1 : -1);
        setTimeout(() => { wLock = false; }, CONFIG.scrollDebounceMs);
    }, { passive: false });
}

// ── Resize — debounced, preserves current page ─────────────────────────────────

function setupResize() {
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Store the current page so init() can restore it after reload
            sessionStorage.setItem('lastPage', String(getCur()));
            window.location.reload();
        }, 200);
    });
}

// ── Clipboard helpers ─────────────────────────────────────────────────────────

function getPageText(grid) {
    const lines = grid.map(row => row.map(c => c.char).join('').trimEnd());
    let last = lines.length - 1;
    while (last > 0 && !lines[last].trim()) last--;
    return lines.slice(0, last + 1).join('\n');
}

function writeToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => showToast('COPIED'))
        .catch(() => {
            // Fallback for non-HTTPS contexts
            const ta = document.createElement('textarea');
            ta.value         = text;
            ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showToast('COPIED');
        });
}

// ── Toast notification (reusable element, not re-created on each copy) ─────────

let toastEl = null;

function showToast(msg) {
    if (!toastEl) {
        toastEl = document.createElement('div');
        toastEl.style.cssText = [
            'position:fixed', 'top:1.5rem', 'left:50%',
            'transform:translateX(-50%)',
            `font-family:'Share Tech Mono',monospace`,
            'font-size:0.65rem', 'letter-spacing:0.25em',
            `color:${THEME.bg}`, `background:${THEME.primary}`,
            'padding:0.25rem 1rem', 'z-index:9999',
            'pointer-events:none', 'opacity:0',
            'transition:opacity 0.4s ease',
        ].join(';');
        document.body.appendChild(toastEl);
    }
    toastEl.textContent   = msg;
    toastEl.style.opacity = '1';
    clearTimeout(toastEl._timer);
    toastEl._timer = setTimeout(() => { toastEl.style.opacity = '0'; }, 900);
}
