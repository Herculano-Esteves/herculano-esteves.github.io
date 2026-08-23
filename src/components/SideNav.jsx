import React, { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'home', label: 'home' },
  { id: 'education', label: 'education' },
  { id: 'opportunities', label: 'opportunities' },
  { id: 'research', label: 'devlogs' },
  { id: 'projects', label: 'projects' },
];

export function SideNav({ simpleBarRef }) {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const scrollEl = simpleBarRef.current?.getScrollElement();
    if (!scrollEl) return;

    const handleScroll = () => {
      const scrollPos = scrollEl.scrollTop + window.innerHeight * 0.35;
      
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTIONS[i].id);
          return;
        }
      }
      setActiveSection(SECTIONS[0].id);
    };

    scrollEl.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => scrollEl.removeEventListener('scroll', handleScroll);
  }, [simpleBarRef]);

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
        {SECTIONS.map((sec) => {
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
