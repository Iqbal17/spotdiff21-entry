// Synthesised sounds, WebAudio only — no audio files, no network. A tiny
// chime when a difference is found, a low thud on a miss, a soft tick when
// the timer runs low, and a little arpeggio when a level is cleared.

let ctx = null;

function ac() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone(freq, at, dur, type = 'sine', vol = 0.12) {
  const c = ac();
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.setValueAtTime(0, c.currentTime + at);
  g.gain.linearRampToValueAtTime(vol, c.currentTime + at + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + at + dur);
  o.connect(g).connect(c.destination);
  o.start(c.currentTime + at);
  o.stop(c.currentTime + at + dur + 0.05);
}

export const sfx = {
  find() {
    tone(660, 0, 0.18);
    tone(880, 0.09, 0.22);
    tone(1320, 0.18, 0.3);
  },
  miss() {
    tone(160, 0, 0.2, 'triangle', 0.1);
    tone(110, 0.05, 0.25, 'triangle', 0.08);
  },
  hint() {
    tone(520, 0, 0.15, 'sine', 0.08);
    tone(780, 0.08, 0.2, 'sine', 0.08);
  },
  tick() {
    tone(980, 0, 0.06, 'square', 0.04);
  },
  win() {
    [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.11, 0.35));
  },
  lose() {
    [392, 330, 262].forEach((f, i) => tone(f, i * 0.16, 0.35, 'triangle', 0.09));
  },
};
