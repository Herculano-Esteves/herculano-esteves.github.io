import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { ScrambleText } from '../components/ScrambleText';
import SimpleBar from 'simplebar-react';

// Research & devlog dataset featuring active projects
const RESEARCH_ITEMS = [
  {
    id: 'planet-game-engine',
    title: 'Planet Game Engine',
    period: '2026 - Present',
    tags: ['C++', 'OpenGL 3.3+', 'Jolt Physics'],
    summary: 'A custom C++ game engine built from scratch for universe and planet-scale simulations.',
    content: `
## Overview
Building a custom C++ game engine from scratch to simulate solar systems and planet-scale environments without losing precision at large distances.

Key focus areas:
- **Double-Precision Coordinates:** Using 64-bit precision so objects move smoothly across vast planetary distances without jitter.
- **Physics & ECS:** Integrating Jolt Physics for collisions and EnTT for fast entity management.
- **Rendering & Tests:** Modern OpenGL 3.3 renderer and automated unit tests with doctest.

---

## Architectural Challenges
Traditional engines often run into floating-point issues when handling astronomical scales alongside player-scale interactions. Building the core systems directly in C++ allows full control over data memory layouts, coordinate shifts, and AVX2 vectorization specifically tailored for universe physics.

---

## What I'm Exploring Next
- Dynamic planet Level of Detail (LOD) chunking.
- GPU voxel terrain generation for seamless planet surfaces.
    `
  },
  {
    id: 'exam-preparation-platform',
    title: 'Exam Preparation Platform',
    period: '2025 - Present',
    tags: ['React', 'Open-Source'],
    summary: 'An open-source study platform designed to help university students practice and prepare for exams in any subject.',
    content: `
## Overview
An open-source web application designed to help university students study more effectively. The goal is to provide a clean, distraction-free place to practice mock tests and verify answers for any course.

Key features:
- **Universal Practice:** Modular question sets adaptable to different subjects.
- **Instant Feedback:** Timed sessions with automated scoring and answer reviews.
- **Lightweight & Private:** Fast React frontend with zero tracking.

---

## Motivation & Study Flow
Most study platforms either lack flexible question customization or clutter the experience with unnecessary paywalls. My focus is keeping this completely open and student-first: providing clean statistical feedback on weak areas, instant answer verification, and a distraction-free environment for deep practice sessions.

---

## What I'm Exploring Next
- Conducting user testing with university students to evaluate study flow and usability.
- Adding community question sharing and study deck imports.
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
        <span key={match.index} style={{ color: 'var(--primary)', fontWeight: 'normal' }}>
          {token.slice(2, -2)}
        </span>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code key={match.index} style={{ background: 'rgba(255,255,255,0.08)', padding: '0.1rem 0.4ch', color: 'var(--primary)', fontWeight: 'normal' }}>
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
            Research Devlog
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
              <h3 className="project-title" style={{ textTransform: 'uppercase' }}>
                <ScrambleText text={item.title} duration={200} delay={100 + index * 50} />
              </h3>

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
