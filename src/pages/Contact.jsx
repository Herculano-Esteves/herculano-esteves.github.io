import React from 'react';
import { TerminalGrid, Row, Center } from '../components/TerminalGrid';
import { ScrambleText } from '../components/ScrambleText';
import { CONFIG } from '../config';

export function Contact() {
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
              <ScrambleText text="Contact" duration={200} delay={0} />
            </h2>
          </Center>
        </Row>

        {/* Contact Links & Info */}
        <Row y={mid + 5}>
          <Center>
            <button onClick={handleClick} className="btn-link text-line" type="button">
              <ScrambleText text="github.com/Herculano-Esteves" duration={250} delay={80} />
            </button>
          </Center>
        </Row>
        <Row y={mid + 7}>
          <Center>
            <span className="text-line dim">
              <ScrambleText text="Open to collaborations" duration={250} delay={160} />
            </span>
          </Center>
        </Row>
        <Row y={mid + 8}>
          <Center>
            <span className="text-line dim">
              <ScrambleText text="and interesting problems." duration={250} delay={240} />
            </span>
          </Center>
        </Row>
      </TerminalGrid>
    </div>
  );
}
