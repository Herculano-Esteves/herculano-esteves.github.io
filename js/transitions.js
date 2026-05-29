/**
 * transitions.js — Scramble and flip animation engine.
 *
 * Changes vs. the original inline script:
 *  1. runFlipTransition no longer calls card.querySelector() — uses card._frontFace /
 *     card._backFace references stored during buildDOM() in renderer.js.
 *  2. Both transition types call invalidatePre(col) in their completion callback so
 *     the visiblePres[] cache in renderer.js stays accurate after every page change.
 *  3. grids and PAGES.length are passed in at init time (no globals needed).
 */

import { CONFIG, THEME } from './config.js';
import { cards, makeCol, invalidatePre, getGridDimensions } from './renderer.js';

// ── Module-level state (set by initTransitions) ────────────────────────────────

let grids       = [];   // grids[pageIndex] — pre-computed 2D cell arrays
let numPages    = 0;    // total number of pages (PAGES.length)

/** Callback invoked by triggerTransition so input.js can clear selection state. */
let onTransitionStart = () => {};

// ── Init ──────────────────────────────────────────────────────────────────────

/**
 * @param {object[][][]} pageGrids        - pre-computed grids from main.js
 * @param {number}       pageCount        - total number of pages
 * @param {Function}     clearSelectionFn - called at the start of each transition
 */
export function initTransitions(pageGrids, pageCount, clearSelectionFn) {
    grids             = pageGrids;
    numPages          = pageCount;
    onTransitionStart = clearSelectionFn ?? (() => {});
}

// ── Scramble characters ────────────────────────────────────────────────────────

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%+-=';

/**
 * Scramble-in-place transition: cycles random chars in the changing cells,
 * then snaps to the target characters when the duration expires.
 *
 * @param {HTMLElement} card
 * @param {number}      col        - column index (for cache + grid lookup)
 * @param {number}      targetPage
 * @param {object}      sc         - merged config snapshot
 * @param {Function}    onComplete
 */
function runScrambleTransition(card, col, targetPage, sc, onComplete) {
    const { ROWS } = getGridDimensions();

    // Which face is currently visible? Same logic as invalidatePre in renderer.js
    const isFront = Math.round(card._currentRot / 180) % 2 === 0;
    const face    = isFront ? card._frontFace : card._backFace;
    const pre     = face?.firstElementChild ?? null;

    if (!pre) { onComplete(); return; }

    const oldGrid = grids[card._visiblePage];
    const newGrid = grids[targetPage];
    const spans   = pre.children;

    // Collect only the cells that actually change — skip the rest
    const changingRows = [];
    for (let r = 0; r < ROWS; r++) {
        const oldCell = oldGrid[r]?.[col] ?? { char: ' ', color: THEME.primary };
        const newCell = newGrid[r]?.[col] ?? { char: ' ', color: THEME.primary };
        const isChanging =
            oldCell.char    !== newCell.char   ||
            oldCell.color   !== newCell.color  ||
            oldCell.underline !== newCell.underline;
        if (isChanging) {
            changingRows.push({
                row:            r,
                targetChar:     newCell.char,
                targetColor:    newCell.color,
                targetUnderline: newCell.underline,
            });
        }
    }

    // Nothing changed in this column — skip straight to done
    if (changingRows.length === 0) { onComplete(); return; }

    const startTime = Date.now();
    const interval  = setInterval(() => {
        const elapsed = Date.now() - startTime;

        if (elapsed >= sc.scrambleDurationMs) {
            clearInterval(interval);
            // Write final target characters
            changingRows.forEach(({ row, targetChar, targetColor, targetUnderline }) => {
                const span = spans[row];
                if (!span) return;
                const ch = targetChar === '&' ? '&amp;'
                         : targetChar === '<' ? '&lt;'
                         : targetChar === '>' ? '&gt;'
                         : targetChar;
                span.innerHTML           = ch;
                span.style.color         = targetColor;
                span.style.textDecoration = targetUnderline ? 'underline' : '';
                span._origColor          = targetColor;
            });
            onComplete();
        } else {
            // Cycle random chars on still-changing cells
            changingRows.forEach(({ row }) => {
                const span = spans[row];
                if (!span) return;
                span.textContent         = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
                span.style.color         = THEME.primary;
                span.style.textDecoration = '';
            });
        }
    }, sc.scrambleIntervalMs);
}

/**
 * 3-D flip transition: updates the hidden face with the new page content,
 * then rotates the card 180° (plus optional extra spins).
 *
 * Uses card._frontFace / card._backFace instead of querySelector (set in buildDOM).
 *
 * @param {HTMLElement} card
 * @param {number}      col        - column index
 * @param {number}      targetPage
 * @param {object}      sc
 * @param {number}      dir        - -1 (forward) or +1 (backward)
 * @param {Function}    onComplete
 */
function runFlipTransition(card, col, targetPage, sc, dir, onComplete) {
    const isFrontVisible = Math.round(card._currentRot / 180) % 2 === 0;
    // Direct face reference — no querySelector
    const hiddenFace = isFrontVisible ? card._backFace : card._frontFace;

    hiddenFace.innerHTML = makeCol(grids[targetPage], col);

    const deltaAngle = dir * (180 + 360 * sc.spins);
    const targetRot  = card._currentRot + deltaAngle;

    card.style.transition = `transform ${sc.durationMs}ms ${sc.easing}`;
    card.style.transform  = `rotateY(${targetRot}deg)`;
    card._currentRot      = targetRot;

    setTimeout(onComplete, sc.durationMs + 20);
}

// ── Queue processor ────────────────────────────────────────────────────────────

/**
 * Dequeue one transition step for a card and schedule it with the correct wave delay.
 * Both paths call invalidatePre(col) in their completion callback to keep
 * the visiblePres[] cache in renderer.js accurate.
 */
function processQueue(card, col) {
    if (card._queue.length === 0) { card._animating = false; return; }
    card._animating = true;

    const { targetPage, sc, waveStartTime } = card._queue.shift();
    const { COLS }   = getGridDimensions();

    // Already showing the right page — nothing to do
    if (targetPage === card._visiblePage) { processQueue(card, col); return; }

    // Shortest-path direction around the circular page list
    let diff = targetPage - card._visiblePage;
    if (diff >  numPages / 2) diff -= numPages;
    if (diff < -numPages / 2) diff += numPages;
    const dir = diff >= 0 ? -1 : 1;

    // Wave delay: panels further from centre start later
    const halfN          = (COLS - 1) / 2;
    const stepIndex      = Math.floor(Math.abs(col - halfN));
    const activeDuration = sc.transitionType === 'scramble' ? sc.scrambleDurationMs : sc.durationMs;
    const staggerMs      = activeDuration / sc.overlapLimit;
    const waveDelay      = stepIndex * staggerMs;
    const waitMs         = Math.max(0, (waveStartTime + waveDelay) - Date.now());

    setTimeout(() => {
        const type = sc.transitionType || 'flip';

        const onDone = () => {
            card._visiblePage = targetPage;
            invalidatePre(col);  // ← keep visiblePres[] cache in sync
            processQueue(card, col);
        };

        if (type === 'scramble') {
            runScrambleTransition(card, col, targetPage, sc, onDone);
        } else {
            runFlipTransition(card, col, targetPage, sc, dir, onDone);
        }
    }, waitMs);
}

// ── Public API ─────────────────────────────────────────────────────────────────

/**
 * Trigger a transition to targetPage on all columns simultaneously.
 * Collapses any pending intermediate steps (direct-jump semantics).
 *
 * @param {number} targetPage
 * @param {object} [customConfig] - overrides for CONFIG values
 */
export function triggerTransition(targetPage, customConfig = {}) {
    const sc           = { ...CONFIG, ...customConfig };
    const waveStartTime = Date.now();
    onTransitionStart();
    cards.forEach((card, col) => {
        card._queue = [{ targetPage, sc, waveStartTime }];
        if (!card._animating) processQueue(card, col);
    });
}
