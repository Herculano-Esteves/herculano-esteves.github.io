import React from 'react';
import { TerminalGrid, Row, Col, Center } from '../components/TerminalGrid';
import { ScrambleText } from '../components/ScrambleText';
import { CONFIG } from '../config';

export function Home() {
  const handleGithubClick = (e) => {
    e.stopPropagation();
    window.open('https://github.com/Herculano-Esteves', '_blank', 'noopener,noreferrer');
  };

  const handleLinkedinClick = (e) => {
    e.stopPropagation();
    window.open('https://www.linkedin.com/in/pedro-herculano-esteves-204573354/', '_blank', 'noopener,noreferrer');
  };

  const handleProjectClick = () => {
    window.open('https://herculano-esteves.github.io/examPreparation/', '_blank', 'noopener,noreferrer');
  };

  const COLS = CONFIG.totalCols;
  const mid = 6; // Fixed baseline row for name
  const rowDegree = 12;
  const rowSocials = 14;
  const rowProject = 17;

  return (
    <div className="page-wrapper">
      <TerminalGrid cols={COLS}>
        {/* Name Header */}
        <Row y={mid - 1}>
          <Center>
            <h1 className="home-name">
              <ScrambleText text="Herculano" duration={250} delay={0} />
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

        {/* Socials Bar: github | linkedin */}
        <Row y={rowSocials}>
          <Center>
            <div style={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
              <button onClick={handleGithubClick} className="btn-link" type="button">
                <ScrambleText text="github" duration={150} delay={250} />
              </button>
              <span style={{ color: 'var(--muted)' }}>|</span>
              <button onClick={handleLinkedinClick} className="btn-link" type="button">
                <ScrambleText text="linkedin" duration={150} delay={280} />
              </button>
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
    </div>
  );
}
