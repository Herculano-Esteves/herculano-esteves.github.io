import React from 'react';
import { TerminalGrid, Row, Col, Center } from '../components/TerminalGrid';
import { ScrambleText } from '../components/ScrambleText';
import { CONFIG } from '../config';

export function Home({ scrolled = false, id = "home" }) {
  const handleGithubClick = (e) => {
    e.stopPropagation();
    window.open('https://github.com/Herculano-Esteves', '_blank', 'noopener,noreferrer');
  };

  const handleLinkedinClick = (e) => {
    e.stopPropagation();
    window.open('https://www.linkedin.com/in/pedro-herculano-esteves-204573354/', '_blank', 'noopener,noreferrer');
  };

  const handleEmailClick = (e) => {
    e.stopPropagation();
    window.location.href = 'mailto:PedroHerculano@proton.me';
  };

  const handleProjectClick = () => {
    window.open('https://herculano-esteves.github.io/examPreparation/', '_blank', 'noopener,noreferrer');
  };

  const COLS = CONFIG.totalCols;
  const mid = 11; // Center anchor for Pedro Esteves
  const rowDegree = 16; // Generous distance away from Esteves (5 lines down)
  const rowSocials = 18; // Compact previous spacing (2 lines down)
  const rowProject = 21; // Compact previous spacing (3 lines down)

  return (
    <section id={id} className="page-wrapper" style={{ position: 'relative' }}>
      <TerminalGrid cols={COLS}>
        {/* Name Header */}
        <Row y={mid - 1}>
          <Center>
            <h1 className="home-name">
              <ScrambleText text="Pedro" duration={250} delay={0} />
            </h1>
          </Center>
        </Row>
        <Row y={mid}>
          <Center>
            <h1 className="home-name">
              <ScrambleText text="Esteves" duration={250} delay={80} />
            </h1>
          </Center>
        </Row>

        {/* Degree & School Subtitle */}
        <Row y={rowDegree}>
          <Center>
            <span className="school" style={{ color: 'var(--primary)' }}>
              <ScrambleText text="B.Sc. in Software Engineering @ University of Minho" duration={250} delay={180} />
            </span>
          </Center>
        </Row>

        {/* Socials Bar: github | linkedin | email (with pipe bars centered on vertical axis) */}
        <Row y={rowSocials}>
          <Center>
            <div style={{ display: 'flex', width: '36ch', alignItems: 'center' }}>
              <div style={{ flex: 1, textAlign: 'right', paddingRight: '1ch' }}>
                <button onClick={handleGithubClick} className="btn-link" type="button">
                  <ScrambleText text="github" duration={150} delay={250} />
                </button>
              </div>
              <span style={{ color: 'var(--muted)' }}>|</span>
              <div style={{ flex: 1, textAlign: 'center', paddingLeft: '1ch', paddingRight: '1ch' }}>
                <button onClick={handleLinkedinClick} className="btn-link" type="button">
                  <ScrambleText text="linkedin" duration={150} delay={280} />
                </button>
              </div>
              <span style={{ color: 'var(--muted)' }}>|</span>
              <div style={{ flex: 1, textAlign: 'left', paddingLeft: '1ch' }}>
                <button onClick={handleEmailClick} className="btn-link" type="button">
                  <ScrambleText text="email" duration={150} delay={310} />
                </button>
              </div>
            </div>
          </Center>
        </Row>

        {/* Featured Project label */}
        <Row y={rowProject}>
          {/* Centered block of width 48 starts at (70 - 48) / 2 = 11 */}
          <Col x={11}>
            <div className="project-label">
              <ScrambleText text="featured project:" duration={150} delay={330} />
            </div>
          </Col>
        </Row>

        {/* Featured Project card button spanning 2 rows */}
        <Row y={rowProject + 1} h={2}>
          <Col x={11}>
            <button onClick={handleProjectClick} className="featured-project" type="button" style={{ width: '48ch' }}>
              <div className="project-title">
                <ScrambleText text="| Exam Preparation" duration={200} delay={380} />
              </div>
              <div className="project-desc">
                <ScrambleText text="| Software engineering exam preparation platform" duration={250} delay={430} />
              </div>
            </button>
          </Col>
        </Row>
      </TerminalGrid>

      {/* Visual Scroll Down Indicator */}
      <div className={`scroll-indicator ${scrolled ? 'hidden' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem' }}>
          <span>
            <ScrambleText text="scroll" duration={200} delay={500} />
          </span>
          <span style={{ fontSize: '1.25em', lineHeight: 1 }}>↓</span>
        </div>
      </div>
    </section>
  );
}