/**
 * pages.js — Page content definitions.
 * Each page exposes a build(cols, rows, buttons) function that returns a grid.
 * Add, remove, or reorder pages here — the engine adapts automatically.
 */

import { CONFIG, THEME } from './config.js';
import {
    emptyGrid,
    renderText,
    renderButton,
    centerTextCol,
} from './grid.js';

// ── Shared Navigation Header ──────────────────────────────────────────────────

function padCenter(str, targetLen) {
    if (str.length >= targetLen) return str;
    const diff = targetLen - str.length;
    const left = Math.floor(diff / 2);
    const right = diff - left;
    return ' '.repeat(left) + str + ' '.repeat(right);
}

function drawNavbar(g, cols, buttons, activeIdx) {
    const pages = ['HOME', 'ABOUT', 'PROJECTS', 'CONTACT'];
    const maxLen = Math.max(...pages.map(p => p.length));

    // Uniformly padded page names (e.g. "  HOME  " to match "PROJECTS")
    const formatted = pages.map(p => `[ ${padCenter(p, maxLen)} ]`);
    const totalW = formatted.join('   ').length;

    let startCol = centerTextCol(' '.repeat(totalW), cols);
    const row = 1;

    pages.forEach((name, idx) => {
        const paddedName = padCenter(name, maxLen);
        const btnText = `[ ${paddedName} ]`;
        const isActive = (idx === activeIdx);

        // Render '[ '
        renderText(g, '[ ', startCol, row, THEME.dim);

        // Render the name (with invert if active)
        const nameCol = startCol + 2;
        for (let i = 0; i < paddedName.length; i++) {
            const c = nameCol + i;
            if (c >= 0 && c < cols && row >= 0 && row < g.length) {
                g[row][c] = {
                    char: paddedName[i],
                    color: THEME.primary,
                    invert: isActive
                };
            }
        }

        // Render ' ]'
        renderText(g, ' ]', nameCol + paddedName.length, row, THEME.dim);

        // Register button
        buttons.push({
            col: startCol,
            row: row,
            w: btnText.length,
            h: 1,
            action: () => {
                window.dispatchEvent(new CustomEvent('nav-to-page', { detail: { page: idx } }));
            }
        });

        // Advance startCol
        startCol += btnText.length + 3;
    });
}

export const PAGES = [
    {
        // Page 1 — Home / name
        build(cols, rows, buttons) {
            const g = emptyGrid(cols, rows);

            // Center the name vertically in the viewport
            const mid = Math.max(5, Math.floor(rows / 2));

            const startColHerc = centerTextCol('Herculano', cols);
            const startColEst = centerTextCol('Esteves', cols);
            renderText(g, 'Herculano', startColHerc, mid - 1, THEME.primary);
            renderText(g, 'Esteves', startColEst, mid, THEME.primary);

            const rowSoftware = mid + 5; // 4 blank lines after Esteves
            const centerCol = Math.floor(cols / 2);
            renderText(g, 'software_engineer', centerCol - 19, rowSoftware, THEME.primary);
            renderText(g, '@  University of Minho', centerCol, rowSoftware, THEME.dim);

            const githubCol = centerTextCol('github', cols);
            renderButton(g, buttons, 'github', githubCol, rowSoftware + 2, () => {
                window.open('https://github.com/Herculano-Esteves', '_blank');
            }, 'underline');

            const maxW = 48;
            const startColProj = centerTextCol(' '.repeat(maxW), cols);

            const rowProject = rowSoftware + 4;
            const l2 = 'featured project:';
            renderText(g, l2, startColProj, rowProject, THEME.dim);

            // Render the two project lines
            renderText(g, '| Exam Preparation', startColProj, rowProject + 1, THEME.primary);
            renderText(g, '| Software engineering exam preparation platform', startColProj, rowProject + 2, THEME.dim);

            // Register the project block as a single button area
            buttons.push({
                col: startColProj,
                row: rowProject + 1,
                w: maxW,
                h: 2,
                action: () => {
                    window.open('https://herculano-esteves.github.io/examPreparation/', '_blank');
                }
            });

            drawNavbar(g, cols, buttons, 0);
            return g;
        },
    },
    {
        // Page 2 — About
        build(cols, rows, buttons) {
            const g = emptyGrid(cols, rows);
            const mid = Math.max(5, Math.floor(rows / 2));

            const lines = [
                'Curious, systematic, always building.',
                'Passionate about elegant solutions',
                'and the beauty of mathematics in code.',
            ];

            renderText(g, 'About', centerTextCol('About', cols), mid - 1, THEME.primary);

            lines.forEach((ln, i) => {
                const color = i === 0 ? THEME.primary : THEME.dim;
                renderText(g, ln, centerTextCol(ln, cols), mid + 5 + i, color);
            });

            drawNavbar(g, cols, buttons, 1);
            return g;
        },
    },
    {
        // Page 3 — Projects
        build(cols, rows, buttons) {
            const g = emptyGrid(cols, rows);
            const mid = Math.max(5, Math.floor(rows / 2));

            const lines = [
                '-> github.com/Herculano-Esteves',
            ];

            renderText(g, 'Projects', centerTextCol('Projects', cols), mid - 1, THEME.primary);

            lines.forEach((ln, i) => {
                const color = i === 0 ? THEME.primary : THEME.dim;
                if (ln.startsWith('-> ')) {
                    renderButton(g, buttons, ln, centerTextCol(ln, cols), mid + 5 + i, () => {
                        window.open('https://github.com/Herculano-Esteves', '_blank');
                    }, false);
                } else {
                    renderText(g, ln, centerTextCol(ln, cols), mid + 5 + i, color);
                }
            });

            drawNavbar(g, cols, buttons, 2);
            return g;
        },
    },
    {
        // Page 4 — Contact
        build(cols, rows, buttons) {
            const g = emptyGrid(cols, rows);
            const mid = Math.max(5, Math.floor(rows / 2));

            const lines = [
                'github.com/Herculano-Esteves',
                '',
                'Open to collaborations',
                'and interesting problems.',
            ];

            renderText(g, 'Contact', centerTextCol('Contact', cols), mid - 1, THEME.primary);

            lines.forEach((ln, i) => {
                const color = i === 0 ? THEME.primary : THEME.dim;
                if (ln.startsWith('github.com')) {
                    renderButton(g, buttons, ln, centerTextCol(ln, cols), mid + 5 + i, () => {
                        window.open('https://github.com/Herculano-Esteves', '_blank');
                    }, false);
                } else {
                    renderText(g, ln, centerTextCol(ln, cols), mid + 5 + i, color);
                }
            });

            drawNavbar(g, cols, buttons, 3);
            return g;
        },
    },
];
