// Danarakca — sambungan ke Firebase (proyek danarakca-games).
// Konfigurasi ini memang publik (bukan rahasia). Keamanan data diatur oleh firestore.rules.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js';
import { getAuth, signInAnonymously, signInWithEmailAndPassword, onAuthStateChanged, signOut }
  from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js';
import { getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc, onSnapshot, collection, query, where,
  getDocs, writeBatch, arrayUnion, serverTimestamp, deleteField }
  from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyBfVI5ZF3Hly4jNxOXB0-YdS8SAWZM8zEE",
  authDomain: "danarakca-games.firebaseapp.com",
  projectId: "danarakca-games",
  storageBucket: "danarakca-games.firebasestorage.app",
  messagingSenderId: "82963032706",
  appId: "1:82963032706:web:fc204908756fc3f0da629b"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export { signInAnonymously, signInWithEmailAndPassword, onAuthStateChanged, signOut,
  doc, getDoc, setDoc, updateDoc, deleteDoc, onSnapshot, collection, query, where, getDocs, writeBatch,
  arrayUnion, serverTimestamp, deleteField };

/** Hash PIN (SHA-256) supaya PIN asli tidak tersimpan di database. */
export async function hashPin(sid, key, pin) {
  const data = new TextEncoder().encode(`danarakca:${sid}:${key}:${pin}`);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

/** Pesan error Firebase dalam bahasa sehari-hari. */
export function errText(e) {
  const c = (e && e.code) || '';
  if (c.includes('permission-denied')) return 'Akses ditolak. Periksa kembali, atau minta bantuan fasilitator.';
  if (c.includes('unavailable') || c.includes('network')) return 'Koneksi internet bermasalah. Coba lagi sebentar.';
  if (c.includes('wrong-password') || c.includes('invalid-credential') || c.includes('user-not-found')) return 'Email atau password salah.';
  if (c.includes('too-many-requests')) return 'Terlalu banyak percobaan. Tunggu sebentar lalu coba lagi.';
  if (c.includes('operation-not-allowed') || c.includes('admin-restricted')) return 'Metode login belum diaktifkan di Firebase (Authentication → Sign-in method).';
  if (c.includes('unauthorized-domain')) return 'Alamat web ini belum didaftarkan di Firebase (Authentication → Settings → Authorized domains).';
  return (e && e.message) ? e.message : 'Terjadi kesalahan.';
}
