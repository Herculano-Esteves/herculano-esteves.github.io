import React from 'react';
import { ScrambleText } from '../components/ScrambleText';

export function Opportunities() {
  return (
    <div className="page-wrapper" style={{ width: 'calc(var(--total-cols) * 1ch)', margin: '4rem auto 2rem auto' }}>

      {/* Section Title */}
      <div style={{ textAlign: 'center', marginBottom: '2rem', width: '100%' }}>
        <h2 className="page-title">
          <ScrambleText text="Opportunities & Research" duration={200} delay={0} />
        </h2>
      </div>

      {/* Opportunities Entries */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>

        {/* Work */}
        <div style={{ borderBottom: '1px dashed var(--muted)', paddingBottom: '1.5rem', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem', width: '100%', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h3 className="project-title" style={{ textTransform: 'uppercase' }}>
              <ScrambleText text="Engineering & Work" duration={200} delay={100} />
            </h3>
            <span style={{ color: 'var(--secondary)', fontSize: '0.85em' }}>
              [ open to opportunities ]
            </span>
          </div>
          <p className="project-desc" style={{ color: 'var(--dim)', margin: 0 }}>
            Open to Software Engineering positions, internships, and R&D engineering projects.
          </p>
        </div>

        {/* Location */}
        <div style={{ borderBottom: '1px dashed var(--muted)', paddingBottom: '1.5rem', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem', width: '100%', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h3 className="project-title" style={{ textTransform: 'uppercase' }}>
              <ScrambleText text="Location & Availability" duration={200} delay={150} />
            </h3>
            <span style={{ color: 'var(--dim)', fontSize: '0.9em', fontWeight: 'bold' }}>
              [ Braga / Remote / Hybrid ]
            </span>
          </div>
          <p className="project-desc" style={{ color: 'var(--dim)', margin: 0 }}>
            Based in Braga, Portugal. Available for on-site, hybrid, or full remote collaboration.
          </p>
        </div>

      </div>

    </div>
  );
}
