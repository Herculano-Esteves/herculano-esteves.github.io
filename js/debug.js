/**
 * debug.js — Temporarily draws a vertical line exactly in the center of the screen
 * for visual layout alignment verification.
 */
(function() {
    const line = document.createElement('div');
    line.id = 'debug-center-line';
    Object.assign(line.style, {
        position: 'fixed',
        top: '0',
        left: '50%',
        width: '1px',
        height: '100vh',
        backgroundColor: 'red',
        zIndex: '99999',
        pointerEvents: 'none',
        opacity: '0.6',
    });
    document.body.appendChild(line);
    console.log('[DEBUG] Vertical center line injected.');
})();
