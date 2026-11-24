// Danarakca — musik & efek suara untuk layar proyektor.
// Semua bunyi dibuat langsung dengan Web Audio (tanpa file), komposisi orisinal bergaya chiptune ceria.

let ctx = null, master = null, musicBus = null, sfxBus = null, noiseBuf = null;
let enabled = true, wantTrack = null, curTrack = null, loopTimer = null, step = 0, nextT = 0;

/* ---------- not ---------- */
const NOTE = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
function midi(tok) {
  const m = /^([A-G])([#b]?)(\d)$/.exec(tok); if (!m) throw new Error('Not tidak dikenal: ' + tok);
  return 12 * (+m[3] + 1) + NOTE[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0);
}
const hz = n => 440 * Math.pow(2, (n - 69) / 12);
/** "C5 . E5 - |" → [{n, len} | null] per langkah 1/16; "." = diam, "-" = tahan not sebelumnya. */
function parse(str) {
  const toks = str.replace(/\|/g, ' ').trim().split(/\s+/), out = [];
  toks.forEach((t, i) => {
    if (t === '.' || t === '-') { out.push(null); return; }
    let len = 1; while (toks[i + len] === '-') len++;
    out.push({ n: midi(t), len });
  });
  return out;
}

/* ---------- lagu (orisinal) ---------- */
const TRACKS = {
  // lobi & penjelasan: riang, memantul (C – Am – F – G)
  lobby: {
    bpm: 124,
    lead: 'E5 . G5 . C6 . G5 . A5 G5 E5 . D5 . E5 . | C5 . E5 . A5 . E5 . G5 - E5 . D5 . C5 . | A4 . C5 . F5 . C5 . D5 E5 F5 . A5 . G5 . | G5 . B5 . D6 . B5 . G5 . F5 . D5 . B4 .',
    bass: 'C3 . C4 . G3 . C4 . C3 . C4 . G3 . E3 . | A2 . A3 . E3 . A3 . A2 . A3 . E3 . C3 . | F2 . F3 . C3 . F3 . F2 . F3 . C3 . A2 . | G2 . G3 . D3 . G3 . G2 . G3 . B2 . D3 .',
    arp: 'C6 E6 G6 E6 C6 E6 G6 E6 C6 E6 G6 E6 C6 E6 G6 E6 | A5 C6 E6 C6 A5 C6 E6 C6 A5 C6 E6 C6 A5 C6 E6 C6 | F5 A5 C6 A5 F5 A5 C6 A5 F5 A5 C6 A5 F5 A5 C6 A5 | G5 B5 D6 B5 G5 B5 D6 B5 G5 B5 D6 B5 G5 B5 D6 B5',
    drums: 'k.h.s.h.k.h.s.hh|k.h.s.h.k.h.s.h.|k.h.s.h.k.h.s.hh|k.h.s.h.k.k.s.ss',
  },
  // alokasi: tegang tapi tetap ceria (Am – F – Am – E)
  alloc: {
    bpm: 148,
    lead: 'E5 . E5 . F5 . E5 . D5 . E5 . C5 . B4 . | C5 . C5 . D5 . C5 . A4 . C5 . F5 . E5 . | E5 . E5 . F5 . E5 . D5 . E5 . A5 . G5 . | G#5 . . . B5 . . . E6 - - - D6 . B5 .',
    bass: 'A2 A3 A2 A3 A2 A3 A2 A3 A2 A3 A2 A3 A2 A3 A2 A3 | F2 F3 F2 F3 F2 F3 F2 F3 F2 F3 F2 F3 F2 F3 F2 F3 | A2 A3 A2 A3 A2 A3 A2 A3 A2 A3 A2 A3 A2 A3 A2 A3 | E2 E3 E2 E3 E2 E3 E2 E3 E2 E3 E2 E3 E2 E3 E2 E3',
    arp: 'A5 . C6 . E6 . C6 . A5 . C6 . E6 . C6 . | F5 . A5 . C6 . A5 . F5 . A5 . C6 . A5 . | A5 . C6 . E6 . C6 . A5 . C6 . E6 . C6 . | E5 . G#5 . B5 . G#5 . E5 . G#5 . B5 . G#5 .',
    drums: 'k.h.s.h.k.h.s.h.|k.h.s.h.k.h.s.h.|k.h.s.h.k.h.s.h.|k.h.s.h.k.s.s.ss',
  },
};
for (const t of Object.values(TRACKS)) {
  t.p = { lead: parse(t.lead), bass: parse(t.bass), arp: parse(t.arp) };
  t.d = t.drums.replace(/\|/g, '').split('');
  t.len = t.d.length;
  for (const [k, v] of Object.entries(t.p)) if (v.length !== t.len) console.error(`Panjang bagian ${k} tidak cocok: ${v.length} vs ${t.len}`);
}

/* ---------- mesin suara ---------- */
function ensure() {
  if (ctx) return true;
  const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return false;
  ctx = new AC();
  master = ctx.createGain(); master.gain.value = enabled ? 0.9 : 0; master.connect(ctx.destination);
  musicBus = ctx.createGain(); musicBus.gain.value = 0.32; musicBus.connect(master);
  sfxBus = ctx.createGain(); sfxBus.gain.value = 0.8; sfxBus.connect(master);
  noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return true;
}
/** Browser hanya mengizinkan suara setelah ada klik/ketukan di halaman. */
export function unlock() {
  if (!ensure()) return;
  if (ctx.state === 'suspended') ctx.resume();
  if (wantTrack && wantTrack !== curTrack) startLoop(wantTrack);
}
export const ready = () => !!ctx && ctx.state === 'running';

function tone(t, n, dur, { type = 'square', gain = 0.15, bus = musicBus, cutoff = 0, slideTo = null, attack = 0.005 } = {}) {
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type; o.frequency.setValueAtTime(hz(n), t);
  if (slideTo !== null) o.frequency.exponentialRampToValueAtTime(hz(slideTo), t + dur);
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(gain, t + attack);
  g.gain.exponentialRampToValueAtTime(gain * 0.55, t + Math.min(dur, 0.12));
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  let node = o;
  if (cutoff) { const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = cutoff; o.connect(f); node = f; }
  node.connect(g); g.connect(bus);
  o.start(t); o.stop(t + dur + 0.02);
}
function noise(t, dur, { gain = 0.2, type = 'highpass', freq = 7000, q = 0.8, bus = musicBus, sweepTo = null } = {}) {
  const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
  s.buffer = noiseBuf; f.type = type; f.frequency.setValueAtTime(freq, t); f.Q.value = q;
  if (sweepTo) f.frequency.exponentialRampToValueAtTime(sweepTo, t + dur);
  g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(f); f.connect(g); g.connect(bus); s.start(t); s.stop(t + dur + 0.02);
}
function kick(t, gain = 0.7, bus = musicBus) {
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = 'sine'; o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(45, t + 0.13);
  g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
  o.connect(g); g.connect(bus); o.start(t); o.stop(t + 0.2);
}
const snare = (t, gain = 0.22, bus = musicBus) => { noise(t, 0.12, { gain, type: 'bandpass', freq: 1900, q: 0.7, bus }); tone(t, 53, 0.06, { type: 'triangle', gain: gain * 0.6, bus }); };
const hat = (t, gain = 0.07) => noise(t, 0.03, { gain });

function playStep(tr, i, t, spb) {
  const L = tr.p.lead[i], B = tr.p.bass[i], A = tr.p.arp[i], D = tr.d[i];
  if (L) tone(t, L.n, L.len * spb * 0.92, { type: 'square', gain: 0.11, cutoff: 3200 });
  if (B) tone(t, B.n, B.len * spb * 0.9, { type: 'triangle', gain: 0.34 });
  if (A) tone(t, A.n, spb * 0.6, { type: 'square', gain: 0.035, cutoff: 2400 });
  if (D === 'k') kick(t); else if (D === 's') snare(t); else if (D === 'h') hat(t);
}
function startLoop(name) {
  stopLoop();
  const tr = TRACKS[name]; if (!tr || !ready()) return;
  curTrack = name; step = 0; nextT = ctx.currentTime + 0.08;
  musicBus.gain.cancelScheduledValues(ctx.currentTime); musicBus.gain.setValueAtTime(0.32, ctx.currentTime);
  loopTimer = setInterval(() => {
    const spb = 60 / tr.bpm / 4;
    while (nextT < ctx.currentTime + 0.15) { playStep(tr, step, nextT, spb); nextT += spb; step = (step + 1) % tr.len; }
  }, 25);
}
function stopLoop() { if (loopTimer) clearInterval(loopTimer); loopTimer = null; curTrack = null; }

/* ---------- API ---------- */
/** Pilih musik latar: 'lobby', 'alloc', atau null (diam). */
export function music(name) {
  wantTrack = name || null;
  if (!ctx) return;
  if (!wantTrack) { stopLoop(); return; }
  if (wantTrack !== curTrack) startLoop(wantTrack);
}
export function setEnabled(on) {
  enabled = !!on;
  if (master) master.gain.setTargetAtTime(enabled ? 0.9 : 0, ctx.currentTime, 0.05);
}
export const isEnabled = () => enabled;

const go = fn => { if (!ready()) return; fn(ctx.currentTime + 0.02); };
/** Kartu baru: desis kocok, lalu nada naik (pasar hijau) atau turun (pasar merah). */
export function card(up) {
  go(t => {
    noise(t, 0.32, { gain: 0.25, type: 'bandpass', freq: 500, sweepTo: 4000, q: 1.2, bus: sfxBus });
    const s = t + 0.32;
    if (up) [72, 76, 79, 84].forEach((n, i) => tone(s + i * 0.07, n, 0.22, { type: 'triangle', gain: 0.3, bus: sfxBus }));
    else { tone(s, 67, 0.22, { type: 'square', gain: 0.12, cutoff: 1800, bus: sfxBus }); tone(s + 0.24, 63, 0.45, { type: 'square', gain: 0.12, cutoff: 1500, slideTo: 61, bus: sfxBus }); }
  });
}
/** Detak hitung mundur 10 detik terakhir. */
export function tick(left) {
  go(t => tone(t, left <= 3 ? 88 : 81, 0.07, { type: 'square', gain: left <= 3 ? 0.14 : 0.08, cutoff: 4000, bus: sfxBus }));
}
/** Waktu alokasi habis / ditutup. */
export function buzzer() { go(t => { tone(t, 60, 0.35, { type: 'sawtooth', gain: 0.1, cutoff: 1200, bus: sfxBus }); tone(t, 67, 0.35, { type: 'sawtooth', gain: 0.08, cutoff: 1200, bus: sfxBus }); }); }
/** Tahap selesai: jingle pendek. */
export function jingle() {
  go(t => {
    [[72, 0], [76, 0.1], [79, 0.2], [84, 0.3]].forEach(([n, d]) => tone(t + d, n, 0.16, { type: 'square', gain: 0.12, cutoff: 3500, bus: sfxBus }));
    [72, 76, 79, 84].forEach(n => tone(t + 0.45, n, 0.8, { type: 'triangle', gain: 0.12, bus: sfxBus }));
    kick(t + 0.45, 0.6, sfxBus);
  });
}
/** Podium: drum roll ±2 detik lalu fanfare (pas dengan munculnya juara 1 & konfeti). */
export function fanfare() {
  go(t => {
    for (let i = 0; i < 26; i++) snare(t + i * 0.075, 0.05 + i * 0.009, sfxBus);
    const h = t + 1.95;
    kick(h, 0.9, sfxBus); noise(h, 1.4, { gain: 0.18, freq: 5000, bus: sfxBus });
    [[67, 0, 0.14], [72, 0.15, 0.14], [76, 0.3, 0.14], [79, 0.45, 0.5], [76, 0.98, 0.14], [79, 1.13, 0.9]].forEach(([n, d, l]) => tone(h + d, n, l, { type: 'square', gain: 0.14, cutoff: 3800, bus: sfxBus }));
    [60, 64, 67, 72].forEach(n => tone(h + 0.98, n, 1.2, { type: 'triangle', gain: 0.1, bus: sfxBus }));
  });
}
