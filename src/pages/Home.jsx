import React from 'react';
import { TerminalGrid, Row, Col, Center } from '../components/TerminalGrid';
import { ScrambleText } from '../components/ScrambleText';
import { CONFIG } from '../config';

export function Home() {
  const handleGithubClick = (e) => {
    e.stopPropagation();
    window.open('https://github.com/Herculano-Esteves', '_blank', 'noopener,noreferrer');
  };

  const handleProjectClick = () => {
    window.open('https://herculano-esteves.github.io/examPreparation/', '_blank', 'noopener,noreferrer');
  };

  // We define total cols to make positioning precise
  const COLS = CONFIG.totalCols;
  const mid = 7; // Fixed baseline row for name
  const rowSoftware = 12;
  const rowGithub = 14;
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

        {/* Subtitle Line */}
        <Row y={rowSoftware}>
          {/* centerCol of 70 is 35. software_engineer starts at 35 - 19 = 16 */}
          <Col x={16}>
            <span className="role">
              <ScrambleText text="software_engineer" duration={200} delay={150} />
            </span>
          </Col>
          {/* @ University of Minho starts at 35 */}
          <Col x={35}>
            <span className="school">
              <ScrambleText text="@ University of Minho" duration={250} delay={220} />
            </span>
          </Col>
        </Row>

        {/* Social Links */}
        <Row y={rowGithub}>
          <Center>
            <button onClick={handleGithubClick} className="btn-link" type="button">
              <ScrambleText text="github" duration={150} delay={300} />
            </button>
          </Center>
        </Row>

        {/* Featured Project label */}
        <Row y={rowProject}>
          {/* Centered block of width 48 starts at (70 - 48) / 2 = 11 */}
          <Col x={11}>
            <div className="project-label">
              <ScrambleText text="featured project:" duration={150} delay={350} />
            </div>
          </Col>
        </Row>

        {/* Featured Project card button spanning 2 rows */}
        <Row y={rowProject + 1} h={2}>
          <Col x={11}>
            <button onClick={handleProjectClick} className="featured-project" type="button" style={{ width: '48ch' }}>
              <div className="project-title">
                <ScrambleText text="| Exam Preparation" duration={200} delay={400} />
              </div>
              <div className="project-desc">
                <ScrambleText text="| Software engineering exam preparation platform" duration={250} delay={450} />
              </div>
            </button>
          </Col>
        </Row>
      </TerminalGrid>
    </div>
  );
}
