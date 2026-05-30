/**
 * cursor.js — Cursor and button hover via CSS overlay divs.
 *   Result: cursor-related DOM writes drop from ~120/second to ~0/second.
 */

import { THEME } from './config.js';
import { getVisiblePre } from './renderer.js';



// ── Overlay elements (created by initCursorOverlay) ───────────────────────────

let buttonEl = null;
let CHAR_W = 0;
let CHAR_H = 0;

// ── Cursor position state ─────────────────────────────────────────────────────

/** Park offscreen — compositor op, no layout cost */
const OFFSCREEN = 'translate(-9999px, 0)';

// ── Init ──────────────────────────────────────────────────────────────────────

/**
 * Create and inject the button overlay element and set native custom cursor.
 * Must be called after font measurement (CHAR_W / CHAR_H known).
 *
 * @param {number} charW
 * @param {number} charH
 */
export function initCursorOverlay(charW, charH) {
    CHAR_W = charW;
    CHAR_H = charH;

    // ── Native Custom SVG Cursor ───────────────────────────────────────────
    const svgCursor = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="18" viewBox="0 0 12 18" shape-rendering="crispEdges"><path fill="${THEME.primary}" stroke="#000000" stroke-width="1" d="M0,0 L0,15 L3.5,11.5 L6.5,16.5 L8,15.5 L5,10.5 L9.5,10.5 Z" /></svg>`;
    const base64 = btoa(svgCursor);
    const cursorStyle = `url('data:image/svg+xml;base64,${base64}') 0 0, auto`;
    document.body.style.cursor = cursorStyle;
    document.documentElement.style.cursor = cursorStyle;

    // ── Button hover overlay ───────────────────────────────────────────────
    buttonEl = document.createElement('div');
    buttonEl.id = 'button-over';
    document.body.appendChild(buttonEl);
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
        buttonEl.style.width = `${hovered.w * CHAR_W}px`;
        buttonEl.style.height = `${hovered.h * CHAR_H}px`;
        buttonEl.style.transform = `translate(${hovered.col * CHAR_W}px, ${hovered.row * CHAR_H}px)`;
    } else {
        buttonEl.style.transform = OFFSCREEN;
    }

    return activeHoveredButton;
}
