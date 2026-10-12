import React, { useState } from 'react';
import { ScrambleText } from '../components/ScrambleText';
import { SKILL_CATEGORIES, SKILLS_DATA } from '../data/skills';

export function Skills() {
  const [expandedIds, setExpandedIds] = useState(() => new Set());

  const toggleSkill = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="page-wrapper" style={{ width: 'calc(var(--total-cols) * 1ch)', margin: '4rem auto 2rem auto' }}>

      {/* Section Title */}
      <div style={{ textAlign: 'center', marginBottom: '2rem', width: '100%' }}>
        <h2 className="page-title">
          <ScrambleText text="Skills & Technologies" duration={200} delay={0} />
        </h2>
      </div>

      {/* Categories & Skills Lists */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
        {SKILL_CATEGORIES.map((cat, catIdx) => {
          const catSkills = SKILLS_DATA.filter((s) => s.category === cat.id);
          if (catSkills.length === 0) return null;

          return (
            <div key={cat.id} style={{ borderBottom: '1px dashed var(--muted)', paddingBottom: '1.5rem', width: '100%' }}>
              
              {/* Category Header */}
              <div style={{ marginBottom: '1rem', width: '100%', textAlign: 'left' }}>
                <h3 className="project-title" style={{ textTransform: 'uppercase' }}>
                  <ScrambleText text={cat.title} duration={200} delay={100 + catIdx * 50} />
                </h3>
              </div>

              {/* Skills List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
                {catSkills.map((skill) => {
                  const hasDetails = Boolean(skill.detail || skill.context || (skill.bundledItems && skill.bundledItems.length > 0));
                  const isExpanded = hasDetails && expandedIds.has(skill.id);

                  return (
                    <div key={skill.id} style={{ width: '100%' }}>
                      {hasDetails ? (
                        <button
                          type="button"
                          onClick={() => toggleSkill(skill.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            outline: 'none',
                            padding: '0.2rem 0',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            textAlign: 'left',
                            color: isExpanded ? 'var(--primary)' : 'var(--secondary)',
                            transition: 'color 0.15s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--primary)';
                            const arrow = e.currentTarget.querySelector('.skill-arrow');
                            if (arrow) arrow.style.color = 'var(--primary)';
                            const badge = e.currentTarget.querySelector('.skill-badge');
                            if (badge) badge.style.color = 'var(--primary)';
                          }}
                          onMouseLeave={(e) => {
                            if (!isExpanded) {
                              e.currentTarget.style.color = 'var(--secondary)';
                              const arrow = e.currentTarget.querySelector('.skill-arrow');
                              if (arrow) arrow.style.color = 'var(--muted)';
                              const badge = e.currentTarget.querySelector('.skill-badge');
                              if (badge) badge.style.color = 'var(--dim)';
                            }
                          }}
                        >
                          {/* Left: Indicator & Skill Name */}
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.8ch' }}>
                            <span
                              className="skill-arrow"
                              style={{
                                color: isExpanded ? 'var(--primary)' : 'var(--muted)',
                                fontSize: '0.85em',
                                transition: 'color 0.15s ease',
                              }}
                            >
                              {isExpanded ? '▼' : '▶'}
                            </span>
                            <span style={{ fontSize: '0.95em', fontWeight: isExpanded ? 'bold' : 'normal' }}>
                              {skill.name}
                            </span>
                          </div>

                          {/* Right: Badge */}
                          <span
                            className="skill-badge"
                            style={{
                              color: isExpanded ? 'var(--primary)' : 'var(--dim)',
                              fontSize: '0.85em',
                              fontWeight: 'bold',
                              transition: 'color 0.15s ease',
                            }}
                          >
                            [ {skill.badge || skill.level} ]
                          </span>
                        </button>
                      ) : (
                        <div
                          style={{
                            padding: '0.2rem 0',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                            fontFamily: 'inherit',
                            textAlign: 'left',
                            color: 'var(--secondary)',
                          }}
                        >
                          {/* Left: Static Bullet & Skill Name */}
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.8ch' }}>
                            <span
                              style={{
                                color: 'var(--muted)',
                                fontSize: '0.85em',
                              }}
                            >
                              •
                            </span>
                            <span style={{ fontSize: '0.95em' }}>
                              {skill.name}
                            </span>
                          </div>

                          {/* Right: Badge */}
                          <span
                            style={{
                              color: 'var(--dim)',
                              fontSize: '0.85em',
                              fontWeight: 'bold',
                            }}
                          >
                            [ {skill.badge || skill.level} ]
                          </span>
                        </div>
                      )}

                      {/* Expandable Technical Detail */}
                      {hasDetails && isExpanded && (
                        <div style={{ paddingLeft: '2.5ch', paddingTop: '0.35rem', paddingBottom: '0.5rem' }}>
                          {skill.context && (
                            <div style={{ fontSize: '0.9em', color: 'var(--dim)', marginBottom: '0.25rem' }}>
                              <span style={{ color: 'var(--muted)' }}>Application: </span>
                              <span style={{ color: 'var(--secondary)' }}>{skill.context}</span>
                            </div>
                          )}
                          {skill.detail && (
                            <p className="project-desc" style={{ margin: 0, color: 'var(--dim)', fontSize: '0.92em' }}>
                              {skill.detail}
                            </p>
                          )}
                          {skill.bundledItems && skill.bundledItems.length > 0 && (
                            <div
                              style={{
                                marginTop: '0.6rem',
                                padding: '0.45rem 0.75rem',
                                border: '1px solid var(--border)',
                                background: 'rgba(255, 255, 255, 0.02)',
                                lineHeight: '1.4',
                                whiteSpace: 'normal',
                              }}
                            >
                              <div
                                style={{
                                  color: 'var(--primary)',
                                  fontSize: '0.8em',
                                  fontWeight: 'bold',
                                  marginBottom: '0.35rem',
                                  letterSpacing: '0.05em',
                                }}
                              >
                                STACK / COMPONENTS:
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8ch' }}>
                                {skill.bundledItems.map((item, bIdx) => (
                                  <span key={bIdx} style={{ color: 'var(--secondary)', fontSize: '0.85em' }}>
                                    [{item}]
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
