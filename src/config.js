/**
 * config.js — Global React Configuration.
 * 
 * Edit these values to configure the layout size, grid dimensions, colors, and styles.
 * These configurations are automatically synchronized with CSS variables during app startup.
 */

export const CONFIG = {
  // Grid Dimensions
  totalCols: 70,        // Total horizontal characters (columns) per page
  fontSizePx: 24,       // Font size when CRT mode is active (larger to keep pixels crisp)
  fontSizeNonCrtPx: 16, // Font size when CRT mode is inactive (normal crisp text)

  // Scramble Animation Settings
  scrambleChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%+-=', // Characters used to scramble
  scrambleDurationMs: 250, // Duration/speed of scramble animation in ms

  // CRT Monitor Simulation Settings
  crtScanlineHeightPx: 2,  // Vertical height/spacing of the CRT scanlines in pixels
  crtApertureWidthPx: 3,   // Horizontal width/spacing of the CRT RGB mask in pixels
  crtOpacity: 1.0,         // Opacity of the CRT simulation (1.0 makes text render strictly within CRT pixels)
  crtBloomPx: 0.4,         // Analog glow/bloom radius in pixels, causing colors to bleed over dark lines

  // Theme Colors
  theme: {
    bg: '#0e0e0e',      // Fixed dark gray background color for the page
    primary: '#ffffff', // High-contrast primary color (e.g. text)
    dim: '#888888',     // Medium-contrast secondary text
    muted: '#333333',   // Low-contrast elements (e.g. inactive borders)
  }
};
