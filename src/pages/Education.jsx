import React from 'react';
import { ScrambleText } from '../components/ScrambleText';
import { EDUCATION_DATA } from '../data/education';

export function Education() {
  return (
    <div className="page-wrapper" style={{ width: 'calc(var(--total-cols) * 1ch)', margin: '4rem auto 2rem auto' }}>

      {/* Section Title */}
      <div style={{ textAlign: 'center', marginBottom: '2rem', width: '100%' }}>
        <h2 className="page-title">
          <ScrambleText text="Education" duration={200} delay={0} />
        </h2>
      </div>

      {/* Education Entries List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
        {EDUCATION_DATA.map((item, index) => (
          <div key={index} style={{ borderBottom: '1px dashed var(--muted)', paddingBottom: '1.5rem', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem', width: '100%', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h3 className="project-title" style={{ textTransform: 'uppercase' }}>
                <ScrambleText text={item.degree} duration={200} delay={100 + index * 50} />
              </h3>
              <span style={{ color: 'var(--dim)', fontSize: '0.9em', fontWeight: 'bold' }}>
                [ {item.period} ]
              </span>
            </div>
            <div style={{ textAlign: 'left', color: 'var(--primary)', fontSize: '0.95em', letterSpacing: '0.03em' }}>
              {item.institution}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
