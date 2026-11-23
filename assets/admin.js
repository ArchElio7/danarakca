// Danarakca — dashboard fasilitator (layar proyektor).
import { auth, db, signInWithEmailAndPassword, onAuthStateChanged, signOut, doc, getDoc, setDoc, updateDoc, deleteDoc,
  onSnapshot, collection, query, where, getDocs, serverTimestamp, writeBatch, errText } from './fb.js';
import { ASSETS, ROUNDS_PER_STAGE, CARD_BY_ID, simulate, leaderboard, assetIndex, pickRandomCard, simTime, fmtJt,
  validAlloc } from './game.js';
import { initTheme, THEME_ICON, LOGO, $, esc, cardHTML, wireCard, lineChart, lbRows, podiumHTML, toast, startCountdown, timerSVG } from './ui.js';

document.querySelectorAll('.themebtn').forEach(b => { b.innerHTML = THEME_ICON; });
document.querySelectorAll('.logoSlot').forEach(s => { s.innerHTML = LOGO; });
initTheme();

const scr = id => ['scrLogin', 'scrNotAdmin', 'scrSessions', 'scrDash'].forEach(s => { $('#' + s).hidden = s !== id; });
let user = null, sid = null, sess = null, players = [], unsub = [], busy = false;

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
    const want = new URLSearchParams(location.search).get('s');
    if (want) openSession(want.toUpperCase()); else openList();
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
    const label = { lobby: 'Menunggu peserta', alloc: 'Alokasi berjalan', playing: 'Sedang main', stageEnd: 'Jeda antar-tahap', finished: 'Selesai' };
    list.innerHTML = rows.length ? rows.map(r => `<div class="sess"><div><b>${esc(r.name)}</b><small>Kode ${r.id} · ${r.stages} tahap · ${(r.drawn || []).length}/${r.stages * ROUNDS_PER_STAGE} putaran · ${label[r.status] || r.status}</small></div><button class="btn btn-gold" type="button" data-open="${r.id}">Buka</button></div>`).join('')
      : '<p class="empty">Belum ada sesi. Buat sesi baru di atas.</p>';
  } catch (e) { list.innerHTML = `<p class="msg err">${esc(errText(e))}</p>`; }
}
$('#sessList').addEventListener('click', e => { const b = e.target.closest('[data-open]'); if (b) openSession(b.dataset.open); });
$('#newForm').addEventListener('submit', async e => {
  e.preventDefault(); $('#newErr').hidden = true;
  const name = $('#nName').value.trim().slice(0, 60) || 'Sesi Danarakca';
  const A = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789', buf = new Uint32Array(6); crypto.getRandomValues(buf);
  const id = [...buf].map(x => A[x % A.length]).join('');
  try {
    await setDoc(doc(db, 'sessions', id), { name, stages: +$('#nStages').value, allocSeconds: +$('#nSecs').value, defaultSeconds: +$('#nSecs').value,
      status: 'lobby', stage: 1, drawn: [], regOpen: true, allocOpen: false, allocStage: 1, allocOpenedAt: null,
      createdBy: user.uid, createdAt: serverTimestamp() });
    await setDoc(doc(db, 'sessions', id, 'public', 'board'), { rows: [], n: 0 });
    openSession(id);
  } catch (err) { $('#newErr').textContent = errText(err); $('#newErr').hidden = false; }
});

/* ---------------- dashboard sesi ---------------- */
function stopSession() { unsub.forEach(u => u()); unsub = []; sid = null; sess = null; players = []; if (stopClock) { stopClock(); stopClock = null; } }
function openSession(id) {
  stopSession(); sid = id; scr('scrDash'); history.replaceState(null, '', 'admin.html?s=' + id);
  const url = new URL('play.html?s=' + id, location.href).href;
  $('#codeSmall').textContent = id; $('#urlSmall').textContent = url.replace(/^https?:\/\//, '');
  $('#lobbyCode').textContent = id; $('#lobbyUrl').textContent = new URL('play.html', location.href).href.replace(/^https?:\/\//, '');
  drawQR($('#qrSmall'), url, 96); drawQR($('#qrBig'), url, 260);
  lastDrawn = -1; lobbyDismissed = false;
  unsub.push(onSnapshot(doc(db, 'sessions', id), s => {
    if (!s.exists()) { toast('Sesi tidak ditemukan.'); openList(); return; }
    sess = s.data({ serverTimestamps: 'estimate' }); render(); scheduleBoard();
  }, e => toast(errText(e))));
  unsub.push(onSnapshot(collection(db, 'sessions', id, 'players'), s => {
    players = s.docs.map(d => ({ key: d.id, ...d.data() })); render(); scheduleBoard();
  }, e => toast(errText(e))));
}
function drawQR(el, text) {
  try { const q = window.qrcode(0, 'M'); q.addData(text); q.make(); el.innerHTML = q.createSvgTag({ cellSize: 4, margin: 0, scalable: true }); }
  catch (e) { el.textContent = text; }
}

/* papan peringkat dihitung di sini lalu dibagikan ke HP peserta */
let boardTimer = null, lastBoardSig = '';
function scheduleBoard() { clearTimeout(boardTimer); boardTimer = setTimeout(writeBoard, 700); }
async function writeBoard() {
  if (!sess || !sid) return;
  const drawn = sess.drawn || [];
  const rows = leaderboard(players.map(p => ({ key: p.key, name: p.name, alloc: p.alloc })), drawn)
    .map(r => ({ k: r.key, name: r.name, v: Math.round(r.v), ret: +r.ret.toFixed(5), mv: r.mv, rank: r.rank, dd: +r.dd.toFixed(4) }));
  const sig = JSON.stringify([drawn.length, rows]);
  if (sig === lastBoardSig) return;
  try { await setDoc(doc(db, 'sessions', sid, 'public', 'board'), { rows, n: drawn.length, at: serverTimestamp() }); lastBoardSig = sig; }
  catch (e) { toast('Gagal memperbarui peringkat: ' + errText(e)); }
}

let lastDrawn = -1, lobbyDismissed = false, stopClock = null, clockKey = '', podiumDismissed = false;
wireCard($('#pjCard'));
const teamVars = ['--t1', '--t2', '--t3', '--t4', '--t5', '--t6'];

function render() {
  if (!sess) return;
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

  // tombol utama sesuai fase
  const mb = $('#mainBtn');
  if (st === 'lobby') { mb.textContent = 'Buka Alokasi Tahap 1'; mb.disabled = false; }
  else if (st === 'alloc') { mb.textContent = 'Tutup Alokasi'; mb.disabled = false; }
  else if (st === 'playing') { mb.textContent = `Kocok Kartu (${n + 1})`; mb.disabled = busy || n >= stage * ROUNDS_PER_STAGE; }
  else if (st === 'stageEnd') { mb.textContent = 'Lanjut / Akhiri'; mb.disabled = false; }
  else { mb.textContent = 'Tampilkan Podium'; mb.disabled = false; }
  $('#undoBtn').disabled = !n || st === 'alloc' || n <= (stage - 1) * ROUNDS_PER_STAGE;   // tidak bisa membatalkan ke tahap sebelumnya

  // kartu
  if (n !== lastDrawn) {
    const card = n ? CARD_BY_ID[drawn[n - 1]] : null;
    $('#pjCard').innerHTML = cardHTML(card, { label: n ? `Kartu ${n} / ${total}` : '' });
    if (lastDrawn >= 0 && n > lastDrawn) { $('#pjCard').classList.remove('flip'); void $('#pjCard').offsetWidth; $('#pjCard').classList.add('flip'); }
    lastDrawn = n;
    $('#hist').innerHTML = n > 1 ? drawn.slice(0, -1).slice(-5).reverse().map((id, i) => { const c = CARD_BY_ID[id]; const s = c.fx[1]; return `<div><span class="q">Q${n - 1 - i}</span><span>${c.id} · ${esc(c.title)}</span><span class="s ${s >= 0 ? 'up' : 'down'}">Saham ${s > 0 ? '+' : '−'}${Math.abs(s)}%</span></div>`; }).join('') : '<p class="empty">Belum ada.</p>';
  }

  // peringkat & grafik
  const rows = leaderboard(players.map(p => ({ key: p.key, name: p.name, alloc: p.alloc })), drawn);
  $('#lbCount').textContent = players.length + ' peserta';
  $('#lbBody').innerHTML = rows.length ? lbRows(rows.map(r => ({ ...r, k: r.key })), { cut: 10 }) : '<tr><td colspan="5" class="empty">Belum ada peserta. Tampilkan QR agar peserta bergabung.</td></tr>';
  const top = rows.slice(0, 6);
  lineChart($('#teamChart'), top.map((r, i) => { const p = players.find(x => x.key === r.key); return { values: simulate(p.alloc, drawn).history.map(v => v / 1e6), color: teamVars[i], width: i === 0 ? 4 : 2.5 }; }),
    { w: 720, h: 380, label: 'Nilai portofolio 6 peserta teratas', xt: true, fs: 12, base: 100 });
  $('#teamKey').innerHTML = top.map((r, i) => `<span><i style="background:var(${teamVars[i]})"></i>${esc(r.name)}</span>`).join('');
  const idx = assetIndex(drawn);
  lineChart($('#assetChart'), idx.map((v, i) => ({ values: v, color: ASSETS[i].cssVar, width: i < 2 ? 3.5 : 2 })), { w: 720, h: 200, label: 'Indeks lima kelas aset', xt: true, fs: 12, base: 100 });
  $('#assetKey').innerHTML = ASSETS.map((a, i) => `<span><i style="background:var(${a.cssVar})"></i>${a.name} <b>${idx[i][idx[i].length - 1].toLocaleString('id-ID', { maximumFractionDigits: 1 })}</b></span>`).join('');

  renderPopups(rows, filled);
}

/* ---------------- popup per fase ---------------- */
function renderPopups(rows, filled) {
  const st = sess.status;
  // lobi
  $('#popLobby').hidden = !(st === 'lobby' && !lobbyDismissed) && !showJoin;
  $('#lobbyOpen').hidden = st !== 'lobby';
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
        if (left <= 0) setTimeout(() => { if (sess && sess.status === 'alloc' && clockKey === k) closeAlloc(); }, 1200);
      });
    }
  } else if (stopClock) { stopClock(); stopClock = null; clockKey = ''; }
  // tahap selesai
  $('#popStage').hidden = st !== 'stageEnd';
  if (st === 'stageEnd') {
    $('#stageTitle').textContent = `Tahap ${sess.stage} selesai!`;
    $('#stageTop3').innerHTML = rows.slice(0, 3).map(r => `<div><span>${r.rank}. ${esc(r.name)}</span><span class="num">Rp${fmtJt(r.v)} jt</span></div>`).join('') || '<div>Belum ada peserta</div>';
    $('#stageQ').textContent = `Lanjut ke tahap ${sess.stage + 1}? Peserta akan mendapat ${sess.defaultSeconds || 60} detik untuk menyusun ulang portofolio.`;
  }
  // podium
  if (st === 'finished' && !podiumDismissed) { $('#podium').innerHTML = podiumHTML(rows); $('#popPodium').hidden = false; }
  if (st !== 'finished') { $('#popPodium').hidden = true; podiumDismissed = false; }
}
let showJoin = false;
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
  try { await upd({ drawn: next, status }); }
  catch (e) { toast(errText(e)); }
  finally { setTimeout(() => { busy = false; render(); }, 1200); }
}
$('#mainBtn').addEventListener('click', async () => {
  const st = sess.status;
  try {
    if (st === 'lobby') await openAlloc(1);
    else if (st === 'alloc') await closeAlloc();
    else if (st === 'playing') await drawCard();
    else if (st === 'stageEnd') { $('#popStage').hidden = false; }
    else { podiumDismissed = false; render(); }
  } catch (e) { toast(errText(e)); }
});
$('#lobbyOpen').addEventListener('click', () => openAlloc(1).catch(e => toast(errText(e))));
$('#closeAlloc').addEventListener('click', closeAlloc);
$('#plus30').addEventListener('click', () => upd({ allocSeconds: (sess.allocSeconds || 60) + 30 }).catch(e => toast(errText(e))));
$('#stageNext').addEventListener('click', () => openAlloc((sess.stage || 1) + 1).catch(e => toast(errText(e))));
$('#stageEnd').addEventListener('click', () => upd({ status: 'finished' }).catch(e => toast(errText(e))));
$('#undoBtn').addEventListener('click', async () => {
  const b = $('#undoBtn');
  if (!b.classList.contains('btn-danger')) { b.classList.add('btn-danger'); b.textContent = 'Yakin batalkan kartu?'; setTimeout(() => { b.classList.remove('btn-danger'); b.textContent = 'Batalkan'; }, 3000); return; }
  b.classList.remove('btn-danger'); b.textContent = 'Batalkan';
  const drawn = (sess.drawn || []).slice(0, -1);
  // tahap tetap sama; kalau kartu penutup tahap dibatalkan, permainan kembali ke posisi "sedang main"
  try { await upd({ drawn, status: 'playing' }); toast('Kartu terakhir dibatalkan'); }
  catch (e) { toast(errText(e)); }
});

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
$('#autoScroll').addEventListener('click', () => {
  const b = $('#autoScroll'), sc = $('#lbScroll');
  if (scrollT) { clearInterval(scrollT); scrollT = null; b.setAttribute('aria-pressed', 'false'); b.textContent = 'Gulir otomatis'; return; }
  b.setAttribute('aria-pressed', 'true'); b.textContent = 'Berhenti';
  let pause = 0;
  scrollT = setInterval(() => { if (pause > 0) { pause--; if (pause === 0) sc.scrollTop = 0; return; } if (sc.scrollTop + sc.clientHeight >= sc.scrollHeight - 1) { pause = 60; return; } sc.scrollTop += 1; }, 35);
});
