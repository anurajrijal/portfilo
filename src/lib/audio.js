// Synthesized sound: fan/CPU hum, GPU whine, drive ticks, "zzt" on window open.
// Module-level singleton so any component can call tick()/snd()/zzt().
let AC = null;
let ON = false;
let HUM = [];
let TK = null;
let NB = null;

function noise() {
  if (!NB) {
    NB = AC.createBuffer(1, AC.sampleRate * 2, AC.sampleRate);
    const d = NB.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  const n = AC.createBufferSource();
  n.buffer = NB;
  return n;
}

export function snd(f, d, ty, v) {
  if (!ON) return;
  const t = AC.currentTime, o = AC.createOscillator(), g = AC.createGain();
  o.type = ty || 'square';
  o.frequency.value = f;
  g.gain.setValueAtTime(v || 0.03, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + d);
  o.connect(g);
  g.connect(AC.destination);
  o.start(t);
  o.stop(t + d);
}

export function tick(v, hp) {
  if (!ON) return;
  const t = AC.currentTime, n = noise(), f = AC.createBiquadFilter(), g = AC.createGain();
  f.type = 'highpass';
  f.frequency.value = hp || 2000;
  g.gain.setValueAtTime(v, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.025);
  n.connect(f);
  f.connect(g);
  g.connect(AC.destination);
  n.start(t);
  n.stop(t + 0.03);
}

export function zzt() {
  if (!ON) return;
  const t = AC.currentTime, n = noise(), f = AC.createBiquadFilter(), g = AC.createGain();
  const o = AC.createOscillator(), og = AC.createGain();
  f.type = 'bandpass';
  f.Q.value = 5;
  f.frequency.setValueAtTime(300, t);
  f.frequency.exponentialRampToValueAtTime(4500, t + 0.2);
  g.gain.setValueAtTime(0.001, t);
  g.gain.linearRampToValueAtTime(0.12, t + 0.05);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.24);
  n.connect(f);
  f.connect(g);
  g.connect(AC.destination);
  n.start(t);
  n.stop(t + 0.26);
  o.type = 'sawtooth';
  o.frequency.setValueAtTime(110, t);
  o.frequency.exponentialRampToValueAtTime(1200, t + 0.2);
  og.gain.setValueAtTime(0.015, t);
  og.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
  o.connect(og);
  og.connect(AC.destination);
  o.start(t);
  o.stop(t + 0.24);
  setTimeout(() => tick(0.05, 1200), 230);
}

function ambient() {
  const fan = noise();
  fan.loop = true;
  const bp = AC.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 450;
  bp.Q.value = 0.7;
  const fg = AC.createGain();
  fg.gain.value = 0.05;
  const lfo = AC.createOscillator(), lg = AC.createGain();
  lfo.frequency.value = 0.15;
  lg.gain.value = 120;
  lfo.connect(lg);
  lg.connect(bp.frequency);
  fan.connect(bp);
  bp.connect(fg);
  fg.connect(AC.destination);
  fan.start();
  lfo.start();

  const h = AC.createOscillator(), lp = AC.createBiquadFilter(), hg = AC.createGain();
  h.type = 'sawtooth';
  h.frequency.value = 50;
  lp.type = 'lowpass';
  lp.frequency.value = 160;
  hg.gain.value = 0.015;
  h.connect(lp);
  lp.connect(hg);
  hg.connect(AC.destination);
  h.start();

  const w = AC.createOscillator(), wg = AC.createGain();
  w.type = 'sine';
  w.frequency.value = 3100;
  wg.gain.value = 0.0025;
  w.connect(wg);
  wg.connect(AC.destination);
  w.start();

  HUM = [fan, lfo, h, w];
  (function k() {
    if (!ON) return;
    tick(0.03 + Math.random() * 0.03, 1500 + Math.random() * 2500);
    TK = setTimeout(k, 120 + Math.random() * 700);
  })();
}

/** Turn sound on/off. Must be called from a user gesture (click) the first time. */
export function setSound(on) {
  ON = on;
  if (ON) {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    AC.resume();
    ambient();
    zzt();
  } else {
    HUM.forEach((x) => {
      try { x.stop(); } catch { /* already stopped */ }
    });
    HUM = [];
    clearTimeout(TK);
  }
}
