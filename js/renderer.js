/**
 * renderer.js — DOM construction and fast column-HTML generation.
 *
 */

import { CONFIG, THEME } from './config.js';

// ── Module-level state (set by initRenderer) ──────────────────────────────────

let COLS = 0;
let ROWS = 0;
let CHAR_W = 0;
let CHAR_H = 0;

/**
 * cards[col] — the .card element for each column.
 * Exported so input.js / transitions.js can iterate over them.
 */
export let cards = [];

/**
 * visiblePres[col] — the currently-visible <pre> inside column col.
 * O(1) read. Updated only by invalidatePre() at the end of transitions.
 */
let visiblePres = [];

// ── Init ──────────────────────────────────────────────────────────────────────

/**
 * Must be called once from main.js after grid dimensions are measured.
 * @param {number} cols   - number of character columns
 * @param {number} rows   - number of character rows
 * @param {number} charW  - pixel width of one character cell
 * @param {number} charH  - pixel height of one character cell
 */
export function initRenderer(cols, rows, charW, charH) {
    COLS = cols;
    ROWS = rows;
    CHAR_W = charW;
    CHAR_H = charH;
    visiblePres = new Array(COLS).fill(null);
}

/** Expose CHAR_W / CHAR_H for hit-testing in input.js */
export function getCharDimensions() { return { CHAR_W, CHAR_H }; }

/** Expose COLS / ROWS for loops in selection.js and cursor.js */
export function getGridDimensions() { return { COLS, ROWS }; }

// ── Column HTML builder ───────────────────────────────────────────────────────

/**
 * Build the innerHTML string for a single column of a grid.
 * Uses Array.join instead of += string concatenation (avoids repeated allocations).
 *
 * @param {object[][]} grid - 2D array of { char, color, underline? } cells
 * @param {number}     col  - column index
 * @returns {string}
 */
export function makeCol(grid, col) {
    const parts = [
        `<pre class="col-face" style="font-size:${CONFIG.charSize}px;background:${THEME.bg}">`,
    ];
    for (let row = 0; row < ROWS; row++) {
        const cell = grid[row]?.[col] ?? { char: ' ', color: THEME.primary };
        // Escape HTML special characters that can appear in page content
        const ch = cell.char === '&' ? '&amp;'
            : cell.char === '<' ? '&lt;'
                : cell.char === '>' ? '&gt;'
                    : cell.char;
        const decor = cell.underline ? ';text-decoration:underline' : '';
        const bg = cell.invert ? `;background:${cell.color};color:${THEME.bg}` : `color:${cell.color}`;
        parts.push(`<span style="${bg}${decor}">${ch}</span>`);
        if (row < ROWS - 1) parts.push('\n');
    }
    parts.push('</pre>');
    return parts.join('');
}

// ── visiblePres cache ─────────────────────────────────────────────────────────

/**
 * O(1) read of the currently-visible <pre> for the given column.
 * Use this everywhere instead of querySelector / cards.map(getVisiblePre).
 *
 * @param {number} col
 * @returns {HTMLElement|null}
 */
export function getVisiblePre(col) {
    return visiblePres[col] ?? null;
}

/**
 * Recompute and cache the visible <pre> for column col.
 * Call this at the end of every transition (scramble or flip) for the affected column.
 *
 * @param {number} col
 */
export function invalidatePre(col) {
    const card = cards[col];
    if (!card) return;
    const isFront = Math.round(card._currentRot / 180) % 2 === 0;
    // Use cached face references (set during buildDOM) to avoid querySelector
    const face = isFront ? card._frontFace : card._backFace;
    visiblePres[col] = face ? face.firstElementChild : null;
}

// ── DOM builder ───────────────────────────────────────────────────────────────

/**
 * Build the full scene: one panel + card (front face + back face) per column.
 * Seeds visiblePres[] with the front <pre> of each card (page 0 is shown first).
 *
 * @param {HTMLElement} scene  - #scene container
 * @param {object[][][]} grids - pre-computed grids[pageIndex] from main.js
 * @returns {HTMLElement[]}    - array of card elements (same as exported `cards`)
 */
export function buildDOM(scene, grids) {
    const builtCards = [];

    for (let i = 0; i < COLS; i++) {
        const panel = document.createElement('div');
        panel.className = 'panel';
        panel.style.cssText = `width:${CHAR_W}px;min-width:${CHAR_W}px;perspective:800px`;

        const card = document.createElement('div');
        card.className = 'card';

        const front = document.createElement('div');
        front.className = 'face front';
        front.innerHTML = makeCol(grids[0], i);

        const back = document.createElement('div');
        back.className = 'face back';
        back.innerHTML = makeCol(grids[1 % grids.length], i);

        // Cache face references directly on the card element.
        // This means transitions and invalidatePre never need querySelector.
        card._frontFace = front;
        card._backFace = back;

        card._queue = [];
        card._animating = false;
        card._currentRot = 0;
        card._visiblePage = 0;

        card.appendChild(front);
        card.appendChild(back);
        panel.appendChild(card);
        scene.appendChild(panel);
        builtCards.push(card);

        // Seed cache — page 0 is on the front face, which is visible initially
        visiblePres[i] = front.firstElementChild;
    }

    cards = builtCards;
    return builtCards;
}
