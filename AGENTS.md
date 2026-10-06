# AGENTS.md — Agent Guidelines & Instructions

> **Primary Codebase Reference:** Before making architectural modifications, read **[CODEBASE.md](./CODEBASE.md)** for detailed file maps, component contracts, and design systems.

This document defines the constraints, conventions, and operational workflows for automated AI coding agents working on the **herculano-esteves.github.io** repository.

---

## 1. Architectural Philosophy & Constraints

1. **Retro Monospace Terminal Aesthetic:**
   - Every view must strictly adhere to the retro terminal character-cell aesthetic.
   - Never introduce standard modern web patterns that break the theme (e.g. rounded border-radius cards, soft shadows, non-monospace fonts, or fluid percentage layouts that ignore character cells).
   - All text must use the monospace font defined in `--terminal-font-size` and `'Share Tech Mono'`.

2. **Character Cell Dimensions (`CONFIG.totalCols`):**
   - Content widths are anchored to character columns: `width: calc(var(--total-cols) * 1ch)` (defined in [`src/config.js`](./src/config.js), default 70 columns).
   - Section wrappers should follow:
     ```jsx
     <div className="page-wrapper" style={{ width: 'calc(var(--total-cols) * 1ch)', margin: '4rem auto 2rem auto' }}>
     ```

3. **Critical Line-Height Reset Rule:**
   - The global stylesheet (`src/index.css`) forces `line-height: 1 !important` for character grid alignment.
   - **Crucial Rule:** Any multi-line prose, description, or wrapped paragraph **must** apply `.project-desc` or explicit `line-height: 1.4 !important; white-space: normal;`. Failing to do this causes text lines to collide and overlap vertically.

4. **Data-First Decoupling:**
   - Never hardcode personal data, projects, educational milestones, experience, or devlog articles inside JSX components.
   - All content lives exclusively in [`src/data/`](./src/data/):
     - `education.js` — Degrees, certificates, languages.
     - `experience.js` — Work experience and leadership roles.
     - `opportunities.js` — Career preferences and availability.
     - `projects.js` — Project entries, tags, links, and media paths.
     - `devlogs.js` — Research writeups and engineering devlogs.
   - All datasets must be re-exported through [`src/data/index.js`](./src/data/index.js).

5. **Assets & Media Optimization:**
   - Never use raw `.png` or `.jpg` in production components.
   - All screenshots and media must be WebP format. Run `python convert_to_webp.py <path> --remove-source` after adding new images.

---

## 2. Standard Procedures

### Adding or Modifying a Section
When adding a new section or page:
1. **Data:** Define or update the dataset in `src/data/<name>.js` and export it in `src/data/index.js`.
2. **Page:** Create `src/pages/<Name>.jsx` adhering to `.page-wrapper`, `.page-title`, and `<ScrambleText>`.
3. **App:** Mount `<section id="<name>"><Name /></section>` inside `<main className="content-container">` in `src/App.jsx`.
4. **SideNav:** Add `{ id: '<name>', label: '<label>' }` to `SECTIONS` in `src/components/SideNav.jsx`.
5. **Verify:** Run `npm run build` to confirm compilation.

### Typography & Decryption Animations
- Page titles, subtitles, and entry headers should use the `<ScrambleText>` component from `src/components/ScrambleText.jsx`.
- Stagger animation delays across items (`delay={100 + index * 50}`) to create a smooth top-to-bottom decryption effect.

---

## 3. Development & Verification Workflow

Agents must execute verification commands before completing tasks:

```bash
# 1. Verify build and bundling passes cleanly with zero errors
npm run build

# 2. Check for linting errors if applicable
npm run lint
```

If a change introduces a compilation or bundler error, diagnose and resolve it before concluding the turn.

---

## 4. Documentation Pointers

- **Architecture, component contracts & styles:** See **[CODEBASE.md](./CODEBASE.md)**.
- **Global Theme & Layout Parameters:** See [`src/config.js`](./src/config.js).
- **Global Terminal Styles & Resets:** See [`src/index.css`](./src/index.css).
