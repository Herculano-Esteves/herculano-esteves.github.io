import React from 'react';
import { ScrambleText } from '../components/ScrambleText';
import { OPPORTUNITIES_DATA } from '../data/opportunities';

export function Opportunities() {
  return (
    <div className="page-wrapper" style={{ width: 'calc(var(--total-cols) * 1ch)', margin: '4rem auto 2rem auto' }}>

      {/* Section Title */}
      <div style={{ textAlign: 'center', marginBottom: '2rem', width: '100%' }}>
        <h2 className="page-title">
          <ScrambleText text="Opportunities" duration={200} delay={0} />
        </h2>
      </div>

      {/* Opportunities Entries */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
        {OPPORTUNITIES_DATA.map((item, index) => (
          <div key={index} style={{ borderBottom: '1px dashed var(--muted)', paddingBottom: '1.5rem', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem', width: '100%', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h3 className="project-title" style={{ textTransform: 'uppercase' }}>
                <ScrambleText text={item.title} duration={200} delay={100 + index * 50} />
              </h3>
              <span 
                style={{ 
                  color: item.statusVariant === 'secondary' ? 'var(--secondary)' : 'var(--dim)', 
                  fontSize: item.statusVariant === 'secondary' ? '0.85em' : '0.9em',
                  fontWeight: item.statusVariant === 'dim' ? 'bold' : 'normal'
                }}
              >
                {item.status}
              </span>
            </div>
            <p className="project-desc" style={{ color: 'var(--dim)', margin: 0 }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
