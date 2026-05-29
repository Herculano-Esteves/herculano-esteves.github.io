/**
 * selection.js — Text selection state and visual feedback.
 *
 * PERFORMANCE FIX: The original updateSelectionVisuals() iterated ALL ROWS×COLS
 * spans on every mousemove drag event — up to 30 000 DOM reads/writes per event.
 *
 * This version maintains a `selectedSpans` Set. On each drag extension:
 *   - Only spans that leave the selection range are cleared  — O(removed)
 *   - Only new spans entering the range are styled           — O(added)
 * For small drag movements (the common case), this is O(1) instead of O(n²).
 */

import { THEME } from './config.js';
import { getVisiblePre, getGridDimensions } from './renderer.js';
import { clearActiveButton } from './cursor.js';

// ── State ─────────────────────────────────────────────────────────────────────

let selectStart = null;
let selectEnd   = null;
export let isSelecting = false;

/**
 * Only the spans that currently have selection styling applied.
 * Avoids full-grid iteration when clearing or updating selection.
 */
const selectedSpans = new Set();

// ── Style helpers ─────────────────────────────────────────────────────────────

function applySelect(span, linearIdx) {
    if (span._origColor === undefined) span._origColor = span.style.color || '';
    span.style.backgroundColor = span._origColor || THEME.primary;
    span.style.color           = THEME.bg;
    span._selected             = true;
    span._selIdx               = linearIdx; // used to cull stale spans efficiently
    selectedSpans.add(span);
}

function removeSelect(span) {
    span.style.backgroundColor = '';
    span.style.color           = span._origColor ?? '';
    span._selected             = false;
    selectedSpans.delete(span);
}

// ── Public API ────────────────────────────────────────────────────────────────

/** Clear selection and any active button highlight. */
export function clearSelection() {
    clearActiveButton();
    if (!selectStart) return;
    // O(selected) — only touches spans that are actually styled
    for (const span of selectedSpans) removeSelect(span);
    selectedSpans.clear();
    selectStart = null;
    selectEnd   = null;
    isSelecting = false;
}

/** Begin a new selection at (col, row). */
export function startSelection(col, row) {
    clearSelection();
    isSelecting = true;
    selectStart = { col, row };
    selectEnd   = { col, row };
}

/**
 * Extend the current selection to (col, row).
 * Computes a linear index range [newMin, newMax] and performs a dirty update:
 *   - Clears spans whose _selIdx fell outside the new range
 *   - Highlights new spans that entered the range
 */
export function extendSelection(col, row) {
    if (!isSelecting || !selectStart) return;
    const { COLS } = getGridDimensions();

    selectEnd = { col, row };

    const startIdx = selectStart.row * COLS + selectStart.col;
    const rawEnd   = row * COLS + col;
    const newMin   = Math.min(startIdx, rawEnd);
    const newMax   = Math.max(startIdx, rawEnd);

    // Remove spans no longer in the selection range — O(currently selected)
    for (const span of [...selectedSpans]) {
        if (span._selIdx < newMin || span._selIdx > newMax) removeSelect(span);
    }

    // Add spans newly inside the range — only touches the delta
    for (let idx = newMin; idx <= newMax; idx++) {
        const r    = Math.floor(idx / COLS);
        const c    = idx % COLS;
        const pre  = getVisiblePre(c);
        const span = pre?.children[r];
        if (span && !span._selected) applySelect(span, idx);
    }
}

/** Finalise selection on mouse-up. Collapses to nothing if start === end. */
export function endSelection() {
    if (!isSelecting) return;
    isSelecting = false;
    if (selectStart && selectEnd &&
        selectStart.col === selectEnd.col &&
        selectStart.row === selectEnd.row) {
        clearSelection();
    }
}

/** True if the selection spans more than one cell. */
export function hasSelection() {
    return selectStart !== null && selectedSpans.size > 0;
}

/**
 * Extract the selected text from the grid, respecting row order.
 * @param {object[][][]} grids
 * @param {number}       cur   - current page index
 */
export function getSelectionText(grids, cur) {
    if (!selectStart || !selectEnd) return '';
    const { COLS } = getGridDimensions();

    const startIdx = selectStart.row * COLS + selectStart.col;
    const endIdx   = selectEnd.row   * COLS + selectEnd.col;
    const minIdx   = Math.min(startIdx, endIdx);
    const maxIdx   = Math.max(startIdx, endIdx);
    if (minIdx === maxIdx) return '';

    const rStart = Math.floor(minIdx / COLS);
    const cStart = minIdx % COLS;
    const rEnd   = Math.floor(maxIdx / COLS);
    const cEnd   = maxIdx % COLS;
    const grid   = grids[cur];
    const lines  = [];

    for (let r = rStart; r <= rEnd; r++) {
        const cS = (r === rStart) ? cStart : 0;
        const cE = (r === rEnd)   ? cEnd   : COLS - 1;
        let rowStr = '';
        for (let c = cS; c <= cE; c++) rowStr += grid[r]?.[c]?.char ?? ' ';
        if (r < rEnd || cE === COLS - 1) rowStr = rowStr.trimEnd();
        lines.push(rowStr);
    }
    return lines.join('\n');
}
