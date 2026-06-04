import React from 'react';
import { TerminalGrid, Row, Center } from '../components/TerminalGrid';
import { ScrambleText } from '../components/ScrambleText';
import { CONFIG } from '../config';

export function Projects() {
  const handleClick = () => {
    window.open('https://github.com/Herculano-Esteves', '_blank', 'noopener,noreferrer');
  };

  const COLS = CONFIG.totalCols;
  const mid = 7;

  return (
    <div className="page-wrapper">
      <TerminalGrid cols={COLS}>
        {/* Page Title */}
        <Row y={mid - 1}>
          <Center>
            <h2 className="page-title">
              <ScrambleText text="Projects" duration={200} delay={0} />
            </h2>
          </Center>
        </Row>

        {/* Project Links */}
        <Row y={mid + 5}>
          <Center>
            <button onClick={handleClick} className="btn-link text-line" type="button">
              <ScrambleText text="-> github.com/Herculano-Esteves" duration={250} delay={100} />
            </button>
          </Center>
        </Row>
      </TerminalGrid>
    </div>
  );
}
