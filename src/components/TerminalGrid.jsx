import React from 'react';

/**
 * TerminalGrid creates a fixed grid of character rows and columns.
 * It uses the monospace 'ch' and 'em' units to ensure perfect alignment.
 */
export function TerminalGrid({ children, cols = 70 }) {
  return (
    <div
      className="terminal-grid"
      style={{
        '--total-cols': cols,
        position: 'relative',
        width: 'calc(var(--total-cols) * 1ch)',
        display: 'grid',
        gridAutoRows: '1em',
        margin: '0 auto',
        userSelect: 'text',
      }}
    >
      {children}
    </div>
  );
}

/**
 * Row represents a single horizontal line of text in the terminal grid.
 */
export function Row({ y, h = 1, children, className = '' }) {
  return (
    <div
      className={`terminal-row ${className}`}
      style={{
        gridRowStart: y + 1,
        gridRowEnd: y + 1 + h,
        position: 'relative',
        display: 'flex',
        alignItems: 'stretch',
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </div>
  );
}

/**
 * Col positions content starting at a specific character column (0-indexed).
 */
export function Col({ x, children, className = '', ...props }) {
  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        left: `${x}ch`,
        display: 'inline-block',
        whiteSpace: 'pre',
      }}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Left positions content at the absolute left of the row (column 0).
 */
export function Left({ children, className = '', ...props }) {
  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        left: 0,
        display: 'inline-block',
        whiteSpace: 'pre',
      }}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Right positions content at the absolute right of the row.
 */
export function Right({ children, className = '', ...props }) {
  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        right: 0,
        display: 'inline-block',
        whiteSpace: 'pre',
      }}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Center centers content horizontally within the row.
 */
export function Center({ children, className = '', ...props }) {
  return (
    <div
      className={className}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
      }}
      {...props}
    >
      <div style={{ display: 'inline-block', whiteSpace: 'pre' }}>
        {children}
      </div>
    </div>
  );
}
