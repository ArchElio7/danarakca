# Danarakca

Simulasi investasi interaktif berbasis kartu skenario (DJPPR, Kementerian Keuangan RI).

| Halaman | Untuk siapa |
|---|---|
| `index.html` | Halaman depan |
| `play.html` | Peserta (HP), masuk lewat QR |
| `admin.html` | Fasilitator (laptop + proyektor) |

## Isi folder
- `assets/cards.js`: 100 kartu skenario. Ubah angka atau teks di sini, lalu unggah ulang.
- `assets/game.js`: aturan hitung (imbal hasil dasar, tahap, peringkat).
- `assets/fb.js`: sambungan ke Firebase proyek `danarakca-games`.
- `firestore.rules`: aturan keamanan database. Isinya ditempel di Firebase Console → Firestore → Rules.

## Aturan permainan singkat
- Modal Rp100 juta, 5 aset, 1 putaran = 1 kuartal, 10 putaran per tahap (1–3 tahap).
- Sukuk: imbalan tetap 1,75% per kuartal. Saham: 50 kartu naik, 50 kartu turun. RD Campuran: setengah gerak saham + imbalan sukuk.
- Peserta yang tidak mengisi alokasi tahap 1: 100% RD Pasar Uang. Tidak mengisi tahap berikutnya: komposisi tahap sebelumnya.

## Menambah admin
Login di `admin.html`, salin UID yang muncul, lalu di Firestore buat dokumen `admins/<UID>`.

## Mode remote (1 fasilitator, 2 perangkat)
- Laptop/proyektor: buka `admin.html`, pilih sesi → **Buka**.
- HP fasilitator: Menu → **Kendalikan dari HP** → pindai QR, login admin (atau di daftar sesi tekan **Remote**).
- Semua kontrol (kocok kartu, alokasi, tahap, podium, layar pelajaran, gulir otomatis) bisa ditekan dari HP; proyektor mengikuti.
- Papan peringkat disimpan di dokumen sesi (`sessions/{id}.board`), jadi HP peserta hanya menerima satu kiriman per kartu.
