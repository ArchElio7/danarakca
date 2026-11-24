// Danarakca — layar peserta (HP).
import { auth, db, signInAnonymously, onAuthStateChanged, doc, getDoc, updateDoc, onSnapshot, writeBatch,
  arrayUnion, serverTimestamp, hashPin, errText } from './fb.js';
import { ASSETS, MODAL, ROUNDS_PER_STAGE, CARD_BY_ID, simulate, maxDrawdown, lastCardImpact, rebalance,
  nameKey, cleanName, simTime, fmtJt, fmtPct, validAlloc, effectiveAllocs } from './game.js';
import { initTheme, THEME_ICON, LOGO, $, esc, cardHTML, wireCard, lineChart, lbRows, podiumHTML, toast, startCountdown, howtoHTML, confetti } from './ui.js';

$('#themeBtn').innerHTML = THEME_ICON; $('#logoSlot').innerHTML = LOGO; initTheme();

const params = new URLSearchParams(location.search);
let sid = (params.get('s') || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
let key = null, me = null, sess = null, board = null, uid = null;
let unsub = [], lastDrawnLen = -1, lastStatus = '', endShown = false;
const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* abaikan */ } } };
if (!sid) sid = store.get('danarakca-last-sid') || '';

const show = id => ['scrLoad', 'scrJoin', 'scrMain'].forEach(s => { $('#' + s).hidden = s !== id; });

onAuthStateChanged(auth, async user => {
  if (!user) { try { await signInAnonymously(auth); } catch (e) { $('#scrLoad').innerHTML = `<p>${esc(errText(e))}</p>`; } return; }
  uid = user.uid;
  if (!sid) { openJoin(); return; }
  const ok = await loadSession(sid);
  if (!ok) { openJoin('Kode sesi tidak ditemukan. Periksa kembali kode di layar utama.'); return; }
  const saved = store.get('danarakca-key-' + sid);
  if (saved && await tryResume(saved)) return;
  openJoin();
});

async function loadSession(id) {
  try { const s = await getDoc(doc(db, 'sessions', id)); if (!s.exists()) return false; sess = s.data(); return true; }
  catch (e) { return false; }
}
async function tryResume(k) {
  try { const p = await getDoc(doc(db, 'sessions', sid, 'players', k)); if (!p.exists()) return false; key = k; enterGame(); return true; }
  catch (e) { return false; }
}

/* ---------------- gabung ---------------- */
function openJoin(err) {
  show('scrJoin');
  $('#codeField').hidden = !!sid && !!sess;
  if (sid) $('#fCode').value = sid;
  if (sess) $('#sessName').textContent = 'Sesi: ' + sess.name;
  if (err) showJoinErr(err);
}
function showJoinErr(text, chips = []) {
  $('#joinErr').hidden = false; $('#joinErrText').innerHTML = text;
  $('#joinChips').innerHTML = chips.map(c => `<button type="button">${esc(c)}</button>`).join('');
}
$('#joinChips').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { $('#fName').value = b.textContent; $('#fName').focus(); } });
$('#fPin').addEventListener('input', e => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4); });

$('#joinForm').addEventListener('submit', async e => {
  e.preventDefault();
  $('#joinErr').hidden = true;
  const code = $('#fCode').value.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (!$('#codeField').hidden || !sid) {
    if (!code) return showJoinErr('Isi kode sesi dulu.');
    if (code !== sid || !sess) { sid = code; if (!(await loadSession(sid))) { sess = null; return showJoinErr('Kode sesi tidak ditemukan.'); } }
  }
  const name = cleanName($('#fName').value), k = nameKey(name), pin = $('#fPin').value;
  if (!name || !k) return showJoinErr('Isi nama peserta atau tim (huruf atau angka).');
  if (!/^\d{4}$/.test(pin)) return showJoinErr('PIN harus 4 angka.');
  const btn = $('#joinBtn'); btn.disabled = true; btn.textContent = 'Memeriksa…';
  try {
    const h = await hashPin(sid, k, pin);
    const sref = doc(db, 'sessions', sid, 'secrets', k), pref = doc(db, 'sessions', sid, 'players', k);
    try {                                        // 1) nama baru
      const b = writeBatch(db);
      b.set(sref, { pin: h, owners: [uid] });
      b.set(pref, { name, alloc: {}, joinedAt: serverTimestamp() });
      await b.commit();
      key = k; enterGame(); return;
    } catch (e1) { /* nama sudah ada atau pendaftaran ditutup */ }
    try {                                        // 2) masuk lagi dengan PIN
      await updateDoc(sref, { pin: h, owners: arrayUnion(uid) });
      key = k; enterGame(); return;
    } catch (e2) {
      if (e2.code === 'not-found') return showJoinErr('Pendaftaran peserta baru sudah ditutup fasilitator. Minta fasilitator membukanya kembali.');
      if (await tryResume(k)) return;            // perangkat ini memang sudah terdaftar
      const sug = [name + ' 2', name + ' Jakarta', name + ' Muda'].map(cleanName);
      showJoinErr(`<b>Nama "${esc(name)}" sudah dipakai</b>, atau PIN-nya salah. Kalau ini tim Anda, periksa PIN. Kalau bukan, pilih nama lain:`, sug);
    }
  } catch (e) { showJoinErr(esc(errText(e))); }
  finally { btn.disabled = false; btn.textContent = 'Masuk'; }
});

/* ---------------- permainan ---------------- */
function enterGame() {
  store.set('danarakca-last-sid', sid); store.set('danarakca-key-' + sid, key);
  history.replaceState(null, '', '?s=' + sid);
  show('scrMain');
  unsub.forEach(u => u()); unsub = [];
  // papan peringkat ikut di dokumen sesi: satu kiriman per kartu (hemat kuota Firebase)
  unsub.push(onSnapshot(doc(db, 'sessions', sid), s => { sess = s.data({ serverTimestamps: 'estimate' }); board = sess && sess.board ? sess.board : null; render(); }));
  unsub.push(onSnapshot(doc(db, 'sessions', sid, 'players', key), s => { me = s.exists() ? s.data() : null; if (!s.exists()) { toast('Anda dikeluarkan dari sesi ini.'); } render(); }));
}

document.querySelectorAll('.tabs button').forEach(b => b.addEventListener('click', () => setTab(b.dataset.tab)));
function setTab(id) {
  if (id === 'tabCard') $('.tabs [data-tab="tabCard"]').classList.remove('dot');
  ['tabPorto', 'tabCard', 'tabRank'].forEach(t => { $('#' + t).hidden = t !== id; });
  document.querySelectorAll('.tabs button').forEach(b => { if (b.dataset.tab === id) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); });
  window.scrollTo(0, 0);
}
wireCard($('#curCard'));

function render() {
  if (!sess || !me) return;
  const drawn = sess.drawn || [];
  const n = drawn.length;
  $('#who').hidden = false; $('#who').textContent = me.name;

  // --- portofolio
  const sim = simulate(me.alloc, drawn);
  const row = board && board.rows ? board.rows.find(r => r.k === key) : null;
  const total = board && board.rows ? board.rows.length : 0;
  $('#myRank').innerHTML = (row ? '#' + row.rank : '–') + `<small> /${total || '–'}</small>`;
  $('#myVal').textContent = 'Rp' + fmtJt(sim.value) + ' jt';
  $('#myMove').innerHTML = !n ? 'Belum ada putaran' : row ? (row.mv > 0 ? `<span style="color:#7BE0B0;font-weight:700">▲ ${row.mv} peringkat</span> dari putaran lalu` : row.mv < 0 ? `<span style="color:#FF9A9E;font-weight:700">▼ ${-row.mv} peringkat</span> dari putaran lalu` : 'Peringkat sama dengan putaran lalu') : '';
  const ret = sim.value / MODAL - 1;
  $('#myRet').textContent = fmtPct(ret * 100); $('#myRet').className = 'num ' + (ret >= 0 ? 'up' : 'down');
  $('#myDD').textContent = (maxDrawdown(sim.history) * 100).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%';
  $('#myRound').textContent = `${n}/${sess.stages * ROUNDS_PER_STAGE}`;
  const sukuk = simulate({ '1': [100, 0, 0, 0, 0] }, drawn).history;
  $('#bench').textContent = 'Rp' + fmtJt(sukuk[sukuk.length - 1]) + ' jt';
  lineChart($('#myChart'), [{ values: sim.history.map(v => v / 1e6), color: '--u-ink', width: 3 }, { values: sukuk.map(v => v / 1e6), color: '--c-sukuk', width: 2 }],
    { w: 340, h: 160, label: 'Nilai portofolio Anda dibanding 100% sukuk', pl: 34, pr: 10, pb: 8, r: 3.5, base: 100 });
  const pos = n ? sim.positions : effectiveAllocs(me.alloc, 1)[0].map(p => MODAL * p / 100);
  const tot = pos.reduce((a, b) => a + b, 0) || 1;
  $('#myStack').innerHTML = pos.map((p, i) => `<i style="width:${p / tot * 100}%;background:var(${ASSETS[i].cssVar})"></i>`).join('');
  $('#myPos').innerHTML = pos.map((p, i) => `<div><span><i style="background:var(${ASSETS[i].cssVar})"></i>${ASSETS[i].name}</span><b class="num">${(p / tot * 100).toFixed(0)}% · ${fmtJt(p, 1)} jt</b></div>`).join('');

  // --- banner fase
  const stageNow = sess.stage || 1;
  const filled = validAlloc(me.alloc && me.alloc[String(stageNow)]);
  let banner = '';
  if (sess.status === 'lobby' || sess.status === 'briefing') banner = '<span class="dot"></span> Menunggu fasilitator membuka alokasi tahap 1.';
  else if (sess.status === 'playing' && !validAlloc(me.alloc && me.alloc['1']) ) banner = 'Anda belum mengisi alokasi tahap 1, jadi dana Anda ditaruh 100% di RD Pasar Uang.';
  else if (sess.status === 'playing' && stageNow > 1 && !filled) banner = `Anda tidak mengubah alokasi tahap ${stageNow}, jadi komposisi tahap sebelumnya dipakai lagi.`;
  $('#phaseBanner').hidden = !banner; $('#phaseBanner').innerHTML = banner;

  // --- kartu
  const card = n ? CARD_BY_ID[drawn[n - 1]] : null;
  if (n !== lastDrawnLen) {
    $('#curCard').innerHTML = cardHTML(card, { label: n ? `Putaran ${n}` : '' });
    if (lastDrawnLen >= 0 && n > lastDrawnLen) { $('#curCard').classList.remove('flip'); void $('#curCard').offsetWidth; $('#curCard').classList.add('flip'); if ($('#tabCard').hidden) $('.tabs [data-tab="tabCard"]').classList.add('dot'); toast('Kartu baru: ' + card.title); }
    lastDrawnLen = n;
  }
  const imp = n ? lastCardImpact(me.alloc, drawn) : null;
  $('#impactBox').hidden = !imp;
  if (imp) {
    $('#impTotal').textContent = (imp.total >= 0 ? '+' : '−') + 'Rp' + fmtJt(Math.abs(imp.total)) + ' jt'; $('#impTotal').className = 'num ' + (imp.total >= 0 ? 'up' : 'down');
    $('#impRows').innerHTML = imp.delta.map((d, i) => `<div><span><i style="background:var(${ASSETS[i].cssVar})"></i>${ASSETS[i].name}</span><b class="num ${d >= 0 ? 'up' : 'down'}">${d >= 0 ? '+' : '−'}${fmtJt(Math.abs(d))} jt</b></div>`).join('');
  }
  $('#waitText').textContent = sess.status === 'finished' ? 'Permainan sudah selesai.' : 'Menunggu kartu berikutnya dari fasilitator';

  // --- peringkat
  if (board && board.rows) {
    $('#rankBody').innerHTML = lbRows(board.rows, { me: key });
    $('#rRank').textContent = row ? '#' + row.rank : '–'; $('#rName').textContent = me.name + ' (Anda)';
    $('#rVal').textContent = row ? fmtJt(row.v) + ' jt' : '';
  }

  renderAlloc(sim);
  renderPopups(row, sim);
}

/* ---------------- alokasi ---------------- */
let vals = [0, 0, 0, 0, 0], allocKey = '', stopClock = null, dirty = false;
const sl = $('#sliders');
sl.innerHTML = ASSETS.map((a, i) => `<div class="slider"><label for="s${i}"><i style="background:var(${a.cssVar})"></i>${a.name}</label><span class="pct" id="p${i}">0%</span><input type="range" id="s${i}" min="0" max="100" step="5" value="0" style="accent-color:var(${a.cssVar})"><span class="rp" id="r${i}"></span></div>`).join('');
ASSETS.forEach((a, i) => $('#s' + i).addEventListener('input', e => { vals = rebalance(vals, i, +e.target.value); dirty = true; drawAlloc(); }));
document.querySelectorAll('.presets button').forEach(b => b.addEventListener('click', () => { vals = b.dataset.p.split(',').map(Number); dirty = true; drawAlloc(); }));
$('#usePrev').addEventListener('click', () => { const st = sess.allocStage; const prev = effectiveAllocs(me.alloc, st - 1)[st - 2]; vals = prev.slice(); dirty = true; drawAlloc(); });
let allocModal = MODAL;
function drawAlloc() {
  vals.forEach((v, i) => { $('#s' + i).value = v; $('#p' + i).textContent = v + '%'; $('#r' + i).textContent = 'Rp' + fmtJt(allocModal * v / 100) + ' jt'; });
  $('#allocStack').innerHTML = vals.map((v, i) => `<i style="width:${v}%;background:var(${ASSETS[i].cssVar})"></i>`).join('');
  const t = vals.reduce((a, b) => a + b, 0), btn = $('#saveAlloc'), st = $('#allocStatus');
  const saved = me && me.alloc && me.alloc[String(sess.allocStage)];
  const same = saved && saved.join() === vals.join();
  if (t === 100) { st.textContent = '✓ Total 100%'; st.className = 'status ok'; btn.disabled = !!same; btn.textContent = same ? 'Tersimpan ✓' : 'Simpan Alokasi'; }
  else { st.textContent = `Sisa ${100 - t}% belum dibagi`; st.className = 'status warn'; btn.disabled = true; btn.textContent = t === 0 ? 'Geser slider untuk mulai' : `Bagi sisa ${100 - t}% dulu`; }
  $('#allocSaved').textContent = saved ? (same ? 'Sudah disimpan, masih bisa diubah' : 'Ada perubahan belum disimpan') : 'Belum disimpan';
}
$('#saveAlloc').addEventListener('click', async () => {
  const st = sess.allocStage, btn = $('#saveAlloc'); btn.disabled = true; btn.textContent = 'Menyimpan…';
  try { await updateDoc(doc(db, 'sessions', sid, 'players', key), { ['alloc.' + st]: vals.slice() }); dirty = false; toast('Alokasi tersimpan'); }
  catch (e) { toast(e.code === 'permission-denied' ? 'Gagal: waktu alokasi sudah habis.' : errText(e)); }
  drawAlloc();
});
function renderAlloc(sim) {
  const open = !!sess.allocOpen && sess.status === 'alloc';
  const k = open ? sess.allocStage + ':' + (sess.allocOpenedAt && sess.allocOpenedAt.toMillis ? sess.allocOpenedAt.toMillis() : '') : '';
  $('#allocScr').hidden = !open;
  if (!open) { if (stopClock) { stopClock(); stopClock = null; } allocKey = ''; return; }
  allocModal = sim.value;
  $('#allocTitle').textContent = 'Alokasi Tahap ' + sess.allocStage;
  $('#allocModal').textContent = 'Rp' + fmtJt(allocModal) + ' jt';
  $('#usePrev').hidden = sess.allocStage <= 1;
  if (k !== allocKey) {                         // jendela alokasi baru dibuka
    allocKey = k;
    const saved = me.alloc && me.alloc[String(sess.allocStage)];
    vals = validAlloc(saved) ? saved.slice() : [0, 0, 0, 0, 0]; dirty = false;
    if (stopClock) stopClock();
    const ends = (sess.allocOpenedAt ? sess.allocOpenedAt.toMillis() : Date.now()) + sess.allocSeconds * 1000;
    stopClock = startCountdown(ends, left => { const c = $('#allocClock'); c.textContent = left + ' dtk'; c.classList.toggle('low', left <= 10); if (left === 0) { c.textContent = 'Waktu habis'; $('#saveAlloc').disabled = true; } });
  }
  if (!dirty) { const saved = me.alloc && me.alloc[String(sess.allocStage)]; if (validAlloc(saved)) vals = saved.slice(); }
  drawAlloc();
}

/* ---------------- popup tahap & akhir ---------------- */
$('#closeEnd').addEventListener('click', () => { $('#popEnd').hidden = true; setTab('tabPorto'); });
function renderPopups(row, sim) {
  const st = sess.status;
  $('#popHowto').hidden = st !== 'briefing';
  if (st === 'briefing' && !$('#phHowto').innerHTML) $('#phHowto').innerHTML = howtoHTML(sess.defaultSeconds || 60, sess.stages);
  $('#popStage').hidden = st !== 'stageEnd';
  if (st === 'stageEnd') {
    $('#popStageTitle').textContent = `Tahap ${sess.stage} selesai!`;
    $('#psRank').innerHTML = row ? `#${row.rank}<small style="font-size:18px;color:#A9BBD0"> /${board.rows.length}</small>` : '–';
    $('#psVal').textContent = 'Rp' + fmtJt(sim.value) + ' jt';
  }
  if (st === 'finished' && board && board.rows && !endShown) {
    endShown = true;
    $('#podium').innerHTML = podiumHTML(board.rows);
    $('#endMine').innerHTML = row ? `Anda finis di peringkat <b>#${row.rank}</b> dari ${board.rows.length} dengan aset <b>Rp${fmtJt(row.v)} jt</b> (${fmtPct(row.ret * 100)}).` : '';
    $('#popEnd').hidden = false;
    setTimeout(() => confetti(), 2000);
  }
  if (st !== 'finished') { endShown = false; $('#popEnd').hidden = true; }
  lastStatus = st;
}
