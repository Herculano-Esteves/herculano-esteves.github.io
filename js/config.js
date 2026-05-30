/**
 * config.js — Global configuration and theme constants.
 * Edit CONFIG to tweak behaviour; edit THEME to change colours.
 */

export const CONFIG = {
    // Font & Grid
    charSize: 14,           // Font size in px — determines column count automatically

    // Big ASCII-art text scaling
    bigTextScale: 1,        // Dots per bitmap pixel (1 = tiny, 2 = readable, 3 = bold)

    // Wave Transition
    transitionType: 'scramble', // 'flip' to use 3D rotating cards, 'scramble' to morph characters in-place
    scrambleDurationMs: 150,    // Duration of character scramble in ms
    scrambleIntervalMs: 20,     // Interval between character cycles in ms
    durationMs: 20,             // Flip duration per panel (ms) — keep fast for split-flap feel
    overlapLimit: 15,           // Simultaneous wave steps — higher = faster sweep
    spins: 0,                   // Extra full 360° spins per flip (0 = plain half-flip)
    easing: 'cubic-bezier(0.25, 1, 0.5, 1)',

    // Input
    scrollDebounceMs: 40,       // ms — prevents accidental double-page jumps (adjusted for scramble)
};

export const THEME = {
    bg: '#000000',
    primary: '#39ff14',
    dim: '#1a5c00',
    muted: '#0a2e00',
};

export function updateThemeFromCSS() {
    const style = getComputedStyle(document.documentElement);
    THEME.bg = style.getPropertyValue('--bg').trim() || '#000000';
    THEME.primary = style.getPropertyValue('--primary').trim() || '#39ff14';
    THEME.dim = style.getPropertyValue('--dim').trim() || '#1a5c00';
    THEME.muted = style.getPropertyValue('--muted').trim() || '#0a2e00';
}

// Sync initially on module load
updateThemeFromCSS();
