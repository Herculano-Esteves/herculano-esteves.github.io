/**
 * pages.js — Page content definitions.
 * Each page exposes a build(cols, rows, buttons) function that returns a grid.
 * Add, remove, or reorder pages here — the engine adapts automatically.
 */

import { CONFIG, THEME } from './config.js';
import {
    emptyGrid,
    renderText,
    renderBigText,
    renderButton,
    centerBigCol,
    centerTextCol,
} from './grid.js';

// ── Shared Navigation Header ──────────────────────────────────────────────────

function drawNavbar(g, cols, buttons, activeIdx) {
    const pages = ['HOME', 'ABOUT', 'PROJECTS', 'CONTACT'];

    // [ HOME ]   [ ABOUT ]   [ PROJECTS ]   [ CONTACT ]
    const formatted = pages.map(p => `[ ${p} ]`);
    const totalW = formatted.join('   ').length;

    let startCol = centerTextCol(' '.repeat(totalW), cols);
    const row = 1;

    pages.forEach((name, idx) => {
        const btnText = `[ ${name} ]`;
        const isActive = (idx === activeIdx);

        // Render '[ '
        renderText(g, '[ ', startCol, row, THEME.dim);

        // Render the name (with invert if active)
        const nameCol = startCol + 2;
        for (let i = 0; i < name.length; i++) {
            const c = nameCol + i;
            if (c >= 0 && c < cols && row >= 0 && row < g.length) {
                g[row][c] = {
                    char: name[i],
                    color: THEME.primary,
                    invert: isActive
                };
            }
        }

        // Render ' ]'
        renderText(g, ' ]', nameCol + name.length, row, THEME.dim);

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
            const sc = CONFIG.bigTextScale;
            const TH = 7 * sc; // big-text block height in rows

            // Vertical centre: name lines + labels + buttons
            const totalH = 26; // total height of our layout block
            const top = Math.max(4, Math.floor((rows - totalH) / 2));

            renderBigText(g, 'HERCULANO', centerBigCol('HERCULANO', sc, cols), top, sc, THEME.primary);
            renderBigText(g, 'ESTEVES', centerBigCol('ESTEVES', sc, cols), top + TH + sc * 2, sc, THEME.dim);

            const rowSoftware = top + TH + sc * 2 + TH + 2; // top + 18
            const fullL1 = '> software_engineer  @  University of Minho';
            const startColL1 = centerTextCol(fullL1, cols);
            renderText(g, '> software_engineer', startColL1, rowSoftware, THEME.primary);
            renderText(g, '  @  University of Minho', startColL1 + 19, rowSoftware, THEME.dim);

            const githubCol = centerTextCol('github', cols);
            renderButton(g, buttons, 'github', githubCol, rowSoftware + 2, () => {
                window.open('https://github.com/Herculano-Esteves', '_blank');
            }, 'underline');

            const maxW = 48;
            const startColProj = centerTextCol(' '.repeat(maxW), cols);

            const rowProject = rowSoftware + 4; // top + 22
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
            const sc = CONFIG.bigTextScale;
            const TH = 7 * sc;

            const lines = [
                '> whoami',
                '',
                'Curious, systematic, always building.',
                'Passionate about elegant solutions',
                'and the beauty of mathematics in code.',
            ];
            const totalH = TH + 2 + lines.length;
            const top = Math.max(4, Math.floor((rows - totalH) / 2));

            renderBigText(g, 'ABOUT', centerBigCol('ABOUT', sc, cols), top, sc, THEME.primary);

            lines.forEach((ln, i) => {
                const color = i === 0 ? THEME.primary : THEME.dim;
                renderText(g, ln, centerTextCol(ln, cols), top + TH + 2 + i, color);
            });

            drawNavbar(g, cols, buttons, 1);
            return g;
        },
    },
    {
        // Page 3 — Projects
        build(cols, rows, buttons) {
            const g = emptyGrid(cols, rows);
            const sc = CONFIG.bigTextScale;
            const TH = 7 * sc;

            const lines = [
                '> ls projects',
                '',
                '-> github.com/Herculano-Esteves',
            ];
            const totalH = TH + 2 + lines.length;
            const top = Math.max(4, Math.floor((rows - totalH) / 2));

            renderBigText(g, 'PROJECTS', centerBigCol('PROJECTS', sc, cols), top, sc, THEME.primary);

            lines.forEach((ln, i) => {
                const color = i === 0 ? THEME.primary : THEME.dim;
                if (ln.startsWith('-> ')) {
                    renderButton(g, buttons, ln, centerTextCol(ln, cols), top + TH + 2 + i, () => {
                        window.open('https://github.com/Herculano-Esteves', '_blank');
                    }, false);
                } else {
                    renderText(g, ln, centerTextCol(ln, cols), top + TH + 2 + i, color);
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
            const sc = CONFIG.bigTextScale;
            const TH = 7 * sc;

            const lines = [
                '> ping herculano',
                '',
                'github.com/Herculano-Esteves',
                '',
                'Open to collaborations',
                'and interesting problems.',
            ];
            const totalH = TH + 2 + lines.length;
            const top = Math.max(4, Math.floor((rows - totalH) / 2));

            renderBigText(g, 'CONTACT', centerBigCol('CONTACT', sc, cols), top, sc, THEME.primary);

            lines.forEach((ln, i) => {
                const color = i === 0 ? THEME.primary : THEME.dim;
                if (ln.startsWith('github.com')) {
                    renderButton(g, buttons, ln, centerTextCol(ln, cols), top + TH + 2 + i, () => {
                        window.open('https://github.com/Herculano-Esteves', '_blank');
                    }, false);
                } else {
                    renderText(g, ln, centerTextCol(ln, cols), top + TH + 2 + i, color);
                }
            });

            drawNavbar(g, cols, buttons, 3);
            return g;
        },
    },
];
