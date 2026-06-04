import React from 'react';
import { TerminalGrid, Row, Center } from '../components/TerminalGrid';
import { ScrambleText } from '../components/ScrambleText';
import { CONFIG } from '../config';

export function About() {
  const COLS = CONFIG.totalCols;
  const mid = 7;

  return (
    <div className="page-wrapper">
      <TerminalGrid cols={COLS}>
        {/* Page Title */}
        <Row y={mid - 1}>
          <Center>
            <h2 className="page-title">
              <ScrambleText text="About" duration={200} delay={0} />
            </h2>
          </Center>
        </Row>

        {/* Page Body Lines */}
        <Row y={mid + 5}>
          <Center>
            <span className="text-line">
              <ScrambleText text="Curious, systematic, always building." duration={250} delay={80} />
            </span>
          </Center>
        </Row>
        <Row y={mid + 6}>
          <Center>
            <span className="text-line dim">
              <ScrambleText text="Passionate about elegant solutions" duration={250} delay={160} />
            </span>
          </Center>
        </Row>
        <Row y={mid + 7}>
          <Center>
            <span className="text-line dim">
              <ScrambleText text="and the beauty of mathematics in code." duration={250} delay={240} />
            </span>
          </Center>
        </Row>
      </TerminalGrid>
    </div>
  );
}
