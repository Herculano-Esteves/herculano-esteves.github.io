import React from 'react';
import { ScrambleText } from '../components/ScrambleText';
import { EXPERIENCE_DATA } from '../data/experience';

function parseFormattedText(text) {
  if (!text) return text;
  const parts = [];
  let currentIndex = 0;
  const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`)/g;
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
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push(
        <strong key={match.index} style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
          {token.slice(1, -1)}
        </strong>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code key={match.index} style={{ color: 'var(--primary)', fontFamily: 'inherit' }}>
          {token.slice(1, -1)}
        </code>
      );
    }
    currentIndex = regex.lastIndex;
  }

  if (currentIndex < text.length) {
    parts.push(text.substring(currentIndex));
  }

  return parts.length > 0 ? parts : text;
}

export function Experience() {
  return (
    <div className="page-wrapper" style={{ width: 'calc(var(--total-cols) * 1ch)', margin: '4rem auto 2rem auto' }}>

      {/* Section Title */}
      <div style={{ textAlign: 'center', marginBottom: '2rem', width: '100%' }}>
        <h2 className="page-title">
          <ScrambleText text="Experience" duration={200} delay={0} />
        </h2>
      </div>

      {/* Experience Entries List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
        {EXPERIENCE_DATA.map((item, index) => (
          <div key={index} style={{ borderBottom: '1px dashed var(--muted)', paddingBottom: '1.5rem', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem', width: '100%', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h3 className="project-title" style={{ textTransform: 'uppercase' }}>
                <ScrambleText text={item.title} duration={200} delay={100 + index * 50} />
              </h3>
              {!item.roles && item.period && (
                <span style={{ color: 'var(--dim)', fontSize: '0.9em', fontWeight: 'bold' }}>
                  [ {item.period} ]
                </span>
              )}
            </div>
            
            {item.roles ? (
              <div>
                {item.location && (
                  <div style={{ textAlign: 'left', color: 'var(--dim)', fontSize: '0.95em', letterSpacing: '0.03em', marginBottom: '1.25rem' }}>
                    {item.location}
                  </div>
                )}

                {/* Multi-role progression timeline */}
                <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '0.5ch' }}>
                  {item.roles.map((rItem, rIdx) => {
                    const isFirst = rIdx === 0;
                    const isLast = rIdx === item.roles.length - 1;
                    return (
                      <div
                        key={rIdx}
                        style={{
                          position: 'relative',
                          paddingLeft: '2.5ch',
                          borderLeft: isLast ? '1px dashed transparent' : '1px dashed var(--muted)',
                          paddingBottom: isLast ? 0 : '1.5rem',
                        }}
                      >
                        {/* Timeline Node Marker */}
                        <div
                          style={{
                            position: 'absolute',
                            left: '-0.5ch',
                            top: 0,
                            width: '1ch',
                            textAlign: 'center',
                            color: isFirst ? 'var(--primary)' : 'var(--dim)',
                            lineHeight: 1,
                            userSelect: 'none',
                            background: 'var(--bg)',
                          }}
                        >
                          {isFirst ? '●' : '○'}
                        </div>

                        {/* Role Header (Title + Period) */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem', width: '100%', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <span style={{ color: isFirst ? 'var(--primary)' : 'var(--secondary)', fontSize: '0.95em', letterSpacing: '0.03em', fontWeight: isFirst ? 'bold' : 'normal' }}>
                            {rItem.role}
                          </span>
                          <span style={{ color: 'var(--dim)', fontSize: '0.85em', fontWeight: 'bold' }}>
                            [ {rItem.period} ]
                          </span>
                        </div>

                        {/* Role Description */}
                        {rItem.description && Array.isArray(rItem.description) && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.4rem' }}>
                            {rItem.description.map((point, pIdx) => (
                              <div key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8ch' }}>
                                <span style={{ color: 'var(--muted)', userSelect: 'none' }}>-</span>
                                <p className="project-desc" style={{ margin: 0 }}>
                                  {parseFormattedText(point)}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>
                <div style={{ textAlign: 'left', color: 'var(--primary)', fontSize: '0.95em', letterSpacing: '0.03em', marginBottom: '0.5rem' }}>
                  <span>{item.role}</span>
                  {item.location && (
                    <span style={{ color: 'var(--dim)' }}> | {item.location}</span>
                  )}
                </div>

                {item.description && Array.isArray(item.description) && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.5rem' }}>
                    {item.description.map((point, pIdx) => (
                      <div key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8ch' }}>
                        <span style={{ color: 'var(--muted)', userSelect: 'none' }}>-</span>
                        <p className="project-desc" style={{ margin: 0 }}>
                          {parseFormattedText(point)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
