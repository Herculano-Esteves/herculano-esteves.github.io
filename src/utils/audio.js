/**
 * audio.js — Zero-byte Web Audio API Synthesizer.
 * 
 * Synthesizes deep, satisfying vintage mechanical switch clicks (IBM Model M / Topre "thock" style).
 * Zero external audio files required.
 */

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Synthesizes a deeper, bassier mechanical switch click (low-frequency "thock").
 * Duration: ~50ms with deep resonant body tone.
 */
export function playMechanicalClick() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const duration = 0.05; // 50ms deep tactile thud

    // 1. Deep mechanical body tone (Low triangle wave)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    const filter1 = ctx.createBiquadFilter();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(100, now); // Deep base pitch
    osc1.frequency.exponentialRampToValueAtTime(32, now + duration);

    filter1.type = 'lowpass';
    filter1.frequency.setValueAtTime(450, now); // Warm lowpass cutoff

    gain1.gain.setValueAtTime(0.09, now);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(filter1);
    filter1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + duration + 0.005);

    // 2. Muted mechanical leaf snap (Lowered square wave)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    const filter2 = ctx.createBiquadFilter();

    osc2.type = 'square';
    osc2.frequency.setValueAtTime(520, now); // Lowered pitch
    osc2.frequency.exponentialRampToValueAtTime(160, now + 0.03);

    filter2.type = 'bandpass';
    filter2.frequency.setValueAtTime(850, now); // Deep acoustic cavity resonance
    filter2.Q.setValueAtTime(1.2, now);

    gain2.gain.setValueAtTime(0.04, now);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

    osc2.connect(filter2);
    filter2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.start(now);
    osc2.stop(now + 0.04);
  } catch (err) {
    // Silently ignore if audio context is blocked
  }
}

/**
 * Initializes global pointerdown listener for instantaneous click sounds on interactive buttons/links.
 */
export function initGlobalClickSound() {
  if (typeof window === 'undefined') return () => {};

  const handlePointerDown = (e) => {
    const target = e.target.closest('button, a, .project-img-item, [role="button"]');
    if (target) {
      playMechanicalClick();
    }
  };

  window.addEventListener('pointerdown', handlePointerDown, { passive: true, capture: true });

  return () => {
    window.removeEventListener('pointerdown', handlePointerDown, { capture: true });
  };
}
