import React, { useEffect, useState } from 'react';
import { CONFIG } from '../config';

export function SideNav({ simpleBarRef }) {
  const [activeSection, setActiveSection] = useState('home');
  const sections = CONFIG.sections;

  useEffect(() => {
    const scrollEl = simpleBarRef.current?.getScrollElement();
    if (!scrollEl) return;

    const handleScroll = () => {
      const scrollPos = scrollEl.scrollTop + window.innerHeight * 0.35;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id);
          return;
        }
      }
      setActiveSection(sections[0].id);
    };

    scrollEl.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => scrollEl.removeEventListener('scroll', handleScroll);
  }, [simpleBarRef, sections]);

  const scrollTo = (id) => {
    const target = document.getElementById(id);
    const scrollEl = simpleBarRef.current?.getScrollElement();
    if (target && scrollEl) {
      scrollEl.scrollTo({
        top: Math.max(0, target.offsetTop - 30),
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="side-nav" aria-label="Page Sections Navigation">
      <div className="side-nav-list">
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className={`side-nav-link ${isActive ? 'active' : ''}`}
              type="button"
              aria-label={`Scroll to ${sec.label} section`}
            >
              {sec.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
