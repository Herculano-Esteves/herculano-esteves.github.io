# Keyboard Navigation & Shortcuts

This document details the global keyboard navigation system implemented in **herculano-esteves.github.io**. It is designed to emulate authentic terminal CLI and Vim navigation workflows while browsing through the portfolio.

---

## 1. Quick Reference Table

| Key(s) | Action | Scope / Context |
| :--- | :--- | :--- |
| <kbd>j</kbd> or <kbd>↓</kbd> (Down Arrow) | Scroll to **Next Section** | Global |
| <kbd>k</kbd> or <kbd>↑</kbd> (Up Arrow) | Scroll to **Previous Section** | Global |
| <kbd>g</kbd> or <kbd>Home</kbd> | Jump to **Top** (`home`) | Global |
| <kbd>G</kbd> (<kbd>Shift</kbd> + <kbd>g</kbd>) or <kbd>End</kbd> | Jump to **Bottom** (`projects`) | Global |
| <kbd>1</kbd> | Direct jump to **Home** | Global |
| <kbd>2</kbd> | Direct jump to **Education** | Global |
| <kbd>3</kbd> | Direct jump to **Skills** | Global |
| <kbd>4</kbd> | Direct jump to **Experience** | Global |
| <kbd>5</kbd> | Direct jump to **Opportunities** | Global |
| <kbd>6</kbd> | Direct jump to **Devlogs** (Active Research) | Global |
| <kbd>7</kbd> | Direct jump to **Projects** | Global |
| <kbd>?</kbd> (<kbd>Shift</kbd> + <kbd>/</kbd>) | Toggle **Shortcuts Cheat Sheet** overlay | Global |
| <kbd>Esc</kbd> | Close active modal / cheat sheet / devlog | Modals & Overlays |

---

## 2. Interactive Behavior & Rules

### Vim & Terminal Conventions
* **`j` / `k` Navigation:** Moves sequentially between stacked sections according to the current scroll baseline (`scrollTop + 35vh`).
* **`g` / `G` Navigation:** Lowercase `g` (or `Home`) smoothly scrolls to the very top section (`#home`). Uppercase `G` with `Shift` (or `End`) scrolls directly to the last section (`#projects`).
* **Direct Numbers (`1`–`7`):** Instantly triggers a smooth scroll to the designated chapter without having to cycle through intermediate sections.

### Safety Guards & Input Immunity
* **Form & Input Immunity:** Keyboard shortcuts are automatically suppressed if the user is typing into any `<input>`, `<textarea>`, or content-editable element.
* **Browser Shortcut Preservation:** Shortcuts are ignored if system modifier keys (<kbd>Ctrl</kbd>, <kbd>Alt</kbd>, or <kbd>Cmd/Meta</kbd>) are held down, ensuring default browser shortcuts (e.g. `Ctrl+R`, `Cmd+C`, `Cmd+L`) function without interference.
* **Modal Awareness:** When reading an in-depth Devlog (`DevlogModal`) or zooming into project images (`Lightbox`), section jumping is paused so you can scroll or read the modal content naturally. Pressing <kbd>Esc</kbd> closes the active modal.

---

## 3. UI Help Popover

Pressing <kbd>?</kbd> at any time (or clicking the **`[ ? ]`** button in the bottom-right corner) opens a compact, non-intrusive terminal popover anchored right next to the button. It does not obstruct the page or dim the screen.

Pressing <kbd>Esc</kbd>, clicking the `[x]` button, or clicking anywhere outside the popover dismisses it.

---

## 4. Technical Architecture

* **Central Configuration:** Section identifiers, labels, and shortcut keys are configured in [`src/config.js`](./src/config.js) under `CONFIG.sections`:
  ```javascript
  sections: [
    { id: 'home', label: 'home', key: '1' },
    { id: 'education', label: 'education', key: '2' },
    { id: 'experience', label: 'experience', key: '3' },
    { id: 'opportunities', label: 'opportunities', key: '4' },
    { id: 'research', label: 'devlogs', key: '5' },
    { id: 'projects', label: 'projects', key: '6' },
    { id: 'skills', label: 'skills', key: '7' },
  ]
  ```
* **Component Implementation:** Handled by [`src/components/KeyboardNav.jsx`](./src/components/KeyboardNav.jsx).
* **Smooth Scrolling:** Utilizes the underlying `SimpleBar` scroll container element (`simpleBarRef.current.getScrollElement()`) to perform hardware-accelerated smooth scrolling anchored to character grid margins.
