/**
 * cursor.js — Cursor and button hover via CSS overlay divs.
 *
 * ROOT CAUSE OF 27% CPU:
 *   Even with RAF throttling, writing span.style.color / span.style.backgroundColor
 *   triggers a browser Style Recalculation across the entire layout tree (~7500 spans
 *   across 150 column elements). Firefox runs this on the main thread on every cell
 *   change AND on every blink tick (~2/s).
 *
 * FIX — Two fixed overlay <div>s:
 *   #cursor-cell  — 1 char cell, moved via transform: translate(x, y)
 *   #button-over  — N×M char region, resized + moved on button enter/leave
 *
 *   CSS transform changes go directly to the compositor thread (GPU).
 *   They do NOT trigger layout, paint, or style recalculation.
 *   The blink is a CSS animation on `opacity` — entirely GPU, zero JS involvement.
 *
 *   Result: cursor-related DOM writes drop from ~120/second to ~0/second.
 */

import { THEME } from './config.js';
import { getVisiblePre } from './renderer.js';

// ── Helpers ───────────────────────────────────────────────────────────────────

function hexToRgba(hex, alpha) {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
    }
    const num = parseInt(hex, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ── Overlay elements (created by initCursorOverlay) ───────────────────────────

let cursorEl = null;
let buttonEl = null;
let CHAR_W   = 0;
let CHAR_H   = 0;

// ── Cursor position state ─────────────────────────────────────────────────────

let cursorCol = -1;
let cursorRow = -1;

/** Park offscreen — compositor op, no layout cost */
const OFFSCREEN = 'translate(-9999px, 0)';

// ── Init ──────────────────────────────────────────────────────────────────────

/**
 * Create and inject the two overlay elements.
 * Must be called after font measurement (CHAR_W / CHAR_H known).
 *
 * @param {number} charW
 * @param {number} charH
 */
export function initCursorOverlay(charW, charH) {
    CHAR_W = charW;
    CHAR_H = charH;

    // ── Cursor overlay ─────────────────────────────────────────────────────
    cursorEl = document.createElement('div');
    cursorEl.id = 'cursor-cell';
    Object.assign(cursorEl.style, {
        position:    'fixed',
        top:         '0',
        left:        '0',
        width:       `${charW}px`,
        height:      `${charH}px`,
        pointerEvents: 'none',
        zIndex:      '150',
        boxSizing:   'border-box',
        border:      `1px solid ${THEME.primary}`,
        background:  hexToRgba(THEME.primary, 0.25),
        transform:   OFFSCREEN,
    });
    document.body.appendChild(cursorEl);

    // ── Button hover overlay ───────────────────────────────────────────────
    buttonEl = document.createElement('div');
    buttonEl.id = 'button-over';
    Object.assign(buttonEl.style, {
        position:    'fixed',
        top:         '0',
        left:        '0',
        pointerEvents: 'none',
        zIndex:      '140',
        boxSizing:   'border-box',
        border:      `1px solid ${hexToRgba(THEME.primary, 0.5)}`,
        background:  hexToRgba(THEME.primary, 0.12),
        transform:   OFFSCREEN,
    });
    document.body.appendChild(buttonEl);
}

// ── Cursor ────────────────────────────────────────────────────────────────────

export function clearCursor() {
    if (!cursorEl) return;
    cursorEl.style.transform = OFFSCREEN;
    cursorCol = -1;
    cursorRow = -1;
}

/**
 * Move the cursor overlay to (col, row).
 * Only writes one CSS transform — compositor-thread operation.
 * No layout, no paint, no style recalculation.
 */
export function moveCursor(col, row) {
    if (col === cursorCol && row === cursorRow) return; // same cell — no-op
    cursorCol = col;
    cursorRow = row;
    if (!cursorEl) return;

    // Don't show cursor overlay on top of selected text
    const pre  = getVisiblePre(col);
    const span = pre?.children[row];
    if (span?._selected) { clearCursor(); return; }

    cursorEl.style.transform = `translate(${col * CHAR_W}px, ${row * CHAR_H}px)`;
}

// ── Button hover ──────────────────────────────────────────────────────────────

let activeHoveredButton = null;

export function getActiveHoveredButton() {
    return activeHoveredButton;
}

/** Hide button overlay and reset state. Called by selection.js on clearSelection(). */
export function clearActiveButton() {
    if (!activeHoveredButton || !buttonEl) return;
    buttonEl.style.transform = OFFSCREEN;
    activeHoveredButton = null;
}

/**
 * Update button hover overlay for the current mouse position.
 * The overlay is only repositioned on button enter/leave — not per-frame.
 * No span style mutations.
 *
 * @param {number}   col
 * @param {number}   row
 * @param {object[]} pageButtons - buttons for the current page
 * @returns {object|null} the hovered button descriptor
 */
export function updateButtonHover(col, row, pageButtons) {
    const hovered = pageButtons.find(btn =>
        col >= btn.col && col < btn.col + btn.w &&
        row >= btn.row && row < btn.row + btn.h
    ) ?? null;

    if (hovered === activeHoveredButton) return activeHoveredButton;

    activeHoveredButton = hovered;
    if (!buttonEl) return activeHoveredButton;

    if (hovered) {
        // Resize + reposition the button overlay (one-shot on enter, not per-frame)
        buttonEl.style.width     = `${hovered.w * CHAR_W}px`;
        buttonEl.style.height    = `${hovered.h * CHAR_H}px`;
        buttonEl.style.transform = `translate(${hovered.col * CHAR_W}px, ${hovered.row * CHAR_H}px)`;
    } else {
        buttonEl.style.transform = OFFSCREEN;
    }

    return activeHoveredButton;
}
