// Danarakca — logika permainan (tanpa Firebase, bisa diuji terpisah).
import { BASE, CARDS } from './cards.js';

export const MODAL = 100_000_000;          // modal awal Rp100 juta
export const ROUNDS_PER_STAGE = 10;        // 10 putaran (kuartal) per tahap
export const DEFAULT_FIRST_ALLOC = [0, 0, 100, 0, 0]; // tidak mengisi di tahap 1 = semua di RD Pasar Uang
export const ASSETS = [
  { key: 'sukuk', short: 'Sukuk', name: 'Sukuk/SBN', cssVar: '--c-sukuk' },
  { key: 'saham', short: 'Saham', name: 'Saham', cssVar: '--c-saham' },
  { key: 'rdpu', short: 'RDPU', name: 'RD Pasar Uang', cssVar: '--c-rdpu' },
  { key: 'emas', short: 'Emas', name: 'Emas', cssVar: '--c-emas' },
  { key: 'camp', short: 'Camp.', name: 'RD Campuran', cssVar: '--c-camp' },
];
export const CARD_BY_ID = Object.fromEntries(CARDS.map(c => [c.id, c]));

/** Imbal hasil total satu kartu per aset, dalam persen (dasar + dampak kartu). */
export function cardReturnPct(card) {
  return card.fx.map((f, i) => Math.round((BASE[i] + f) * 100) / 100);
}

/** Alokasi yang benar-benar dipakai tiap tahap (mengisi kekosongan). */
export function effectiveAllocs(alloc, stagesNeeded) {
  const out = [];
  for (let s = 1; s <= stagesNeeded; s++) {
    const a = alloc && alloc[String(s)];
    if (validAlloc(a)) out.push(a.slice());
    else out.push(s === 1 ? DEFAULT_FIRST_ALLOC.slice() : out[s - 2].slice());
  }
  return out;
}

export function validAlloc(a) {
  return Array.isArray(a) && a.length === 5 && a.every(x => Number.isInteger(x) && x >= 0 && x <= 100) &&
    a.reduce((p, q) => p + q, 0) === 100;
}

/**
 * Simulasi nilai portofolio satu peserta.
 * drawn: daftar id kartu yang sudah keluar, berurutan.
 * Hasil: history[0..n] (nilai setelah tiap putaran, history[0] = modal), positions akhir per aset, alokasi per tahap.
 */
export function simulate(alloc, drawn) {
  const n = drawn.length;
  const stagesNeeded = Math.max(1, Math.ceil(n / ROUNDS_PER_STAGE));
  const allocs = effectiveAllocs(alloc, stagesNeeded);
  const history = [MODAL];
  let value = MODAL;
  let pos = allocs[0].map(p => value * p / 100);
  for (let i = 0; i < n; i++) {
    const stage = Math.floor(i / ROUNDS_PER_STAGE) + 1;
    if (i > 0 && i % ROUNDS_PER_STAGE === 0) {           // awal tahap baru: susun ulang sesuai alokasi tahap itu
      pos = allocs[stage - 1].map(p => value * p / 100);
    }
    const card = CARD_BY_ID[drawn[i]];
    const r = cardReturnPct(card);
    pos = pos.map((x, k) => x * (1 + r[k] / 100));
    value = pos.reduce((a, b) => a + b, 0);
    history.push(value);
  }
  return { history, positions: pos, allocs, value };
}

export function maxDrawdown(history) {
  let peak = -Infinity, dd = 0;
  for (const v of history) { peak = Math.max(peak, v); dd = Math.max(dd, 1 - v / peak); }
  return dd;
}

/** Perubahan nilai per aset karena kartu terakhir (untuk layar "Dampak ke portofolio Anda"). */
export function lastCardImpact(alloc, drawn) {
  if (!drawn.length) return null;
  const before = simulate(alloc, drawn.slice(0, -1));
  const n = drawn.length;
  const allocs = effectiveAllocs(alloc, Math.ceil(n / ROUNDS_PER_STAGE));
  // posisi tepat sebelum kartu terakhir (memperhitungkan susun ulang awal tahap)
  let pos = before.positions;
  if ((n - 1) % ROUNDS_PER_STAGE === 0) pos = allocs[Math.ceil(n / ROUNDS_PER_STAGE) - 1].map(p => before.value * p / 100);
  const r = cardReturnPct(CARD_BY_ID[drawn[n - 1]]);
  const delta = pos.map((x, k) => x * r[k] / 100);
  return { delta, total: delta.reduce((a, b) => a + b, 0) };
}

/**
 * Peringkat semua peserta.
 * players: [{ key, name, alloc }]
 * Hasil diurutkan dari aset terbesar: { key, name, v, prev, ret, dd, rank, prevRank, mv }
 */
export function leaderboard(players, drawn) {
  const rows = players.map(p => {
    const sim = simulate(p.alloc, drawn);
    const h = sim.history;
    return { key: p.key, name: p.name, v: sim.value, prev: h.length > 1 ? h[h.length - 2] : h[0],
      ret: sim.value / MODAL - 1, dd: maxDrawdown(h), filled: !!(p.alloc && Object.keys(p.alloc).length) };
  });
  const byPrev = rows.slice().sort((a, b) => b.prev - a.prev || a.name.localeCompare(b.name));
  byPrev.forEach((r, i) => { r.prevRank = i + 1; });
  rows.sort((a, b) => b.v - a.v || a.name.localeCompare(b.name));
  rows.forEach((r, i) => { r.rank = i + 1; r.mv = drawn.length > 0 ? r.prevRank - r.rank : 0; });
  return rows;
}

/** Indeks tiap kelas aset (awal = 100). */
export function assetIndex(drawn) {
  const series = ASSETS.map(() => [100]);
  for (const id of drawn) {
    const r = cardReturnPct(CARD_BY_ID[id]);
    series.forEach((s, k) => s.push(s[s.length - 1] * (1 + r[k] / 100)));
  }
  return series;
}

/** Ringkasan per kelas aset untuk layar edukasi: return total, kuartal negatif, penurunan terdalam, kuartal terburuk & terbaik. */
export function assetStats(drawn) {
  const idx = assetIndex(drawn);
  return ASSETS.map((a, k) => {
    const s = idx[k];
    const q = drawn.map(id => cardReturnPct(CARD_BY_ID[id])[k]);
    return { ...a, series: s, final: s[s.length - 1], ret: s[s.length - 1] / 100 - 1,
      neg: q.filter(x => x < 0).length, worst: q.length ? Math.min(...q) : 0, best: q.length ? Math.max(...q) : 0,
      dd: maxDrawdown(s), peak: Math.max(...s), low: Math.min(...s) };
  });
}

/** Slider: geser aset i ke v. Kalau total lewat 100%, aset lain dikurangi sebanding (kelipatan 5). */
export function rebalance(vals, i, v) {
  const val = vals.slice();
  const others = [0, 1, 2, 3, 4].filter(k => k !== i);
  const prev = others.reduce((s, k) => s + val[k], 0);
  if (v + prev <= 100) { val[i] = v; return val; }
  const target = 100 - v;
  const raw = others.map(k => prev > 0 ? val[k] * target / prev : target / others.length);
  const fl = raw.map(r => Math.floor(r / 5) * 5);
  let rem = target - fl.reduce((a, b) => a + b, 0);
  const order = raw.map((r, j) => [r - fl[j], j]).sort((a, b) => b[0] - a[0]);
  for (let q = 0; rem > 0; q = (q + 1) % order.length) { fl[order[q][1]] += 5; rem -= 5; }
  val[i] = v; others.forEach((k, j) => { val[k] = fl[j]; });
  return val;
}

/** Kunci nama: huruf kecil, tanpa spasi ganda, hanya huruf/angka/strip. */
export function nameKey(name) {
  return name.trim().toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40);
}

export function cleanName(name) {
  return name.replace(/\s+/g, ' ').trim().slice(0, 24);
}

export function pickRandomCard(drawn) {
  const used = new Set(drawn);
  const left = CARDS.filter(c => !used.has(c.id));
  if (!left.length) return null;
  const buf = new Uint32Array(1);
  globalThis.crypto.getRandomValues(buf);
  return left[buf[0] % left.length].id;
}

export function simTime(round) {
  if (round <= 0) return 'Awal';
  return `Tahun ${Math.floor((round - 1) / 4) + 1} · Q${(round - 1) % 4 + 1}`;
}

export const fmtJt = (v, d = 2) => (v / 1e6).toLocaleString('id-ID', { minimumFractionDigits: d, maximumFractionDigits: d });
export const fmtPct = (x, d = 1) => (x > 0 ? '+' : x < 0 ? '−' : '') + Math.abs(x).toLocaleString('id-ID', { minimumFractionDigits: d, maximumFractionDigits: d }) + '%';
