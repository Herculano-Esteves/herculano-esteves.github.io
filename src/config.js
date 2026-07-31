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
  fontSizeNonCrtPx: 18, // Font size when CRT mode is inactive (normal crisp text)

  // Scramble Animation Settings
  scrambleChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%+-=', // Characters used to scramble
  scrambleDurationMs: 250, // Duration/speed of scramble animation in ms

  // CRT Monitor Simulation Settings
  crtScanlineHeightPx: 2,  // Vertical height/spacing of the CRT scanlines in pixels
  crtApertureWidthPx: 3,   // Horizontal width/spacing of the CRT RGB mask in pixels
  crtOpacity: 1.0,         // Opacity of the CRT simulation
  crtBloomPx: 0.4,         // Analog glow/bloom radius in pixels

  // Central Theme Color Palette (Variables synchronized across all pages)
  theme: {
    bg: '#0e0e0e',        // Main dark background color
    primary: '#ffffff',   // High-contrast primary text and main highlights
    secondary: '#cccccc', // Bright secondary text (tags, status badges, subtitles)
    dim: '#aaaaaa',       // Medium-contrast text for descriptions & body text
    muted: '#444444',     // Low-contrast elements (dashed dividers, structural lines)
    border: '#333333',    // Card and element borders
  }
};
