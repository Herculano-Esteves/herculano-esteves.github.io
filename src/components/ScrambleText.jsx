import React, { useState, useEffect } from 'react';
import { CONFIG } from '../config';

export function ScrambleText({ text, duration = CONFIG.scrambleDurationMs, delay = 0, className = '' }) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let isMounted = true;
    let timeoutId = null;
    let intervalId = null;

    // Initialize with empty space or empty string so it doesn't show before delay
    setDisplayText('');

    timeoutId = setTimeout(() => {
      const startTime = Date.now();
      
      intervalId = setInterval(() => {
        const elapsed = Date.now() - startTime;
        
        if (elapsed >= duration) {
          clearInterval(intervalId);
          if (isMounted) setDisplayText(text);
        } else {
          if (isMounted) {
            // Generate scrambled text matching length of current part
            const progress = elapsed / duration;
            // Gradually resolve from left to right, or scramble everything
            const resolvedCount = Math.floor(text.length * progress);
            
            const scrambled = text.split('').map((char, index) => {
              if (index < resolvedCount) {
                return char;
              }
              if (char === ' ' || char === '\n' || char === '\t') {
                return char;
              }
              const chars = CONFIG.scrambleChars;
              return chars[Math.floor(Math.random() * chars.length)];
            }).join('');
            
            setDisplayText(scrambled);
          }
        }
      }, 30);
    }, delay);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, duration, delay]);

  return <span className={className}>{displayText}</span>;
}
