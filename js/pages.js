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

export const PAGES = [
    {
        // Page 1 — Home / name
        build(cols, rows, buttons) {
            const g  = emptyGrid(cols, rows);
            const sc = CONFIG.bigTextScale;
            const TH = 7 * sc; // big-text block height in rows

            // Vertical centre: name lines + labels + button
            const totalH = TH + sc * 2 + TH + 3 + 6;
            const top    = Math.max(0, Math.floor((rows - totalH) / 2));

            renderBigText(g, 'HERCULANO', centerBigCol('HERCULANO', sc, cols), top,             sc, THEME.primary);
            renderBigText(g, 'ESTEVES',   centerBigCol('ESTEVES',   sc, cols), top + TH + sc*2, sc, THEME.dim);

            const row2 = top + totalH - 6;
            const l1   = '> software_engineer';
            renderText(g, l1, centerTextCol(l1, cols), row2, THEME.primary);

            const fullText = '@herculano  \xb7  University of Minho';
            const startCol = centerTextCol(fullText, cols);
            renderButton(g, buttons, '@herculano', startCol, row2 + 2, () => {
                window.open('https://github.com/Herculano-Esteves', '_blank');
            }, 'underline');
            renderText(g, '  \xb7  University of Minho', startCol + 11, row2 + 2, THEME.dim);

            return g;
        },
    },
    {
        // Page 2 — About
        build(cols, rows, buttons) {
            const g  = emptyGrid(cols, rows);
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
            const top    = Math.max(0, Math.floor((rows - totalH) / 2));

            renderBigText(g, 'ABOUT', centerBigCol('ABOUT', sc, cols), top, sc, THEME.primary);

            lines.forEach((ln, i) => {
                const color = i === 0 ? THEME.primary : THEME.dim;
                renderText(g, ln, centerTextCol(ln, cols), top + TH + 2 + i, color);
            });

            return g;
        },
    },
    {
        // Page 3 — Projects
        build(cols, rows, buttons) {
            const g  = emptyGrid(cols, rows);
            const sc = CONFIG.bigTextScale;
            const TH = 7 * sc;

            const lines = [
                '> ls ./projects',
                '',
                'Fractals & generative art',
                'Web systems & tooling',
                'Algorithms & data structures',
                '-> github.com/Herculano-Esteves',
            ];
            const totalH = TH + 2 + lines.length;
            const top    = Math.max(0, Math.floor((rows - totalH) / 2));

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

            return g;
        },
    },
    {
        // Page 4 — Contact
        build(cols, rows, buttons) {
            const g  = emptyGrid(cols, rows);
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
            const top    = Math.max(0, Math.floor((rows - totalH) / 2));

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

            return g;
        },
    },
];
