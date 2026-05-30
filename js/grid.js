/**
 * grid.js — Pure grid helper functions.
 * A "grid" is a 2D array of cell objects: { char, color, underline? }.
 * None of these functions touch the DOM.
 */

import { GLYPH } from './font.js';
import { THEME } from './config.js';

// ── Cell factory ──────────────────────────────────────────────────────────────

/** Create a blank grid of { char, color } cells. */
export function emptyGrid(cols, rows) {
    return Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({ char: ' ', color: THEME.primary }))
    );
}

// ── Plain text ─────────────────────────────────────────────────────────────────

/** Write a plain string at (startCol, startRow) on the grid. */
export function renderText(grid, text, startCol, startRow, color) {
    const ROWS = grid.length;
    const COLS = grid[0].length;
    for (let i = 0; i < text.length; i++) {
        const c = startCol + i;
        if (c < 0 || c >= COLS || startRow < 0 || startRow >= ROWS) continue;
        grid[startRow][c] = { char: text[i], color };
    }
}

// ── Big bitmap text ────────────────────────────────────────────────────────────

const GLYPH_W = 5;
const GLYPH_H = 7;
const KERNING = 1; // gap in dots between glyphs

/**
 * Return the column width (in grid cells) that a big-text string will occupy.
 * @param {string} text
 * @param {number} scale - CONFIG.bigTextScale
 */
export function bigTextWidth(text, scale) {
    return (text.length * (GLYPH_W + KERNING) - KERNING) * scale;
}

/** Return the centred start column for big text. */
export function centerBigCol(text, scale, cols) {
    return Math.max(0, Math.floor((cols - bigTextWidth(text, scale)) / 2));
}

/** Return the centred start column for a plain string. */
export function centerTextCol(text, cols) {
    return Math.max(0, Math.ceil((cols - text.length) / 2));
}

/**
 * Write large bitmap text at (startCol, startRow).
 * Filled dots → '█', empty dots → leave as-is (space).
 * @param {object[][]} grid
 * @param {string}     text
 * @param {number}     startCol
 * @param {number}     startRow
 * @param {number}     scale    - pixels per bitmap dot
 * @param {string}     color
 */
export function renderBigText(grid, text, startCol, startRow, scale, color) {
    const ROWS = grid.length;
    const COLS = grid[0].length;
    let xOff = 0;

    for (const ch of text.toUpperCase()) {
        const glyph = GLYPH[ch] ?? GLYPH[' '];
        for (let gy = 0; gy < GLYPH_H; gy++) {
            for (let gx = 0; gx < GLYPH_W; gx++) {
                if (!glyph[gy][gx]) continue;
                for (let sy = 0; sy < scale; sy++) {
                    for (let sx = 0; sx < scale; sx++) {
                        const r = startRow + gy * scale + sy;
                        const c = startCol + xOff + gx * scale + sx;
                        if (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
                            grid[r][c] = { char: '\u2588', color };
                        }
                    }
                }
            }
        }
        xOff += (GLYPH_W + KERNING) * scale;
    }
}

// ── Interactive buttons ────────────────────────────────────────────────────────

/**
 * Write a button onto the grid and register it in the buttons array.
 * @param {object[][]}  grid
 * @param {object[]}    buttons  - array to push the button descriptor into
 * @param {string}      text
 * @param {number}      col
 * @param {number}      row
 * @param {Function}    action   - called on click
 * @param {string|boolean} style - 'border' | 'underline' | 'plain' (false = plain)
 */
export function renderButton(grid, buttons, text, col, row, action, style = 'plain') {
    const color = THEME.primary;

    if (style === 'border' || style === true) {
        const w = text.length + 4; // text + padding + border chars
        const h = 3;
        renderText(grid, '┌' + '─'.repeat(w - 2) + '┐', col,     row,     color);
        renderText(grid, '│ ' + text + ' │',              col,     row + 1, color);
        renderText(grid, '└' + '─'.repeat(w - 2) + '┘', col,     row + 2, color);
        buttons.push({ col, row, w, h, action });

    } else if (style === 'underline') {
        const COLS = grid[0].length;
        const ROWS = grid.length;
        for (let i = 0; i < text.length; i++) {
            const c = col + i;
            if (c >= 0 && c < COLS && row >= 0 && row < ROWS) {
                grid[row][c] = { char: text[i], color: THEME.primary, underline: true };
            }
        }
        buttons.push({ col, row, w: text.length, h: 1, action });

    } else {
        // plain — no border decoration
        renderText(grid, text, col, row, color);
        buttons.push({ col, row, w: text.length, h: 1, action });
    }
}
