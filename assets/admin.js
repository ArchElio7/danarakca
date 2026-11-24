// Danarakca — dashboard fasilitator (layar proyektor).
import { auth, db, signInWithEmailAndPassword, onAuthStateChanged, signOut, doc, getDoc, setDoc, updateDoc, deleteDoc,
  onSnapshot, collection, query, where, getDocs, serverTimestamp, writeBatch, errText } from './fb.js';
import { ASSETS, ROUNDS_PER_STAGE, CARD_BY_ID, simulate, leaderboard, assetIndex, assetStats, pickRandomCard, simTime, fmtJt,
  validAlloc } from './game.js';
import { initTheme, THEME_ICON, LOGO, $, esc, cardHTML, wireCard, lineChart, lbRows, podiumHTML, toast, startCountdown, timerSVG,
  howtoHTML, eduHTML, confetti } from './ui.js';
import * as snd from './sound.js';

document.querySelectorAll('.themebtn').forEach(b => { b.innerHTML = THEME_ICON; });
document.querySelectorAll('.logoSlot').forEach(s => { s.innerHTML = LOGO; });
initTheme();

/* ---------- suara (hanya di layar proyektor) ---------- */
let lastMu = null;
try { snd.setEnabled(localStorage.getItem('danarakca-sound') !== 'off'); } catch (e) { /* abaikan */ }
function updateSndBtn() {
  const b = $('#sndBtn'); if (!b) return;
  const on = snd.isEnabled(), need = on && !snd.ready();
  const spk = '<path d="M4 9h4l5-4v14l-5-4H4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>';
  const extra = !on ? '<path d="M17 9l5 6M22 9l-5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
    : need ? '<path d="M16.5 9.5a3.5 3.5 0 0 1 0 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
    : '<path d="M16.5 9.5a3.5 3.5 0 0 1 0 5M19 7a7 7 0 0 1 0 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
  b.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">${spk}${extra}</svg>`;
  b.classList.toggle('need', need);
  b.title = !on ? 'Suara mati — klik untuk menyalakan' : need ? 'Klik di mana saja untuk mengaktifkan suara' : 'Suara nyala — klik untuk mematikan';
}
function setSound(on) { snd.setEnabled(on); try { localStorage.setItem('danarakca-sound', on ? 'on' : 'off'); } catch (e) { /* abaikan */ } updateSndBtn(); }
['pointerdown', 'keydown'].forEach(ev => document.addEventListener(ev, () => { if (!remote) { snd.unlock(); setTimeout(updateSndBtn, 50); } }));

const scr = id => ['scrLogin', 'scrNotAdmin', 'scrSessions', 'scrDash', 'scrRemote'].forEach(s => { $('#' + s).hidden = s !== id; });
let user = null, sid = null, sess = null, players = [], unsub = [], busy = false;
// remote = HP fasilitator yang mengendalikan layar proyektor dari jauh
let remote = false;

/* ---------------- masuk ---------------- */
onAuthStateChanged(auth, async u => {
  user = u;
  if (!u || u.isAnonymous) { scr('scrLogin'); return; }
  await checkAdmin();
});
async function checkAdmin() {
  try {
    const a = await getDoc(doc(db, 'admins', user.uid));
    if (!a.exists()) { $('#myUid').value = user.uid; scr('scrNotAdmin'); return; }
    const q = new URLSearchParams(location.search), want = q.get('s');
    if (want) openSession(want.toUpperCase(), q.get('mode') === 'remote'); else openList();
  } catch (e) { $('#myUid').value = user.uid; scr('scrNotAdmin'); }
}
$('#loginForm').addEventListener('submit', async e => {
  e.preventDefault(); $('#loginErr').hidden = true; $('#loginBtn').disabled = true;
  try { await signInWithEmailAndPassword(auth, $('#lEmail').value.trim(), $('#lPass').value); }
  catch (err) { $('#loginErr').textContent = errText(err); $('#loginErr').hidden = false; }
  finally { $('#loginBtn').disabled = false; }
});
$('#copyUid').addEventListener('click', async () => { try { await navigator.clipboard.writeText($('#myUid').value); toast('UID disalin'); } catch (e) { $('#myUid').select(); } });
$('#recheck').addEventListener('click', checkAdmin);
$('#logout').addEventListener('click', () => signOut(auth));
$('#logout2').addEventListener('click', () => signOut(auth));

/* ---------------- daftar & buat sesi ---------------- */
async function openList() {
  stopSession(); scr('scrSessions'); history.replaceState(null, '', 'admin.html');
  const list = $('#sessList');
  try {
    const snap = await getDocs(query(collection(db, 'sessions'), where('createdBy', '==', user.uid)));
    const rows = snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
    const label = { lobby: 'Menunggu peserta', briefing: 'Penjelasan cara bermain', alloc: 'Alokasi berjalan', playing: 'Sedang main', stageEnd: 'Jeda antar-tahap', finished: 'Selesai' };
    list.innerHTML = rows.length ? rows.map(r => `<div class="sess"><div><b>${esc(r.name)}</b><small>Kode ${r.id} · ${r.stages} tahap · ${(r.drawn || []).length}/${r.stages * ROUNDS_PER_STAGE} putaran · ${label[r.status] || r.status}</small></div><span class="acts2"><button class="btn" type="button" data-del="${r.id}">Hapus</button><button class="btn" type="button" data-remote="${r.id}" title="Kendalikan dari HP">Remote</button><button class="btn btn-gold" type="button" data-open="${r.id}">Buka</button></span></div>`).join('')
      : '<p class="empty">Belum ada sesi. Buat sesi baru di atas.</p>';
  } catch (e) { list.innerHTML = `<p class="msg err">${esc(errText(e))}</p>`; }
}
$('#sessList').addEventListener('click', async e => {
  const o = e.target.closest('[data-open]'); if (o) { openSession(o.dataset.open); return; }
  const rm = e.target.closest('[data-remote]'); if (rm) { openSession(rm.dataset.remote, true); return; }
  const d = e.target.closest('[data-del]'); if (!d) return;
  if (!d.classList.contains('btn-danger')) { d.classList.add('btn-danger'); d.textContent = 'Yakin hapus?'; setTimeout(() => { if (d.isConnected) { d.classList.remove('btn-danger'); d.textContent = 'Hapus'; } }, 3000); return; }
  d.disabled = true; d.textContent = 'Menghapus…';
  try { await deleteSession(d.dataset.del); toast('Sesi dihapus'); } catch (err) { toast(errText(err)); }
  openList();
});
/** Hapus sesi beserta peserta, PIN, dan papan peringkatnya (tidak bisa dibatalkan). */
async function deleteSession(id) {
  const refs = [];
  for (const sub of ['players', 'secrets', 'public']) (await getDocs(collection(db, 'sessions', id, sub))).docs.forEach(d => refs.push(doc(db, 'sessions', id, sub, d.id)));
  for (let i = 0; i < refs.length; i += 400) { const b = writeBatch(db); refs.slice(i, i + 400).forEach(r => b.delete(r)); await b.commit(); }
  await deleteDoc(doc(db, 'sessions', id));
}
$('#newForm').addEventListener('submit', async e => {
  e.preventDefault(); $('#newErr').hidden = true;
  const name = $('#nName').value.trim().slice(0, 60) || 'Sesi Danarakca';
  const A = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789', buf = new Uint32Array(6); crypto.getRandomValues(buf);
  const id = [...buf].map(x => A[x % A.length]).join('');
  try {
    await setDoc(doc(db, 'sessions', id), { name, stages: +$('#nStages').value, allocSeconds: +$('#nSecs').value, defaultSeconds: +$('#nSecs').value,
      status: 'lobby', stage: 1, drawn: [], regOpen: true, allocOpen: false, allocStage: 1, allocOpenedAt: null,
      board: { rows: [], n: 0, at: 0 }, createdBy: user.uid, createdAt: serverTimestamp() });
    openSession(id);
  } catch (err) { $('#newErr').textContent = errText(err); $('#newErr').hidden = false; }
});

/* ---------------- dashboard sesi ---------------- */
function stopSession() { unsub.forEach(u => u()); unsub = []; sid = null; sess = null; players = []; if (stopClock) { stopClock(); stopClock = null; } if (rStopClock) { rStopClock(); rStopClock = null; } rClockKey = ''; clockKey = ''; rLastDrawn = -1; setAutoScroll(false); snd.music(null); lastSt = null; lastMu = null; }
function openSession(id, asRemote = false) {
  stopSession(); sid = id; remote = asRemote; scr(remote ? 'scrRemote' : 'scrDash');
  history.replaceState(null, '', 'admin.html?s=' + id + (remote ? '&mode=remote' : ''));
  $('#rCode').textContent = id; lastViewT = null; lastScroll = null;
  const url = new URL('play.html?s=' + id, location.href).href;
  $('#codeSmall').textContent = id; $('#urlSmall').textContent = url.replace(/^https?:\/\//, '');
  $('#lobbyCode').textContent = id; $('#lobbyUrl').textContent = new URL('play.html', location.href).href.replace(/^https?:\/\//, '');
  drawQR($('#qrSmall'), url, 96); drawQR($('#qrBig'), url, 260);
  drawQR($('#qrRemote'), new URL('admin.html?s=' + id + '&mode=remote', location.href).href);
  lastDrawn = -1; lobbyDismissed = false;
  unsub.push(onSnapshot(doc(db, 'sessions', id), s => {
    if (!s.exists()) { toast('Sesi tidak ditemukan.'); openList(); return; }
    sess = s.data({ serverTimestamps: 'estimate' }); followView(); render(); scheduleBoard();
  }, e => toast(errText(e))));
  unsub.push(onSnapshot(collection(db, 'sessions', id, 'players'), s => {
    players = s.docs.map(d => ({ key: d.id, ...d.data() })); render(); scheduleBoard();
  }, e => toast(errText(e))));
}
function drawQR(el, text) {
  try { const q = window.qrcode(0, 'M'); q.addData(text); q.make(); el.innerHTML = q.createSvgTag({ cellSize: 4, margin: 0, scalable: true }); }
  catch (e) { el.textContent = text; }
}

/* papan peringkat dihitung di sini lalu disimpan di dokumen sesi, jadi HP peserta cukup
   menerima satu kiriman per kartu (kartu + peringkat sekaligus) */
let boardTimer = null;
function boardFor(drawn) {
  const rows = leaderboard(players.map(p => ({ key: p.key, name: p.name, alloc: p.alloc })), drawn)
    .map(r => ({ k: r.key, name: r.name, v: Math.round(r.v), ret: +r.ret.toFixed(5), mv: r.mv, rank: r.rank, dd: +r.dd.toFixed(4) }));
  return { rows, n: drawn.length, at: Date.now() };
}
const boardSig = b => b ? b.n + '|' + (b.rows || []).map(r => [r.k, r.name, r.v, r.rank, r.mv, r.ret, r.dd].join(',')).join(';') : '';
function scheduleBoard() { if (remote) return; clearTimeout(boardTimer); boardTimer = setTimeout(writeBoard, 700); }
async function writeBoard() {
  if (!sess || !sid) return;
  const b = boardFor(sess.drawn || []);
  if (boardSig(b) === boardSig(sess.board)) return;     // tidak ada perubahan → tidak menulis
  try { await upd({ board: b }); }
  catch (e) { toast('Gagal memperbarui peringkat: ' + errText(e)); }
}

let lastSt = null, lastTick = 0, fanfareT = null;
let lastDrawn = -1, lobbyDismissed = false, stopClock = null, clockKey = '', podiumDismissed = false, lastViewT = null, lastScroll = null;
wireCard($('#pjCard'));
const teamVars = ['--t1', '--t2', '--t3', '--t4', '--t5', '--t6'];

function render() {
  if (!sess) return;
  if (remote) { renderRemote(); return; }
  const drawn = sess.drawn || [], n = drawn.length, total = sess.stages * ROUNDS_PER_STAGE;
  const st = sess.status, stage = sess.stage || 1;
  $('#kRound').textContent = n; $('#kRoundTot').textContent = '/ ' + total;
  $('#kTime').textContent = simTime(n);
  $('#kStage').textContent = stage; $('#kStageTot').textContent = 'dari ' + sess.stages;
  $('#kPlayers').textContent = players.length;
  const filled = players.filter(p => validAlloc(p.alloc && p.alloc[String(sess.allocStage || 1)])).length;
  $('#kAlloc').textContent = (st === 'alloc' || st === 'lobby' || st === 'playing') && players.length ? `Alokasi tahap ${sess.allocStage || 1}: ${filled}/${players.length}` : '';
  $('#mReg').textContent = sess.regOpen ? 'Tutup pendaftaran' : 'Buka pendaftaran lagi';
  $('#mPodium').hidden = st !== 'finished';
  $('#stVal').textContent = sess.stages;
  $('#stVal2').textContent = sess.stages;
  $('#stMinus').disabled = $('#stMinus2').disabled = sess.stages <= Math.max(1, stage); $('#stPlus').disabled = $('#stPlus2').disabled = sess.stages >= 5;
  $('#podMore').hidden = !(st === 'finished' && n >= stage * ROUNDS_PER_STAGE && sess.stages < 5);

  // tombol utama sesuai fase
  const mb = $('#mainBtn');
  if (st === 'lobby') { mb.textContent = 'Lanjut: Cara bermain'; mb.disabled = false; }
  else if (st === 'briefing') { mb.textContent = 'Mulai Alokasi Tahap 1'; mb.disabled = false; }
  else if (st === 'alloc') { mb.textContent = 'Tutup Alokasi'; mb.disabled = false; }
  else if (st === 'playing') { mb.textContent = `Kocok Kartu (${n + 1})`; mb.disabled = busy || n >= stage * ROUNDS_PER_STAGE; }
  else if (st === 'stageEnd') { mb.textContent = 'Lanjut / Akhiri'; mb.disabled = false; }
  else { mb.textContent = 'Tampilkan Podium'; mb.disabled = false; }
  $('#undoBtn').disabled = !n || st === 'alloc' || n <= (stage - 1) * ROUNDS_PER_STAGE;   // tidak bisa membatalkan ke tahap sebelumnya

  // kartu
  if (n !== lastDrawn) {
    const card = n ? CARD_BY_ID[drawn[n - 1]] : null;
    $('#pjCard').innerHTML = cardHTML(card, { label: n ? `Kartu ${n} / ${total}` : '' });
    if (lastDrawn >= 0 && n > lastDrawn) { $('#pjCard').classList.remove('flip'); void $('#pjCard').offsetWidth; $('#pjCard').classList.add('flip'); snd.card(card.fx[1] >= 0); }
    lastDrawn = n;
    $('#hist').innerHTML = n > 1 ? drawn.slice(0, -1).slice(-5).reverse().map((id, i) => { const c = CARD_BY_ID[id]; const s = c.fx[1]; return `<div><span class="q">Q${n - 1 - i}</span><span>${c.id} · ${esc(c.title)}</span><span class="s ${s >= 0 ? 'up' : 'down'}">Saham ${s > 0 ? '+' : '−'}${Math.abs(s)}%</span></div>`; }).join('') : '<p class="empty">Belum ada.</p>';
  }

  // peringkat & grafik
  const rows = leaderboard(players.map(p => ({ key: p.key, name: p.name, alloc: p.alloc })), drawn);
  $('#lbCount').textContent = players.length + ' peserta';
  $('#lbBody').innerHTML = rows.length ? lbRows(rows.map(r => ({ ...r, k: r.key })), { cut: 10 }) : '<tr><td colspan="5" class="empty">Belum ada peserta. Tampilkan QR agar peserta bergabung.</td></tr>';
  const top = rows.slice(0, 6);
  lineChart($('#teamChart'), top.map((r, i) => { const p = players.find(x => x.key === r.key); return { values: simulate(p.alloc, drawn).history.map(v => v / 1e6), color: teamVars[i], width: i === 0 ? 4 : 2.5 }; }),
    { w: 720, h: 210, label: 'Nilai portofolio 6 peserta teratas', xt: true, fs: 12, base: 100 });
  $('#teamKey').innerHTML = top.map((r, i) => `<span><i style="background:var(${teamVars[i]})"></i>${esc(r.name)}</span>`).join('');
  const idx = assetIndex(drawn);
  lineChart($('#assetChart'), idx.map((v, i) => ({ values: v, color: ASSETS[i].cssVar, width: i < 2 ? 3.5 : 2 })), { w: 720, h: 360, label: 'Indeks lima kelas aset', xt: true, fs: 12, base: 100 });
  if (!$('#popEdu').hidden) renderEdu();
  $('#assetKey').innerHTML = ASSETS.map((a, i) => `<span><i style="background:var(${a.cssVar})"></i>${a.name} <b>${idx[i][idx[i].length - 1].toLocaleString('id-ID', { maximumFractionDigits: 1 })}</b></span>`).join('');

  renderPopups(rows, filled);
  // musik latar & efek peralihan fase
  if (st !== lastSt) {
    if (lastSt !== null) { if (lastSt === 'alloc') snd.buzzer(); if (st === 'stageEnd') snd.jingle(); }
    if (st === 'lobby' || st === 'briefing') snd.music('lobby');
    else if (st === 'alloc') snd.music('alloc');
    else if (st !== 'finished') snd.music(null);
    lastSt = st;
  }
  if (typeof sess.mu === 'boolean' && sess.mu !== lastMu) { lastMu = sess.mu; setSound(sess.mu); }
  updateSndBtn();
}

/* ---------------- popup per fase ---------------- */
function renderPopups(rows, filled) {
  const st = sess.status;
  // lobi
  $('#popLobby').hidden = !(st === 'lobby' && !lobbyDismissed) && !showJoin;
  $('#lobbyOpen').hidden = st !== 'lobby';
  // cara bermain
  $('#popHowto').hidden = !(st === 'briefing' || showHowto);
  if (!$('#popHowto').hidden) { $('#howtoBody').innerHTML = howtoHTML(sess.defaultSeconds || 60, sess.stages); $('#howtoStart').hidden = st !== 'briefing'; $('#howtoBack').textContent = st === 'briefing' ? 'Kembali ke QR' : 'Tutup'; }
  $('#lobbyCount').textContent = players.length;
  $('#lobbyNames').innerHTML = players.slice().sort((a, b) => (a.name > b.name ? 1 : -1)).map(p => `<span>${esc(p.name)}<button type="button" data-kick="${p.key}" aria-label="Keluarkan ${esc(p.name)}">×</button></span>`).join('');
  // alokasi
  const allocOn = st === 'alloc';
  $('#popAlloc').hidden = !allocOn;
  if (allocOn) {
    $('#allocTitle').textContent = 'Alokasi Tahap ' + sess.allocStage;
    $('#allocDone').textContent = filled; $('#allocTotal').textContent = players.length;
    const opened = sess.allocOpenedAt && sess.allocOpenedAt.toMillis ? sess.allocOpenedAt.toMillis() : Date.now();
    const k = sess.allocStage + ':' + opened + ':' + sess.allocSeconds;
    if (k !== clockKey) {
      clockKey = k; if (stopClock) stopClock();
      const ends = opened + sess.allocSeconds * 1000;
      stopClock = startCountdown(ends, left => {
        $('#timer').innerHTML = timerSVG(left, sess.allocSeconds); $('#timer').classList.toggle('low', left <= 10);
        if (left > 0 && left <= 10 && left !== lastTick) { lastTick = left; snd.tick(left); } else if (left > 10) lastTick = 0;
        if (left <= 0) setTimeout(() => { if (sess && sess.status === 'alloc' && clockKey === k) closeAlloc(); }, 1200);
      });
    }
  } else if (stopClock) { stopClock(); stopClock = null; clockKey = ''; }
  // tahap selesai
  $('#popStage').hidden = st !== 'stageEnd';
  if (st === 'stageEnd') {
    $('#stageTitle').textContent = `Tahap ${sess.stage} selesai!`;
    $('#stageTop3').innerHTML = rows.slice(0, 3).map(r => `<div><span>${r.rank}. ${esc(r.name)}</span><span class="num">Rp${fmtJt(r.v)} jt</span></div>`).join('') || '<div>Belum ada peserta</div>';
    $('#stageQ').textContent = `Lanjut ke tahap ${sess.stage + 1}? Peserta akan mendapat ${sess.defaultSeconds || 60} detik untuk menyusun ulang portofolio. Jumlah tahap masih bisa diubah di bawah.`;
  }
  // podium
  if (st === 'finished' && !podiumDismissed) {
    const was = $('#popPodium').hidden; $('#podium').innerHTML = podiumHTML(rows); $('#popPodium').hidden = false;
    if (was) {
      setTimeout(() => confetti(), 2000);
      snd.music(null); snd.fanfare(); clearTimeout(fanfareT);
      fanfareT = setTimeout(() => { if (sess && sess.status === 'finished') snd.music('lobby'); }, 4200);
    }
  }
  if (st !== 'finished') { $('#popPodium').hidden = true; podiumDismissed = false; }
}
let showJoin = false, showHowto = false;
$('#lobbyHide').addEventListener('click', () => { lobbyDismissed = true; showJoin = false; render(); });
$('#mJoin').addEventListener('click', () => { showJoin = true; closeMenu(); render(); });
$('#podClose').addEventListener('click', () => { podiumDismissed = true; $('#popPodium').hidden = true; });
$('#mPodium').addEventListener('click', () => { podiumDismissed = false; closeMenu(); render(); });
$('#lobbyNames').addEventListener('click', async e => {
  const b = e.target.closest('[data-kick]'); if (!b) return;
  if (!b.classList.contains('sure')) { b.classList.add('sure'); b.textContent = 'Keluarkan?'; setTimeout(() => { if (b.isConnected) { b.classList.remove('sure'); b.textContent = '×'; } }, 3000); return; }
  const k = b.dataset.kick;
  try { const bt = writeBatch(db); bt.delete(doc(db, 'sessions', sid, 'players', k)); bt.delete(doc(db, 'sessions', sid, 'secrets', k)); await bt.commit(); toast('Peserta dikeluarkan'); }
  catch (err) { toast(errText(err)); }
});

/* ---------------- aksi fasilitator ---------------- */
const upd = data => updateDoc(doc(db, 'sessions', sid), data);
async function openAlloc(stage) {
  showHowto = false;
  await upd({ status: 'alloc', stage, allocStage: stage, allocOpen: true, allocOpenedAt: serverTimestamp(), allocSeconds: sess.defaultSeconds || 60 });
  lobbyDismissed = true; showJoin = false;
}
async function closeAlloc() {
  const data = { status: 'playing', allocOpen: false };
  if (sess.allocStage === 1) data.regOpen = false;     // peserta baru tidak bisa masuk setelah permainan mulai
  try { await upd(data); } catch (e) { toast(errText(e)); }
}
async function drawCard() {
  if (busy) return;
  const drawn = sess.drawn || [], stage = sess.stage || 1;
  if (drawn.length >= stage * ROUNDS_PER_STAGE) return;
  const id = pickRandomCard(drawn); if (!id) { toast('Kartu habis.'); return; }
  const next = [...drawn, id];
  let status = 'playing';
  if (next.length === stage * ROUNDS_PER_STAGE) status = stage >= sess.stages ? 'finished' : 'stageEnd';
  busy = true; render();
  try { await upd({ drawn: next, status, board: boardFor(next) }); buzz(); }
  catch (e) { toast(errText(e)); }
  finally { setTimeout(() => { busy = false; render(); }, 1200); }
}
$('#mainBtn').addEventListener('click', async () => {
  const st = sess.status;
  try {
    if (st === 'lobby') { await upd({ status: 'briefing' }); lobbyDismissed = true; showJoin = false; }
    else if (st === 'briefing') await openAlloc(1);
    else if (st === 'alloc') await closeAlloc();
    else if (st === 'playing') await drawCard();
    else if (st === 'stageEnd') { $('#popStage').hidden = false; }
    else { podiumDismissed = false; render(); }
  } catch (e) { toast(errText(e)); }
});
$('#lobbyOpen').addEventListener('click', () => upd({ status: 'briefing' }).then(() => { lobbyDismissed = true; showJoin = false; }).catch(e => toast(errText(e))));
$('#howtoStart').addEventListener('click', () => openAlloc(1).catch(e => toast(errText(e))));
$('#howtoBack').addEventListener('click', () => { if (sess.status === 'briefing') { lobbyDismissed = false; upd({ status: 'lobby' }).catch(e => toast(errText(e))); } showHowto = false; render(); });
$('#mHowto').addEventListener('click', () => { closeMenu(); showHowto = true; render(); });
/* pelajaran: indeks aset layar penuh */
function renderEdu() {
  const drawn = sess.drawn || [], st = assetStats(drawn);
  lineChart($('#eduChart'), st.map((a, i) => ({ values: a.series, color: a.cssVar, width: i < 2 ? 4 : 2.5 })), { w: 1100, h: 380, label: 'Indeks lima kelas aset selama permainan', xt: true, fs: 13, base: 100 });
  $('#eduKey').innerHTML = st.map(a => `<span><i style="background:var(${a.cssVar})"></i>${a.name} <b>${a.final.toLocaleString('id-ID', { maximumFractionDigits: 1 })}</b></span>`).join('');
  $('#eduBody').innerHTML = eduHTML(st, drawn.length);
}
const openEdu = () => { closeMenu(); renderEdu(); $('#popEdu').hidden = false; };
$('#eduBtn').addEventListener('click', e => { e.stopPropagation(); openEdu(); });
$('#assetPanel').addEventListener('click', openEdu);
$('#mEdu').addEventListener('click', openEdu);
$('#podEdu').addEventListener('click', () => { podiumDismissed = true; $('#popPodium').hidden = true; openEdu(); });
$('#eduClose').addEventListener('click', () => { $('#popEdu').hidden = true; });
/* ubah jumlah tahap saat permainan berjalan */
async function setStages(nv) {
  const stage = sess.stage || 1, n = (sess.drawn || []).length, st = sess.status;
  if (nv < stage || nv > 5) return;
  const data = { stages: nv };
  const stageDone = n >= stage * ROUNDS_PER_STAGE;
  if (stageDone && (st === 'finished' || st === 'stageEnd')) data.status = nv > stage ? 'stageEnd' : 'finished';
  try { await upd(data); buzz(); toast(`Jumlah tahap: ${nv}`); } catch (e) { toast(errText(e)); }
}
$('#stMinus').addEventListener('click', e => { e.stopPropagation(); setStages(sess.stages - 1); });
$('#stPlus').addEventListener('click', e => { e.stopPropagation(); setStages(sess.stages + 1); });
$('#stMinus2').addEventListener('click', () => setStages(sess.stages - 1));
$('#stPlus2').addEventListener('click', () => setStages(sess.stages + 1));
$('#podMore').addEventListener('click', () => { podiumDismissed = false; setStages(sess.stages + 1); });
$('#closeAlloc').addEventListener('click', closeAlloc);
$('#plus30').addEventListener('click', () => upd({ allocSeconds: (sess.allocSeconds || 60) + 30 }).catch(e => toast(errText(e))));
$('#stageNext').addEventListener('click', () => openAlloc((sess.stage || 1) + 1).catch(e => toast(errText(e))));
$('#stageEnd').addEventListener('click', () => upd({ status: 'finished' }).catch(e => toast(errText(e))));
async function undoLast() {
  const b = $('#undoBtn');
  const rb = $('#rUndo');
  if (!b.classList.contains('btn-danger')) { b.classList.add('btn-danger'); rb.classList.add('btn-danger'); b.textContent = rb.textContent = 'Yakin batalkan kartu?'; setTimeout(() => { b.classList.remove('btn-danger'); rb.classList.remove('btn-danger'); b.textContent = 'Batalkan'; rb.textContent = 'Batalkan kartu terakhir'; }, 3000); return; }
  b.classList.remove('btn-danger'); rb.classList.remove('btn-danger'); b.textContent = 'Batalkan'; rb.textContent = 'Batalkan kartu terakhir';
  const drawn = (sess.drawn || []).slice(0, -1);
  // tahap tetap sama; kalau kartu penutup tahap dibatalkan, permainan kembali ke posisi "sedang main"
  try { await upd({ drawn, status: 'playing', board: boardFor(drawn) }); toast('Kartu terakhir dibatalkan'); buzz(); }
  catch (e) { toast(errText(e)); }
}
$('#undoBtn').addEventListener('click', undoLast);

/* menu */
function closeMenu() { $('#menuList').hidden = true; $('#menuBtn').setAttribute('aria-expanded', 'false'); }
$('#menuBtn').addEventListener('click', () => { const o = $('#menuList').hidden; $('#menuList').hidden = !o; $('#menuBtn').setAttribute('aria-expanded', String(o)); });
document.addEventListener('click', e => { if (!e.target.closest('.menu')) closeMenu(); });
$('#mReg').addEventListener('click', () => { closeMenu(); upd({ regOpen: !sess.regOpen }).then(() => toast(sess.regOpen ? 'Pendaftaran ditutup' : 'Pendaftaran dibuka')).catch(e => toast(errText(e))); });
$('#mEnd').addEventListener('click', () => {
  const b = $('#mEnd');
  if (b.dataset.sure !== '1') { b.dataset.sure = '1'; b.textContent = 'Klik lagi untuk mengakhiri'; setTimeout(() => { b.dataset.sure = ''; b.textContent = 'Akhiri permainan sekarang'; }, 3000); return; }
  closeMenu(); upd({ status: 'finished', allocOpen: false }).catch(e => toast(errText(e)));
});
$('#mBack').addEventListener('click', () => { closeMenu(); openList(); });

/* gulir otomatis papan peringkat (untuk proyektor) */
let scrollT = null;
function setAutoScroll(on) {
  const b = $('#autoScroll'), sc = $('#lbScroll');
  if (!on) { if (scrollT) clearInterval(scrollT); scrollT = null; b.setAttribute('aria-pressed', 'false'); b.textContent = 'Gulir otomatis'; return; }
  if (scrollT) return;
  b.setAttribute('aria-pressed', 'true'); b.textContent = 'Berhenti';
  let pause = 0;
  scrollT = setInterval(() => { if (pause > 0) { pause--; if (pause === 0) sc.scrollTop = 0; return; } if (sc.scrollTop + sc.clientHeight >= sc.scrollHeight - 1) { pause = 60; return; } sc.scrollTop += 1; }, 35);
}
$('#autoScroll').addEventListener('click', () => setAutoScroll(!scrollT));
$('#sndBtn').addEventListener('click', () => { if (snd.isEnabled() && !snd.ready()) { snd.unlock(); setTimeout(updateSndBtn, 50); return; } setSound(!snd.isEnabled()); });
$('#rMusic').addEventListener('click', () => upd({ mu: !(sess.mu ?? true) }).then(buzz).catch(e => toast(errText(e))));

/* ---------------- proyektor mengikuti perintah dari remote ---------------- */
// sess.pv = { s: 'dash'|'join'|'howto'|'edu'|'podium', t } · sess.ps = gulir otomatis (true/false)
function followView() {
  if (remote) return;
  const pv = sess.pv;
  if (pv && pv.t !== lastViewT) {
    const first = lastViewT === null; lastViewT = pv.t;
    if (!(first && Date.now() - pv.t > 6 * 3600e3)) applyView(pv.s);   // perintah lama (>6 jam) diabaikan saat halaman dibuka ulang
  }
  if (typeof sess.ps === 'boolean' && sess.ps !== lastScroll) { lastScroll = sess.ps; setAutoScroll(sess.ps); }
}
function applyView(s) {
  showJoin = s === 'join'; showHowto = s === 'howto'; podiumDismissed = s !== 'podium';
  if (s === 'dash' || s === 'edu' || s === 'podium') lobbyDismissed = true;
  closeMenu();
  if (s === 'edu') { renderEdu(); $('#popEdu').hidden = false; } else $('#popEdu').hidden = true;
}
const buzz = () => { try { if (remote && navigator.vibrate) navigator.vibrate(30); } catch (e) { /* abaikan */ } };
const VIEW_NAME = { dash: 'Dashboard', join: 'QR gabung', howto: 'Cara bermain', edu: 'Pelajaran aset', podium: 'Podium' };
const setView = s => upd({ pv: { s, t: Date.now() } }).then(() => { buzz(); toast('Proyektor: ' + VIEW_NAME[s]); }).catch(e => toast(errText(e)));

/* ---------------- tampilan remote (HP fasilitator) ---------------- */
let rLastDrawn = -1, rClockKey = '', rStopClock = null;
wireCard($('#rCard'));
function renderRemote() {
  const drawn = sess.drawn || [], n = drawn.length, total = sess.stages * ROUNDS_PER_STAGE;
  const st = sess.status, stage = sess.stage || 1;
  const filled = players.filter(p => validAlloc(p.alloc && p.alloc[String(sess.allocStage || 1)])).length;
  $('#rName').textContent = sess.name || 'Sesi';
  $('#rRound').textContent = n; $('#rRoundTot').textContent = '/ ' + total; $('#rTime').textContent = simTime(n);
  $('#rStage').textContent = stage; $('#rStageTot').textContent = 'dari ' + sess.stages;
  $('#rPlayers').textContent = players.length;
  $('#rAlloc').textContent = `${filled}/${players.length}`;
  $('#rAllocLab').textContent = 'tahap ' + (sess.allocStage || 1);
  if (n !== rLastDrawn) {
    const card = n ? CARD_BY_ID[drawn[n - 1]] : null;
    $('#rCard').innerHTML = cardHTML(card, { label: n ? `${n} / ${total}` : '' });
    if (rLastDrawn >= 0 && n > rLastDrawn) { $('#rCard').classList.remove('flip'); void $('#rCard').offsetWidth; $('#rCard').classList.add('flip'); }
    rLastDrawn = n;
  }
  // fase
  const hint = $('#rHint'), main = $('#rMain'), sec = $('#rSec');
  let secHTML = '';
  $('#rTimerBox').hidden = st !== 'alloc';
  if (st === 'lobby') { hint.textContent = `Proyektor menampilkan QR. ${players.length} peserta sudah bergabung.`; main.textContent = 'Lanjut: Cara bermain'; main.disabled = false; }
  else if (st === 'briefing') { hint.textContent = 'Proyektor & HP peserta menampilkan cara bermain. Jelaskan dulu, lalu mulai.'; main.textContent = 'Mulai alokasi tahap 1'; main.disabled = false; secHTML = '<button class="btn" type="button" data-act="toLobby">Kembali ke QR</button>'; }
  else if (st === 'alloc') { hint.textContent = `Peserta sedang menyusun portofolio tahap ${sess.allocStage}.`; main.textContent = 'Tutup alokasi sekarang'; main.disabled = false; secHTML = '<button class="btn" type="button" data-act="plus30">+30 detik</button>'; }
  else if (st === 'playing') { const left = stage * ROUNDS_PER_STAGE - n; hint.textContent = `Tahap ${stage} · sisa ${left} kartu di tahap ini.`; main.textContent = `Kocok Kartu (${n + 1})`; main.disabled = busy || left <= 0; }
  else if (st === 'stageEnd') { hint.textContent = `Tahap ${stage} selesai. Lanjut atau akhiri?`; main.textContent = `Lanjut ke tahap ${stage + 1}`; main.disabled = false; secHTML = '<button class="btn" type="button" data-act="finish">Akhiri permainan</button>'; }
  else { hint.textContent = 'Permainan selesai.'; main.textContent = 'Tampilkan podium'; main.disabled = false; secHTML = '<button class="btn" type="button" data-view="edu">Tampilkan pelajaran</button>' + (sess.stages < 5 ? '<button class="btn" type="button" data-act="more">Tambah 1 tahap</button>' : ''); }
  if (sec.dataset.sig !== secHTML) { sec.innerHTML = secHTML; sec.dataset.sig = secHTML; }
  $('#rUndo').disabled = !n || st === 'alloc' || n <= (stage - 1) * ROUNDS_PER_STAGE;
  // timer
  if (st === 'alloc') {
    const opened = sess.allocOpenedAt && sess.allocOpenedAt.toMillis ? sess.allocOpenedAt.toMillis() : Date.now();
    const k = sess.allocStage + ':' + opened + ':' + sess.allocSeconds;
    if (k !== rClockKey) {
      rClockKey = k; if (rStopClock) rStopClock();
      rStopClock = startCountdown(opened + sess.allocSeconds * 1000, left => {
        $('#rTimer').innerHTML = timerSVG(left, sess.allocSeconds); $('#rTimer').classList.toggle('low', left <= 10);
        if (left <= 0) setTimeout(() => { if (sess && sess.status === 'alloc' && rClockKey === k) closeAlloc(); }, 2500);
      });
    }
  } else if (rStopClock) { rStopClock(); rStopClock = null; rClockKey = ''; }
  // layar proyektor
  $('#rViews [data-view="podium"]').disabled = st !== 'finished';
  $('#rMusic').textContent = (sess.mu ?? true) ? 'Musik & efek suara: nyala' : 'Musik & efek suara: mati';
  $('#rScroll').setAttribute('aria-pressed', String(!!sess.ps)); $('#rScroll').textContent = sess.ps ? 'Gulir otomatis: nyala' : 'Gulir otomatis: mati';
  // pengaturan
  $('#rStVal').textContent = sess.stages;
  $('#rStMinus').disabled = sess.stages <= Math.max(1, stage); $('#rStPlus').disabled = sess.stages >= 5;
  $('#rReg').textContent = sess.regOpen ? 'Tutup pendaftaran' : 'Buka pendaftaran lagi';
  // 5 teratas
  const rows = leaderboard(players.map(p => ({ key: p.key, name: p.name, alloc: p.alloc })), drawn);
  $('#rTop').innerHTML = rows.length ? lbRows(rows.slice(0, 5).map(r => ({ ...r, k: r.key })), {}) : '<tr><td colspan="5" class="empty">Belum ada peserta.</td></tr>';
}
$('#rMain').addEventListener('click', async () => {
  const st = sess.status;
  try {
    if (st === 'lobby') { await upd({ status: 'briefing' }); buzz(); }
    else if (st === 'briefing') { await openAlloc(1); buzz(); }
    else if (st === 'alloc') { await closeAlloc(); buzz(); }
    else if (st === 'playing') await drawCard();
    else if (st === 'stageEnd') { await openAlloc((sess.stage || 1) + 1); buzz(); }
    else await setView('podium');
  } catch (e) { toast(errText(e)); }
});
$('#rSec').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.view) { setView(b.dataset.view); return; }
  const a = b.dataset.act;
  if (a === 'toLobby') upd({ status: 'lobby' }).then(buzz).catch(err => toast(errText(err)));
  else if (a === 'plus30') upd({ allocSeconds: (sess.allocSeconds || 60) + 30 }).then(buzz).catch(err => toast(errText(err)));
  else if (a === 'finish') {
    if (b.dataset.sure !== '1') { b.dataset.sure = '1'; b.classList.add('btn-danger'); b.textContent = 'Yakin? Tekan lagi'; setTimeout(() => { if (b.isConnected) { b.dataset.sure = ''; b.classList.remove('btn-danger'); b.textContent = 'Akhiri permainan'; } }, 3000); return; }
    upd({ status: 'finished' }).then(buzz).catch(err => toast(errText(err)));
  } else if (a === 'more') setStages(sess.stages + 1);
});
$('#rViews').addEventListener('click', e => { const b = e.target.closest('[data-view]'); if (b && !b.disabled) setView(b.dataset.view); });
$('#rScroll').addEventListener('click', () => upd({ ps: !sess.ps }).then(buzz).catch(e => toast(errText(e))));
$('#rStMinus').addEventListener('click', () => setStages(sess.stages - 1));
$('#rStPlus').addEventListener('click', () => setStages(sess.stages + 1));
$('#rReg').addEventListener('click', () => upd({ regOpen: !sess.regOpen }).then(() => { buzz(); toast(sess.regOpen ? 'Pendaftaran dibuka' : 'Pendaftaran ditutup'); }).catch(e => toast(errText(e))));
$('#rEnd').addEventListener('click', () => {
  const b = $('#rEnd');
  if (b.dataset.sure !== '1') { b.dataset.sure = '1'; b.textContent = 'Tekan lagi untuk mengakhiri'; setTimeout(() => { b.dataset.sure = ''; b.textContent = 'Akhiri permainan sekarang'; }, 3000); return; }
  upd({ status: 'finished', allocOpen: false }).then(buzz).catch(e => toast(errText(e)));
});
$('#rUndo').addEventListener('click', undoLast);
$('#rBack').addEventListener('click', () => openList());
$('#rToScreen').addEventListener('click', () => openSession(sid, false));
/* QR untuk membuka remote di HP */
$('#mRemote').addEventListener('click', () => { closeMenu(); $('#popRemote').hidden = false; });
$('#remoteClose').addEventListener('click', () => { $('#popRemote').hidden = true; });
