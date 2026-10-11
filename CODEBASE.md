# Codebase Architecture & Reference

Welcome to the **herculano-esteves.github.io** codebase. This document serves as the comprehensive architectural reference for developers and automated AI agents modifying or extending this site.

---

## 1. Project Overview & Philosophy

This repository contains the personal portfolio of **Pedro Esteves**, hosted on GitHub Pages. 

### Core Design Philosophy
- **Monospace Terminal Aesthetic:** Layouts emulate a physical retro monospace terminal screen (character cell grid).
- **Predictable Character-Cell Geometry:** The layout width is anchored to `--total-cols` (default `70ch`) using CSS monospace character units (`ch` and `em`).
- **Data-Driven Architecture:** All displayed content (education, experience, projects, devlogs, opportunities) is strictly separated into dedicated JavaScript modules in `src/data/`.
- **Zero-Bloat Vanilla Styling:** Custom styling is written in pure CSS (`src/index.css`), synchronized dynamically with JavaScript configuration via CSS custom properties on application startup.
- **Micro-Interactions & Immersion:** Decryption typing animations via `ScrambleText` and optional CRT phosphor mask shaders.

---

## 2. Technology Stack

- **Framework:** [React 18](https://react.dev/) (Functional components, Hooks)
- **Bundler & Dev Server:** [Vite 5](https://vitejs.dev/) (`@vitejs/plugin-react`)
- **Scroll Container:** [`simplebar-react`](https://github.com/Grsmto/simplebar) (Enables uniform custom terminal scrollbars across all OS and browsers)
- **Typography:** [`@fontsource/share-tech-mono`](https://fontsource.org/fonts/share-tech-mono)
- **Image Optimization:** Python 3 + [Pillow](https://python-pillow.org/) via [`convert_to_webp.py`](./convert_to_webp.py)
- **Deployment:** GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)

---

## 3. Directory Structure

```
├── assets/                          # Static media assets
│   ├── ascii/                       # Terminal ASCII text art (drawer.txt, folder.txt)
│   └── projects/                    # Project screenshots and thumbnails (WebP only)
│       ├── entity_editor/
│       ├── exam_preparation/
│       ├── fleet_simulator/
│       └── flight_companion/
├── public/                          # Public root static files (favicon.svg, robots, etc.)
├── src/
│   ├── components/                  # Reusable UI components
│   │   ├── AssetsGallery.jsx        # Design system & asset inspector (opened via ?assets=true)
│   │   ├── KeyboardNav.jsx          # Global keyboard navigation & help cheat sheet modal
│   │   ├── ProjectImageLayout.jsx   # Project media renderer (carousel, side-by-side, 3-cols)
│   │   ├── ScrambleText.jsx         # Character decryption scramble animation
│   │   ├── SideNav.jsx              # Floating right-aligned navigation with scroll spy
│   │   └── TerminalGrid.jsx         # Character grid primitives (TerminalGrid, Row, Col, Center)
│   ├── data/                        # Decoupled content datasets
│   │   ├── devlogs.js               # In-depth engineering devlogs / active research
│   │   ├── education.js             # Degrees, institutions, specialization profiles, languages
│   │   ├── experience.js            # Work experience & leadership roles
│   │   ├── index.js                 # Central export barrel for all datasets
│   │   ├── opportunities.js         # Availability and target roles
│   │   └── projects.js              # Portfolio projects, tags, links, and image arrays
│   ├── pages/                       # Section-level page views (stacked vertically)
│   │   ├── Education.jsx            # Education & Languages section
│   │   ├── Experience.jsx           # Work Experience & Roles section
│   │   ├── Home.jsx                 # Full-height landing view (name, socials, featured project)
│   │   ├── Opportunities.jsx        # Current career status & target locations
│   │   ├── Projects.jsx             # Interactive project showcase list
│   │   └── Research.jsx             # Devlogs & engineering case studies reader
│   ├── App.jsx                      # Root container, scroll context, and section stack
│   ├── config.js                    # Centralized layout, color, and CRT configuration
│   ├── index.css                    # Global terminal styling, resets, and CSS variables
│   └── main.jsx                     # Application entry point
├── convert_to_webp.py               # Automated CLI utility for compressing images to WebP
├── run.py                           # Portable Node/npm runner wrapper
├── KEYBINDINGS.md                   # Complete reference for keyboard shortcuts & Vim controls
├── vite.config.js                   # Vite configuration
└── package.json                     # Dependencies and scripts
```

---

## 4. Core Systems & Contracts

### 4.1 Central Configuration (`src/config.js`)
All global styling and layout rules are managed centrally in `src/config.js` and propagated to CSS custom properties in `src/App.jsx`:

```javascript
export const CONFIG = {
  totalCols: 70,        // Horizontal character width of content containers
  fontSizePx: 24,       // Font size when CRT mode is active
  fontSizeNonCrtPx: 18, // Normal font size (default)
  scrambleChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%+-=',
  scrambleDurationMs: 250,
  theme: {
    bg: '#0e0e0e',
    primary: '#ffffff',
    secondary: '#cccccc',
    dim: '#aaaaaa',
    muted: '#444444',
    border: '#333333',
  }
};
```

### 4.2 Terminal Typography & The CSS Reset Rule
A critical characteristic of this codebase is the global reset in `src/index.css`:
```css
html, body, h1, h2, h3, h4, h5, h6, p, button, a, span, div {
  font-size: var(--terminal-font-size) !important;
  font-family: 'Share Tech Mono', 'Courier New', monospace !important;
  line-height: 1 !important;
}
```
> [!IMPORTANT]
> Because `line-height: 1 !important` is enforced globally to maintain character-grid alignment, any multi-line prose, paragraph, or description **must** explicitly override this using `.project-desc` or inline styles (`line-height: 1.4 !important; white-space: normal;`). Otherwise, text lines will render stacked directly on top of each other.

### 4.3 Data Layer Contracts (`src/data/`)

| Dataset | Export Name | Structure / Key Fields |
| :--- | :--- | :--- |
| `education.js` | `EDUCATION_DATA`, `LANGUAGES_DATA` | `degree`, `period`, `institution`, `specializationProfiles[]` / `language`, `level`, `certification` |
| `experience.js` | `EXPERIENCE_DATA` | `title`, `role`, `period`, `location`, `description[]` |
| `opportunities.js`| `OPPORTUNITIES_DATA` | `title`, `status`, `statusVariant` (`'secondary'` \| `'dim'`), `description` |
| `projects.js` | `PROJECTS_DATA` | `title`, `description`, `images[]`, `layout` (`'carousel'` \| `'side-by-side'` \| `'three-columns'`), `aspectRatio`, `link`, `videoUrl`, `videoThumbnail` |
| `devlogs.js` | `RESEARCH_ITEMS` | `id`, `title`, `period`, `tags[]`, `summary`, `content` (Markdown string) |

All datasets are aggregated in `src/data/index.js` for clean imports across components.

### 4.4 Section Stacking in `src/App.jsx`
All pages are rendered as sequentially stacked sections inside `<main className="content-container">`:
```jsx
<Home id="home" scrolled={scrolled} />
<section id="education"><Education /></section>
<section id="experience"><Experience /></section>
<section id="opportunities"><Opportunities /></section>
<section id="research"><Research /></section>
<section id="projects"><Projects /></section>
```

### 4.5 Floating Side Navigation (`src/components/SideNav.jsx`)
The `SideNav` component observes scrolling within the `SimpleBar` container using a vertical offset calculation (`scrollPos = scrollEl.scrollTop + window.innerHeight * 0.35`).

To add or reorder items in the side menu, update the `SECTIONS` constant in `src/components/SideNav.jsx`:
```javascript
const SECTIONS = [
  { id: 'home', label: 'home' },
  { id: 'education', label: 'education' },
  { id: 'experience', label: 'experience' },
  { id: 'opportunities', label: 'opportunities' },
  { id: 'research', label: 'devlogs' },
  { id: 'projects', label: 'projects' },
];
```

---

## 5. Development Workflows

### 5.1 Common Commands
```bash
# Start local development server
npm run dev

# Compile production bundle
npm run build

# Preview production build locally
npm run preview

# Run ESLint checks
npm run lint
```

### 5.2 Adding a New Section Checklist
When adding a new section to the site:
1. **Define Data:** Create `src/data/<section-name>.js` and export your data structure.
2. **Export Dataset:** Add `export * from './<section-name>';` in `src/data/index.js`.
3. **Create Page Component:** Add `src/pages/<SectionName>.jsx` following the `.page-wrapper` and `ScrambleText` conventions.
4. **Mount in App:** Import `<SectionName>` in `src/App.jsx` and insert `<section id="<section-id>"><SectionName /></section>`.
5. **Register in SideNav:** Add `{ id: '<section-id>', label: '<label>' }` in `src/components/SideNav.jsx`.
6. **Verify:** Run `npm run build` to ensure clean bundling without syntax or JSX errors.

### 5.3 Optimizing Media Assets
All screenshots and illustrations in `assets/` must be compressed into WebP format:
```bash
# Convert all JPG/PNG images in a directory to WebP:
python convert_to_webp.py assets/projects/<project_folder> --remove-source
```
