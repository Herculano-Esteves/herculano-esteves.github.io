import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { ScrambleText } from '../components/ScrambleText';
import SimpleBar from 'simplebar-react';

// Research & devlog dataset featuring technical specifications from Planet Game Engine
const RESEARCH_ITEMS = [
  {
    id: 'planet-game-engine',
    title: 'Planet Game Engine',
    status: 'active',
    period: '2026 - Present',
    tags: ['C++', 'OpenGL 3.3+', 'Jolt Physics'],
    summary: 'A high-performance C++ game engine engineered for universe & planet simulations, featuring double-precision Jolt Physics, OpenGL rendering, and an EnTT Entity Component System.',
    content: `
## 1. Project Overview & Objectives
Planet Game Engine is a high-performance C++ game engine specifically designed for universe-scale dynamic simulations. The primary engineering goal is to support vast coordinate spaces (planet-scale mechanics) without precision loss while maintaining high-frame-rate rendering and physics simulation.

Key architectural highlights:
- **Double-Precision World Coordinates:** Configured with double-precision floating-point scalars to eliminate precision jitter.
- **Data-Oriented Entity Component System (ECS):** Utilizing EnTT for cache-line efficient component iteration.
- **Rigid Body Dynamics:** Integrated Jolt Physics with AVX2 SIMD acceleration.

---

## 2. Technical Stack & Core Modules

### A. Physics & Dynamics Module
- **Engine Integration:** Integrated Jolt Physics with custom double-precision bindings.
- **SIMD Acceleration:** CPU vectorization using AVX2 instruction sets for rigid body contacts and broadphase queries.

### B. Graphics & Rendering Engine
- **Graphics API:** OpenGL 3.3+ renderer with embedded GLAD loader and GLFW windowing.
- **Linear Algebra:** GLM (OpenGL Mathematics) for transform matrices and vector calculations.

### C. Testing & Quality Assurance
- **Unit Testing Framework:** Built using doctest across modular test suites (Core, Physics, Voxel, World, Render, Scene).
- **Clean Architecture:** Strict clang-format code style compliance and automated CMake build pipelines.

---

## 3. Active Research & Next Steps
- Researching dynamic LOD (Level of Detail) planet surface chunking and GPU voxel mesh generation.
    `
  }
];

// Helper to format inline markdown formatting (**bold** and `code`)
function parseFormattedLine(text) {
  const parts = [];
  let currentIndex = 0;
  const regex = /(\*\*.*?\*\*|`.*?`)/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > currentIndex) {
      parts.push(text.substring(currentIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={match.index} style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code key={match.index} style={{ background: 'rgba(255,255,255,0.08)', padding: '0.1rem 0.4ch', color: 'var(--primary)' }}>
          {token.slice(1, -1)}
        </code>
      );
    }
    currentIndex = regex.lastIndex;
  }

  if (currentIndex < text.length) {
    parts.push(text.substring(currentIndex));
  }

  return parts;
}

// Lightweight Retro Terminal Markdown Component
export function DevlogMarkdown({ content }) {
  if (!content) return null;

  const lines = content.trim().split('\n');

  return (
    <div style={{ fontFamily: 'inherit', lineHeight: 1.6 }}>
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        if (trimmed.startsWith('# ')) {
          return (
            <h1 key={idx} style={{ color: 'var(--primary)', fontSize: '1.25em', marginTop: '1.5rem', marginBottom: '1rem', borderBottom: '1px dashed var(--muted)', paddingBottom: '0.5rem', letterSpacing: '0.03em' }}>
              {parseFormattedLine(trimmed.slice(2))}
            </h1>
          );
        }

        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={idx} style={{ color: 'var(--primary)', fontSize: '1.1em', marginTop: '1.4rem', marginBottom: '0.6rem' }}>
              {parseFormattedLine(trimmed.slice(3))}
            </h2>
          );
        }

        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={idx} style={{ color: 'var(--primary)', fontSize: '0.98em', marginTop: '1rem', marginBottom: '0.4rem' }}>
              {parseFormattedLine(trimmed.slice(4))}
            </h3>
          );
        }

        if (trimmed === '---') {
          return <hr key={idx} style={{ border: 'none', borderTop: '1px dashed var(--muted)', margin: '1.5rem 0' }} />;
        }

        if (trimmed.startsWith('- ')) {
          return (
            <div key={idx} style={{ color: 'var(--dim)', paddingLeft: '2ch', margin: '0.3rem 0', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--primary)' }}>•</span>
              {parseFormattedLine(trimmed.slice(2))}
            </div>
          );
        }

        if (trimmed === '') {
          return <div key={idx} style={{ height: '0.5rem' }} />;
        }

        return (
          <p key={idx} style={{ color: 'var(--dim)', margin: '0.4rem 0' }}>
            {parseFormattedLine(line)}
          </p>
        );
      })}
    </div>
  );
}

export function DevlogModal({ item, onClose }) {
  if (!item) return null;

  return createPortal(
    <div className="devlog-modal-overlay">
      <SimpleBar style={{ maxHeight: '100dvh', width: '100%' }}>
        <div style={{ width: 'calc(var(--total-cols) * 1ch)', margin: '0 auto', padding: '25vh 1.5rem 4rem 1.5rem', maxWidth: '100%' }}>

          {/* Title & Dates / Action Row (Matching Education format) */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem', width: '100%', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h3 className="project-title" style={{ textTransform: 'uppercase', fontSize: '1.2em' }}>
              {item.title}
            </h3>
            <div style={{ display: 'flex', gap: '2ch', alignItems: 'baseline' }}>
              <span style={{ color: 'var(--dim)', fontSize: '0.9em', fontWeight: 'bold' }}>
                [ {item.period} ]
              </span>
              <button onClick={onClose} className="btn-link" type="button">
                [ close ]
              </button>
            </div>
          </div>

          {/* Subtitle Line (Left Aligned, Matching Education format) */}
          <div style={{ textAlign: 'left', color: 'var(--primary)', fontSize: '0.95em', letterSpacing: '0.03em', marginBottom: '1.5rem' }}>
            Research Devlog | Status: {item.status}
          </div>

          {/* Main Devlog Content */}
          <div style={{ borderTop: '1px dashed var(--muted)', paddingTop: '1.5rem' }}>
            <DevlogMarkdown content={item.content} />
          </div>

          {/* Close Button at bottom */}
          <div style={{ marginTop: '3rem', marginBottom: '2rem', textAlign: 'center' }}>
            <button onClick={onClose} className="btn-link" type="button">
              [ close devlog ]
            </button>
          </div>

        </div>
      </SimpleBar>
    </div>,
    document.body
  );
}

export function Research() {
  const [activeDevlog, setActiveDevlog] = useState(null);

  return (
    <div className="page-wrapper" style={{ width: 'calc(var(--total-cols) * 1ch)', margin: '4rem auto 2rem auto' }}>

      {/* Section Title */}
      <div style={{ textAlign: 'center', marginBottom: '2rem', width: '100%' }}>
        <h2 className="page-title">
          <ScrambleText text="Active Research / Devlogs" duration={200} delay={0} />
        </h2>
      </div>

      {/* Research List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
        {RESEARCH_ITEMS.map((item, index) => (
          <div key={item.id} style={{ borderBottom: '1px dashed var(--muted)', paddingBottom: '1.5rem', width: '100%' }}>

            {/* Header: Title & Read Devlog Button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem', width: '100%', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1ch', flexWrap: 'wrap' }}>
                <h3 className="project-title" style={{ textTransform: 'uppercase' }}>
                  <ScrambleText text={item.title} duration={200} delay={100 + index * 50} />
                </h3>
                <span style={{ color: 'var(--secondary)', fontSize: '0.85em' }}>
                  [{item.status}]
                </span>
              </div>

              <button
                onClick={() => setActiveDevlog(item)}
                className="btn-link"
                type="button"
              >
                [ read devlog ]
              </button>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '1.5ch', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
              {item.tags.map((tag, tIdx) => (
                <span key={tIdx} style={{ color: 'var(--secondary)', fontSize: '0.85em' }}>
                  #{tag}
                </span>
              ))}
            </div>

            {/* Summary */}
            <p className="project-desc" style={{ color: 'var(--dim)', margin: 0 }}>
              {item.summary}
            </p>

          </div>
        ))}
      </div>

      {/* Devlog Reader Modal Overlay */}
      {activeDevlog && (
        <DevlogModal item={activeDevlog} onClose={() => setActiveDevlog(null)} />
      )}

    </div>
  );
}
