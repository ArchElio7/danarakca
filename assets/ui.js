// Danarakca — komponen tampilan bersama.
import { ASSETS, cardReturnPct, fmtPct } from './game.js';

export const esc = s => String(s ?? '').replace(/[<>&"']/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c]));
export const $ = (sel, root = document) => root.querySelector(sel);

/* ---------- tema gelap/terang (diingat di perangkat ini) ---------- */
export function initTheme() {
  let t = 'dark';
  try { t = localStorage.getItem('danarakca-theme') || 'dark'; } catch (e) { /* abaikan */ }
  document.documentElement.dataset.ui = t;
  document.querySelectorAll('.themebtn').forEach(b => b.addEventListener('click', () => {
    const n = document.documentElement.dataset.ui === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.ui = n;
    try { localStorage.setItem('danarakca-theme', n); } catch (e) { /* abaikan */ }
  }));
}
export const THEME_ICON = `<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><g class="i-sun" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></g><path class="i-moon" d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`;

/* ---------- kartu skenario ---------- */
const K_VARS = ['--k-sukuk', '--k-saham', '--k-rdpu', '--k-emas', '--k-camp'];
export function cardHTML(card, { open = false, label = '' } = {}) {
  if (!card) return `<div class="band" style="background:#4B5B70"><span>Belum ada kartu</span></div>
    <div class="body"><h3>Menunggu kartu pertama</h3><p class="narr">Kartu skenario akan muncul di sini setelah fasilitator mengocok kartu.</p></div>`;
  const r = cardReturnPct(card);
  return `<div class="band" style="background:${card.color}"><span>${esc(card.cat)}</span><span class="right"><span class="num">${card.id}${label ? ' · ' + esc(label) : ''}</span><button type="button" class="why-btn" aria-expanded="${open}" aria-label="Lihat alasan naik dan turun tiap aset">!</button></span></div>
  <div class="body"><h3>${esc(card.title)}</h3><p class="narr">${esc(card.narr)}</p>
    <div class="reasons-wrap" ${open ? '' : 'hidden'}>
      <p class="why">${esc(card.why)}</p>
      <div class="reasons">${card.r.map((t, i) => `<div><span class="rh"><i style="background:var(${K_VARS[i]})"></i>${ASSETS[i].name}</span><span class="rv ${r[i] >= 0 ? 'k-up' : 'k-down'}">${r[i] >= 0 ? '▲' : '▼'} ${fmtPct(r[i])}</span><p>${esc(t)}</p></div>`).join('')}</div>
    </div>
    <p class="hint" ${open ? 'hidden' : ''}>Tekan tanda ! untuk melihat alasan tiap aset naik atau turun.</p></div>
  <div class="impact">${r.map((v, i) => `<div><span class="lab"><i style="background:var(${K_VARS[i]})"></i>${ASSETS[i].short}</span><span class="val ${v >= 0 ? 'k-up' : 'k-down'}">${v >= 0 ? '▲' : '▼'} ${fmtPct(v)}</span></div>`).join('')}</div>`;
}
export function wireCard(el) {
  el.addEventListener('click', e => {
    const b = e.target.closest('.why-btn'); if (!b) return;
    const open = b.getAttribute('aria-expanded') !== 'true';
    b.setAttribute('aria-expanded', String(open));
    el.querySelector('.reasons-wrap').hidden = !open;
    el.querySelector('.hint').hidden = open;
  });
}

/* ---------- grafik garis SVG (warna dari token tema) ---------- */
export function lineChart(el, series, o) {
  const W = o.w, H = o.h, pl = o.pl ?? 44, pr = o.pr ?? 16, pt = 10, pb = o.pb ?? 26;
  const entries = series.filter(s => s.values.length);
  if (!entries.length) { el.innerHTML = ''; return; }
  const all = entries.flatMap(s => s.values);
  let lo = Math.min(...all), hi = Math.max(...all);
  const span = Math.max(hi - lo, o.minSpan ?? 10);
  const step = niceStep(span / 5);
  lo = Math.floor(Math.min(lo, hi - span / 2) / step) * step; hi = Math.ceil(Math.max(hi, lo + span) / step) * step;
  const n = Math.max(...entries.map(s => s.values.length));
  const x = i => pl + (n > 1 ? i * (W - pl - pr) / (n - 1) : 0), y = v => pt + (hi - v) * (H - pt - pb) / (hi - lo || 1);
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(o.label)}">`;
  for (let v = lo; v <= hi + 1e-9; v += step) {
    s += `<line x1="${pl}" x2="${W - pr}" y1="${y(v)}" y2="${y(v)}" style="stroke:var(--g-grid)" stroke-width="1" ${Math.abs(v - (o.base ?? NaN)) < 1e-9 ? 'stroke-dasharray="4 4"' : ''}/>`;
    s += `<text x="${pl - 8}" y="${y(v) + 4}" text-anchor="end" font-size="${o.fs || 11}" style="fill:var(--g-tick)" font-family="Oxanium,monospace">${+v.toFixed(1)}</text>`;
  }
  if (o.xt) {
    const every = Math.max(1, Math.ceil((n - 1) / (o.maxTicks || 15)));
    for (let i = 0; i < n; i += every) s += `<text x="${x(i)}" y="${H - 6}" text-anchor="middle" font-size="${o.fs || 11}" style="fill:var(--g-tick)" font-family="Oxanium,monospace">${i === 0 ? 'Awal' : 'Q' + i}</text>`;
  }
  entries.forEach(sr => {
    const pts = sr.values.map((v, i) => x(i) + ',' + y(v)).join(' ');
    s += `<polyline points="${pts}" fill="none" style="stroke:var(${sr.color})" stroke-width="${sr.width || 2.5}" stroke-linejoin="round" stroke-linecap="round"/>`;
    const last = sr.values.length - 1;
    s += `<circle cx="${x(last)}" cy="${y(sr.values[last])}" r="${o.r || 4}" style="fill:var(${sr.color})"/>`;
  });
  el.innerHTML = s + '</svg>';
}
function niceStep(raw) {
  const p = Math.pow(10, Math.floor(Math.log10(raw || 1)));
  const f = raw / p;
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * p;
}

/* ---------- baris papan peringkat ---------- */
export function lbRows(rows, { cut = 0, me = '' } = {}) {
  return rows.map((r, i) => {
    const cls = [i < 3 ? 'top' : '', cut && i === cut ? 'cut' : '', r.k === me ? 'me' : ''].join(' ').trim();
    const mv = r.mv > 0 ? `<span class="up">▲${r.mv}</span>` : r.mv < 0 ? `<span class="down">▼${-r.mv}</span>` : '<span class="flat">–</span>';
    return `<tr class="${cls}"><td class="rk">${r.rank}</td><td class="mv">${mv}</td><td class="nm">${esc(r.name)}</td><td class="v rt">${(r.v / 1e6).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td><td class="r rt ${r.ret >= 0 ? 'up' : 'down'}">${fmtPct(r.ret * 100)}</td></tr>`;
  }).join('');
}

/* ---------- popup podium ---------- */
export function podiumHTML(rows) {
  const ico = i => i === 0 ? TROPHY : i === 1 ? medal(2, '#DCE3EB', '#5B6B80') : medal(3, '#E0A774', '#7A4A1E');
  const p = i => rows[i] ? `${ico(i)}<div class="who">${esc(rows[i].name)}</div><div class="amt">Rp${(rows[i].v / 1e6).toLocaleString('id-ID', { maximumFractionDigits: 2 })} jt</div>` : '<div class="who">–</div>';
  return `<div class="podium"><div class="p p2">${p(1)}<div class="block">2</div></div><div class="p p1">${p(0)}<div class="block">1</div></div><div class="p p3">${p(2)}<div class="block">3</div></div></div>`;
}

let toastT;
export function toast(text) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
  t.textContent = text; t.hidden = false;
  clearTimeout(toastT); toastT = setTimeout(() => { t.hidden = true; }, 3200);
}

export const LOGO = `<svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true"><rect width="34" height="34" rx="9" fill="#E2B33C"/><path d="M8 23 L14 16 L19 19 L26 10" stroke="#0C1F35" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

/** Hitung mundur berbasis waktu server-ish (ms epoch). */
export function startCountdown(endsAt, onTick) {
  let id;
  const tick = () => { const left = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000)); onTick(left); if (left <= 0) clearInterval(id); };
  tick(); id = setInterval(tick, 250);
  return () => clearInterval(id);
}
export function timerSVG(left, total) {
  const C = 2 * Math.PI * 70, frac = total > 0 ? left / total : 0;
  return `<svg viewBox="0 0 160 160" aria-hidden="true"><circle class="bg" cx="80" cy="80" r="70"/><circle class="fg" cx="80" cy="80" r="70" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - frac)}"/></svg><b>${left}</b>`;
}

/* ---------- ikon piala & medali ---------- */
export const TROPHY = `<svg class="pod-ico" viewBox="0 0 64 64" aria-hidden="true"><path d="M20 8h24v14a12 12 0 0 1-24 0z" fill="#E2B33C" stroke="#8A6400" stroke-width="2"/><path d="M20 12h-8v4a10 10 0 0 0 10 10M44 12h8v4a10 10 0 0 1-10 10" fill="none" stroke="#8A6400" stroke-width="3" stroke-linecap="round"/><path d="M28 34h8v8h-8z" fill="#C9971C"/><path d="M20 50h24v6H20z" fill="#8A6400"/><path d="M24 42h16v8H24z" fill="#E2B33C" stroke="#8A6400" stroke-width="2"/><path d="M27 14l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z" fill="#FFF3C4" transform="translate(5 -2) scale(.8)"/></svg>`;
export const medal = (n, fill, rim) => `<svg class="pod-ico" viewBox="0 0 64 64" aria-hidden="true"><path d="M20 4h10l6 16h-10zM44 4H34l-6 16h10z" fill="${n === 2 ? '#3B5BA9' : '#B4282E'}"/><circle cx="32" cy="38" r="18" fill="${fill}" stroke="${rim}" stroke-width="3"/><circle cx="32" cy="38" r="12" fill="none" stroke="${rim}" stroke-width="1.5" opacity=".6"/><text x="32" y="45" text-anchor="middle" font-family="Oxanium,sans-serif" font-weight="800" font-size="20" fill="${rim}">${n}</text></svg>`;

/* ---------- confetti (ringan, tanpa library) ---------- */
export function confetti(duration = 4500) {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const c = document.createElement('canvas'); c.className = 'confetti'; document.body.appendChild(c);
  const ctx = c.getContext('2d'); const dpr = window.devicePixelRatio || 1;
  const fit = () => { c.width = innerWidth * dpr; c.height = innerHeight * dpr; };
  fit(); addEventListener('resize', fit);
  const cols = ['#E2B33C', '#3FC48C', '#6EA0FF', '#FF8FA3', '#B08CFF', '#FFFFFF'];
  const parts = Array.from({ length: 180 }, () => ({ x: Math.random() * innerWidth, y: -20 - Math.random() * innerHeight * .6, w: 6 + Math.random() * 6, h: 8 + Math.random() * 8,
    vx: -1.5 + Math.random() * 3, vy: 2 + Math.random() * 3.5, r: Math.random() * 6, vr: -.2 + Math.random() * .4, c: cols[(Math.random() * cols.length) | 0] }));
  const t0 = performance.now();
  (function frame(t) {
    ctx.clearRect(0, 0, c.width, c.height);
    const fade = Math.max(0, 1 - Math.max(0, t - t0 - duration + 1200) / 1200);
    parts.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .03; p.r += p.vr;
      ctx.save(); ctx.globalAlpha = fade; ctx.translate(p.x * dpr, p.y * dpr); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.w * dpr / 2, -p.h * dpr / 2, p.w * dpr, p.h * dpr * Math.abs(Math.cos(p.r))); ctx.restore(); });
    if (t - t0 < duration) requestAnimationFrame(frame); else { c.remove(); removeEventListener('resize', fit); }
  })(t0);
}

/* ---------- cara bermain (dipakai di proyektor & HP) ---------- */
export function howtoHTML(seconds = 60, stages = 3) {
  const st = (n, col, ico, t, d) => `<li class="ht-step" style="--sc:${col}"><span class="ht-node"><span class="ht-lv">${n}</span>${ico}</span><b>${t}</b><span>${d}</span></li>`;
  const I = p => `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  return `<ol class="howto-l">
    ${st(1, 'var(--c-saham)', I('<path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>'), 'Bagi Rp100 juta', `Geser slider lima aset sampai total 100%. Waktunya ${seconds} detik.`)}
    ${st(2, '#E5484D', I('<rect x="9" y="3" width="11" height="15" rx="2"/><path d="M5 7v11a3 3 0 0 0 3 3h8"/><path d="M14.5 7.5v4M14.5 14.2v.1"/>'), 'Hadapi kartu', 'Tiap putaran = 1 kuartal. Kartu skenario mengubah nilai aset. Tekan ! untuk alasannya.')}
    ${st(3, 'var(--c-sukuk)', I('<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/>'), stages > 1 ? 'Atur ulang' : 'Pantau aset', stages > 1 ? `Setiap 10 kartu, susun ulang portofolio. Ada ${stages} tahap.` : 'Ikuti perkembangan nilai aset di HP Anda selama 10 kuartal.')}
    ${st(4, 'var(--u-gold-text)', I('<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>'), 'Aset tertinggi menang', 'Tiga besar naik podium di akhir permainan.')}
  </ol>
  <div class="ht-assets">
    ${ASSETS.map((a, i) => `<span class="ht-a" style="--ac:var(${a.cssVar})"><i></i><b>${a.name}</b><small>${['Imbalan tetap 1,75%/kuartal', 'Naik-turun tajam', 'Naik pelan, stabil', 'Pelindung saat krisis', 'Separuh saham, separuh sukuk'][i]}</small></span>`).join('')}
  </div>`;
}

/* ---------- layar edukasi: apa yang terjadi pada tiap aset ---------- */
export function eduHTML(stats, n) {
  const f1 = x => x.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const su = stats[0], sa = stats[1];
  const msg = n
    ? `Selama ${n} kuartal, <b>sukuk tidak pernah turun</b> dan naik ${fmtPct(su.ret * 100)}. <b>Saham</b> sempat ke indeks ${f1(sa.peak)} dan jatuh sampai ${f1(sa.low)}; turun di ${sa.neg} dari ${n} kuartal dan akhirnya ${fmtPct(sa.ret * 100)}.`
    : 'Belum ada kartu yang keluar.';
  return `<p class="edu-msg">${msg}</p>
  <div class="edu-grid">${stats.map(s => `<div class="edu-a" style="--ac:var(${s.cssVar})">
    <div class="edu-h"><i></i><b>${s.name}</b><span class="num ${s.ret >= 0 ? 'up' : 'down'}">${fmtPct(s.ret * 100)}</span></div>
    <dl><div><dt>Kuartal turun</dt><dd class="num">${s.neg}/${n}</dd></div><div><dt>Terburuk</dt><dd class="num ${s.worst < 0 ? 'down' : ''}">${fmtPct(s.worst)}</dd></div><div><dt>Terbaik</dt><dd class="num">${fmtPct(s.best)}</dd></div><div><dt>Penurunan terdalam</dt><dd class="num">${f1(s.dd * 100)}%</dd></div></dl>
  </div>`).join('')}</div>
  <p class="edu-foot">Pelajaran: imbal hasil tinggi selalu datang bersama risiko. Sukuk negara memberi hasil pasti dengan risiko paling rendah; saham bisa unggul, tapi bisa juga jatuh dalam. Diversifikasi membantu meredam guncangan.</p>`;
}
