// Danarakca — data 100 kartu skenario.
// fx = dampak kartu per kuartal (persen) di luar imbal hasil dasar, urutan: [Sukuk/SBN, Saham, RD Pasar Uang, Emas, RD Campuran]
// r  = alasan per aset yang muncul saat tanda "!" ditekan (urutan sama dengan fx).
// BASE = imbal hasil dasar per kuartal (persen). Sukuk 7 persen per tahun = 1,75 per kuartal.
// Boleh diedit: ubah angka/teks, simpan, lalu unggah ulang file ini ke GitHub.
export const BASE = [1.75, 0, 1.1, 0.2, 0.74];
export const CARDS = [
 {
  "id": "K001",
  "cat": "Moneter",
  "color": "#1D4E9A",
  "title": "BI Rate Naik 25 bps",
  "narr": "Bank Indonesia menaikkan suku bunga acuan untuk meredam inflasi.",
  "why": "Suku bunga naik → biaya pinjaman emiten naik dan valuasi saham tertekan. Imbal hasil pasar uang ikut naik. Pemegang sukuk negara ritel tidak terdampak: imbalan tetap dibayar.",
  "fx": [
   0,
   -5.0,
   0.2,
   -2.5,
   -2.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Suku bunga atau kurs yang menekan membuat biaya pinjaman perusahaan naik dan investor mengurangi saham. Penurunannya moderat.",
   "Bunga deposito dan pasar uang naik, sehingga imbal hasil RD pasar uang sedikit lebih tinggi dari biasanya.",
   "Saat suasana pasar membaik atau dolar menguat, emas kurang diminati dan harganya turun.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K002",
  "cat": "Moneter",
  "color": "#1D4E9A",
  "title": "BI Rate Naik 50 bps",
  "narr": "BI menaikkan suku bunga secara agresif untuk menahan pelemahan rupiah.",
  "why": "Kenaikan besar menekan valuasi saham. Instrumen pasar uang justru diuntungkan karena bunga deposito naik. Pemegang sukuk negara ritel tidak terdampak: imbalan tetap dibayar.",
  "fx": [
   0,
   -10.0,
   0.4,
   -3.5,
   -5.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Suku bunga atau kurs yang menekan membuat biaya pinjaman perusahaan naik dan investor mengurangi saham. Penurunannya cukup besar.",
   "Bunga deposito dan pasar uang naik, sehingga imbal hasil RD pasar uang sedikit lebih tinggi dari biasanya.",
   "Saat suasana pasar membaik atau dolar menguat, emas kurang diminati dan harganya turun.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K003",
  "cat": "Moneter",
  "color": "#1D4E9A",
  "title": "BI Rate Turun 25 bps",
  "narr": "Inflasi jinak, BI memangkas suku bunga acuan.",
  "why": "Biaya dana lebih murah mendorong laba dan valuasi saham. Imbal hasil pasar uang sedikit turun.",
  "fx": [
   0,
   4.0,
   -0.2,
   2.5,
   2.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Kondisi moneter yang lebih longgar atau stabil menurunkan biaya dana perusahaan, sehingga valuasi saham naik. Kenaikannya moderat.",
   "Bunga pasar uang ikut turun, sehingga imbal hasil RD pasar uang sedikit berkurang.",
   "Sebagian dana pindah ke aset aman, sehingga harga emas naik.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K004",
  "cat": "Moneter",
  "color": "#1D4E9A",
  "title": "BI Rate Turun 50 bps",
  "narr": "BI memangkas suku bunga agresif untuk mendorong pertumbuhan.",
  "why": "Pemangkasan besar memicu reli saham karena biaya dana turun tajam. Imbal hasil pasar uang turun.",
  "fx": [
   0,
   12.0,
   -0.3,
   3.5,
   6.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Kondisi moneter yang lebih longgar atau stabil menurunkan biaya dana perusahaan, sehingga valuasi saham naik. Kenaikannya cukup besar.",
   "Bunga pasar uang ikut turun, sehingga imbal hasil RD pasar uang sedikit berkurang.",
   "Sebagian dana pindah ke aset aman, sehingga harga emas naik.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K005",
  "cat": "Moneter",
  "color": "#1D4E9A",
  "title": "BI Rate Ditahan",
  "narr": "BI mempertahankan suku bunga sesuai ekspektasi pasar.",
  "why": "Tidak ada kejutan kebijakan. Pasar tenang dan cenderung sedikit positif karena ketidakpastian berkurang.",
  "fx": [
   0,
   3.0,
   0,
   0,
   1.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Kondisi moneter yang lebih longgar atau stabil menurunkan biaya dana perusahaan, sehingga valuasi saham naik. Kenaikannya tipis.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Kabar ini tidak banyak menggerakkan harga emas.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K006",
  "cat": "Moneter",
  "color": "#1D4E9A",
  "title": "The Fed Naikkan Suku Bunga",
  "narr": "Bank sentral AS menaikkan suku bunga; dolar AS menguat.",
  "why": "Selisih imbal hasil RI–AS menyempit → investor asing menarik dana dari pasar saham. Emas tertekan karena dolar kuat. Pemegang sukuk negara ritel tidak terdampak: imbalan tetap dibayar.",
  "fx": [
   0,
   -6.0,
   0.1,
   -7.0,
   -3.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Suku bunga atau kurs yang menekan membuat biaya pinjaman perusahaan naik dan investor mengurangi saham. Penurunannya moderat.",
   "Bunga deposito dan pasar uang naik, sehingga imbal hasil RD pasar uang sedikit lebih tinggi dari biasanya.",
   "Optimisme naik atau dolar menguat, sehingga emas banyak dilepas dan harganya turun cukup dalam.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K007",
  "cat": "Moneter",
  "color": "#1D4E9A",
  "title": "The Fed Pangkas Suku Bunga",
  "narr": "The Fed menurunkan suku bunga; dolar AS melemah.",
  "why": "Dana global mencari imbal hasil lebih tinggi di negara berkembang, termasuk saham Indonesia. Emas naik karena bunga riil turun.",
  "fx": [
   0,
   18.0,
   0,
   9.5,
   9.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Kondisi moneter yang lebih longgar atau stabil menurunkan biaya dana perusahaan, sehingga valuasi saham naik. Kenaikannya tajam.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Investor berbondong mencari aset pelindung nilai, sehingga harga emas melonjak.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K008",
  "cat": "Moneter",
  "color": "#1D4E9A",
  "title": "Sinyal 'Higher for Longer'",
  "narr": "Bank sentral global memberi sinyal suku bunga tinggi bertahan lama.",
  "why": "Harapan penurunan bunga pupus → saham terkoreksi. Emas tertekan karena opportunity cost memegang emas naik. Pemegang sukuk negara ritel tidak terdampak: imbalan tetap dibayar.",
  "fx": [
   0,
   -6.0,
   0.2,
   -5.0,
   -3.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Suku bunga atau kurs yang menekan membuat biaya pinjaman perusahaan naik dan investor mengurangi saham. Penurunannya moderat.",
   "Bunga deposito dan pasar uang naik, sehingga imbal hasil RD pasar uang sedikit lebih tinggi dari biasanya.",
   "Optimisme naik atau dolar menguat, sehingga emas banyak dilepas dan harganya turun cukup dalam.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K009",
  "cat": "Moneter",
  "color": "#1D4E9A",
  "title": "Likuiditas Perbankan Ketat",
  "narr": "Bank berebut dana pihak ketiga; bunga deposito naik.",
  "why": "Likuiditas ketat menaikkan yield pasar dan menekan harga aset berisiko. Reksa dana pasar uang menikmati bunga deposito yang lebih tinggi.",
  "fx": [
   0,
   -4.0,
   0.4,
   0,
   -2.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Suku bunga atau kurs yang menekan membuat biaya pinjaman perusahaan naik dan investor mengurangi saham. Penurunannya moderat.",
   "Bunga deposito dan pasar uang naik, sehingga imbal hasil RD pasar uang sedikit lebih tinggi dari biasanya.",
   "Kabar ini tidak banyak menggerakkan harga emas.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K010",
  "cat": "Moneter",
  "color": "#1D4E9A",
  "title": "Pelonggaran Makroprudensial",
  "narr": "BI melonggarkan giro wajib minimum dan aturan kredit.",
  "why": "Likuiditas bank bertambah sehingga kredit dan konsumsi terdorong. Saham, terutama perbankan, naik.",
  "fx": [
   0,
   4.0,
   -0.1,
   0,
   2.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Kondisi moneter yang lebih longgar atau stabil menurunkan biaya dana perusahaan, sehingga valuasi saham naik. Kenaikannya moderat.",
   "Bunga pasar uang ikut turun, sehingga imbal hasil RD pasar uang sedikit berkurang.",
   "Kabar ini tidak banyak menggerakkan harga emas.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K011",
  "cat": "Moneter",
  "color": "#1D4E9A",
  "title": "Intervensi Rupiah Berhasil",
  "narr": "BI melakukan intervensi triple intervention; rupiah kembali stabil.",
  "why": "Stabilitas kurs mengurangi risiko nilai tukar bagi investor asing, sehingga dana kembali ke pasar saham. Emas dalam rupiah sedikit turun.",
  "fx": [
   0,
   4.0,
   0,
   -2.5,
   2.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Kondisi moneter yang lebih longgar atau stabil menurunkan biaya dana perusahaan, sehingga valuasi saham naik. Kenaikannya moderat.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Saat suasana pasar membaik atau dolar menguat, emas kurang diminati dan harganya turun.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K012",
  "cat": "Moneter",
  "color": "#1D4E9A",
  "title": "Kurva Yield Mendatar",
  "narr": "Yield jangka pendek naik mendekati jangka panjang; pasar khawatir perlambatan.",
  "why": "Pasar khawatir perlambatan ekonomi → saham tertekan kekhawatiran laba, emas diburu. Pemegang sukuk negara ritel tidak terdampak: imbalan tetap dibayar.",
  "fx": [
   0,
   -6.0,
   0,
   5.0,
   -3.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Suku bunga atau kurs yang menekan membuat biaya pinjaman perusahaan naik dan investor mengurangi saham. Penurunannya moderat.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Investor berbondong mencari aset pelindung nilai, sehingga harga emas melonjak.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K013",
  "cat": "Moneter",
  "color": "#1D4E9A",
  "title": "Rupiah Melemah Tajam",
  "narr": "Rupiah menyentuh level terlemah dalam beberapa tahun.",
  "why": "Asing keluar dari aset rupiah sehingga saham turun. Emas yang dihargai dalam dolar melonjak bila dihitung dalam rupiah: lindung nilai klasik. Pemegang sukuk negara ritel tidak terdampak: imbalan tetap dibayar.",
  "fx": [
   0,
   -12.0,
   0.2,
   12.0,
   -6.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Suku bunga atau kurs yang menekan membuat biaya pinjaman perusahaan naik dan investor mengurangi saham. Penurunannya cukup besar.",
   "Bunga deposito dan pasar uang naik, sehingga imbal hasil RD pasar uang sedikit lebih tinggi dari biasanya.",
   "Investor berbondong mencari aset pelindung nilai, sehingga harga emas melonjak.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K014",
  "cat": "Moneter",
  "color": "#1D4E9A",
  "title": "Rupiah Menguat",
  "narr": "Arus modal asing deras masuk; rupiah menguat.",
  "why": "Aliran dana asing mengangkat harga saham. Harga emas dalam rupiah turun karena kurs dolar lebih murah.",
  "fx": [
   0,
   10.0,
   0,
   -5.0,
   5.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Kondisi moneter yang lebih longgar atau stabil menurunkan biaya dana perusahaan, sehingga valuasi saham naik. Kenaikannya cukup besar.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Optimisme naik atau dolar menguat, sehingga emas banyak dilepas dan harganya turun cukup dalam.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K015",
  "cat": "Moneter",
  "color": "#1D4E9A",
  "title": "Operasi Moneter Serap Likuiditas",
  "narr": "BI menerbitkan instrumen moneter berimbal hasil tinggi dalam jumlah besar.",
  "why": "Instrumen BI berimbal hasil tinggi menyerap likuiditas pasar sehingga saham kekurangan dana baru. Imbal hasil pasar uang naik.",
  "fx": [
   0,
   -3.0,
   0.3,
   0,
   -1.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Suku bunga atau kurs yang menekan membuat biaya pinjaman perusahaan naik dan investor mengurangi saham. Penurunannya tipis.",
   "Bunga deposito dan pasar uang naik, sehingga imbal hasil RD pasar uang sedikit lebih tinggi dari biasanya.",
   "Kabar ini tidak banyak menggerakkan harga emas.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K016",
  "cat": "Makro",
  "color": "#0E6E8C",
  "title": "Inflasi Pangan Melonjak",
  "narr": "Harga beras dan cabai naik tajam; inflasi di atas target.",
  "why": "Inflasi menggerus daya beli sehingga laba emiten konsumer tertekan. Emas diburu sebagai pelindung nilai.",
  "fx": [
   0,
   -4.0,
   0.1,
   5.0,
   -2.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Ekonomi yang melemah menekan penjualan dan laba perusahaan, sehingga harga saham turun. Penurunannya moderat.",
   "Bunga deposito dan pasar uang naik, sehingga imbal hasil RD pasar uang sedikit lebih tinggi dari biasanya.",
   "Investor berbondong mencari aset pelindung nilai, sehingga harga emas melonjak.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K017",
  "cat": "Makro",
  "color": "#0E6E8C",
  "title": "Inflasi Rendah & Stabil",
  "narr": "Inflasi terkendali di dalam sasaran BI.",
  "why": "Inflasi rendah membuka ruang penurunan bunga, positif untuk saham. Permintaan emas sebagai pelindung inflasi berkurang.",
  "fx": [
   0,
   4.0,
   0,
   -1.0,
   2.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Ekonomi yang lebih kuat berarti penjualan dan laba perusahaan naik, sehingga investor membeli saham. Kenaikannya moderat.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Saat suasana pasar membaik atau dolar menguat, emas kurang diminati dan harganya turun.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K018",
  "cat": "Makro",
  "color": "#0E6E8C",
  "title": "PDB Tumbuh di Atas Ekspektasi",
  "narr": "Ekonomi tumbuh lebih cepat dari perkiraan.",
  "why": "Laba perusahaan diperkirakan naik → saham reli. Aset lindung nilai seperti emas kurang diminati.",
  "fx": [
   0,
   10.0,
   0,
   -2.5,
   5.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Ekonomi yang lebih kuat berarti penjualan dan laba perusahaan naik, sehingga investor membeli saham. Kenaikannya cukup besar.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Saat suasana pasar membaik atau dolar menguat, emas kurang diminati dan harganya turun.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K019",
  "cat": "Makro",
  "color": "#0E6E8C",
  "title": "PDB Melambat",
  "narr": "Pertumbuhan ekonomi kuartal ini di bawah ekspektasi.",
  "why": "Prospek laba melemah → saham turun. Investor beralih ke aset aman seperti emas dan surat berharga negara.",
  "fx": [
   0,
   -10.0,
   0,
   3.5,
   -5.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Ekonomi yang melemah menekan penjualan dan laba perusahaan, sehingga harga saham turun. Penurunannya cukup besar.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Sebagian dana pindah ke aset aman, sehingga harga emas naik.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K020",
  "cat": "Makro",
  "color": "#0E6E8C",
  "title": "Konsumsi Rumah Tangga Lesu",
  "narr": "Penjualan ritel dan kendaraan melemah.",
  "why": "Konsumsi adalah motor utama PDB Indonesia; pelemahannya menekan saham sektor konsumer dan ritel.",
  "fx": [
   0,
   -6.0,
   0,
   1.0,
   -3.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Ekonomi yang melemah menekan penjualan dan laba perusahaan, sehingga harga saham turun. Penurunannya moderat.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Sebagian dana pindah ke aset aman, sehingga harga emas naik.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K021",
  "cat": "Makro",
  "color": "#0E6E8C",
  "title": "Surplus Neraca Dagang Besar",
  "narr": "Ekspor melonjak; neraca perdagangan surplus besar.",
  "why": "Pasokan valas bertambah sehingga rupiah stabil. Risiko eksternal turun, positif bagi saham.",
  "fx": [
   0,
   3.0,
   0,
   -1.0,
   1.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Ekonomi yang lebih kuat berarti penjualan dan laba perusahaan naik, sehingga investor membeli saham. Kenaikannya tipis.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Saat suasana pasar membaik atau dolar menguat, emas kurang diminati dan harganya turun.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K022",
  "cat": "Makro",
  "color": "#0E6E8C",
  "title": "Defisit Transaksi Berjalan Melebar",
  "narr": "Impor naik lebih cepat dari ekspor.",
  "why": "Kebutuhan valas meningkat → rupiah rentan melemah → investor asing mengurangi porsi saham Indonesia. Pemegang sukuk negara ritel tidak terdampak: imbalan tetap dibayar.",
  "fx": [
   0,
   -5.0,
   0,
   2.5,
   -2.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Ekonomi yang melemah menekan penjualan dan laba perusahaan, sehingga harga saham turun. Penurunannya moderat.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Sebagian dana pindah ke aset aman, sehingga harga emas naik.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K023",
  "cat": "Makro",
  "color": "#0E6E8C",
  "title": "Keyakinan Konsumen Melonjak",
  "narr": "Indeks keyakinan konsumen mencapai level tertinggi.",
  "why": "Konsumen yang optimistis cenderung belanja lebih banyak, sehingga prospek laba emiten konsumer membaik.",
  "fx": [
   0,
   6.0,
   0,
   -1.0,
   3.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Ekonomi yang lebih kuat berarti penjualan dan laba perusahaan naik, sehingga investor membeli saham. Kenaikannya moderat.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Saat suasana pasar membaik atau dolar menguat, emas kurang diminati dan harganya turun.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K024",
  "cat": "Makro",
  "color": "#0E6E8C",
  "title": "PMI Manufaktur Ekspansi",
  "narr": "Aktivitas pabrik meningkat beberapa bulan berturut-turut.",
  "why": "Ekspansi manufaktur menandakan permintaan kuat dan laba emiten naik. Aset aman kurang diminati.",
  "fx": [
   0,
   6.0,
   0,
   -1.0,
   3.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Ekonomi yang lebih kuat berarti penjualan dan laba perusahaan naik, sehingga investor membeli saham. Kenaikannya moderat.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Saat suasana pasar membaik atau dolar menguat, emas kurang diminati dan harganya turun.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K025",
  "cat": "Makro",
  "color": "#0E6E8C",
  "title": "PHK di Sektor Padat Karya",
  "narr": "Gelombang PHK di industri tekstil dan alas kaki.",
  "why": "Pendapatan rumah tangga turun sehingga konsumsi melemah. Saham tertekan, investor mencari aset aman.",
  "fx": [
   0,
   -8.0,
   0,
   2.5,
   -4.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Ekonomi yang melemah menekan penjualan dan laba perusahaan, sehingga harga saham turun. Penurunannya cukup besar.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Sebagian dana pindah ke aset aman, sehingga harga emas naik.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K026",
  "cat": "Makro",
  "color": "#0E6E8C",
  "title": "Harga BBM Subsidi Naik",
  "narr": "Pemerintah menyesuaikan harga BBM bersubsidi.",
  "why": "Inflasi jangka pendek naik dan daya beli tertekan, sehingga saham konsumer turun.",
  "fx": [
   0,
   -6.0,
   0.1,
   2.5,
   -3.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Ekonomi yang melemah menekan penjualan dan laba perusahaan, sehingga harga saham turun. Penurunannya moderat.",
   "Bunga deposito dan pasar uang naik, sehingga imbal hasil RD pasar uang sedikit lebih tinggi dari biasanya.",
   "Sebagian dana pindah ke aset aman, sehingga harga emas naik.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K027",
  "cat": "Makro",
  "color": "#0E6E8C",
  "title": "Musim Belanja Ramai",
  "narr": "Konsumsi melonjak saat musim hari raya dan liburan.",
  "why": "Penjualan ritel, transportasi, dan makanan-minuman naik, mendorong saham sektor konsumer.",
  "fx": [
   0,
   5.0,
   0,
   0,
   2.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Ekonomi yang lebih kuat berarti penjualan dan laba perusahaan naik, sehingga investor membeli saham. Kenaikannya moderat.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Kabar ini tidak banyak menggerakkan harga emas.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K028",
  "cat": "Makro",
  "color": "#0E6E8C",
  "title": "Deflasi Beruntun",
  "narr": "Indeks harga turun beberapa bulan berturut-turut.",
  "why": "Deflasi karena permintaan lemah menandakan ekonomi lesu, sehingga laba emiten melemah.",
  "fx": [
   0,
   -5.0,
   -0.1,
   1.0,
   -2.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Ekonomi yang melemah menekan penjualan dan laba perusahaan, sehingga harga saham turun. Penurunannya moderat.",
   "Bunga pasar uang ikut turun, sehingga imbal hasil RD pasar uang sedikit berkurang.",
   "Sebagian dana pindah ke aset aman, sehingga harga emas naik.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K029",
  "cat": "Makro",
  "color": "#0E6E8C",
  "title": "Investasi Asing Langsung Rekor",
  "narr": "Realisasi investasi asing (FDI) mencapai rekor.",
  "why": "FDI membawa valas, lapangan kerja, dan kepercayaan investor. Rupiah stabil dan saham naik.",
  "fx": [
   0,
   6.0,
   0,
   -1.0,
   3.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Ekonomi yang lebih kuat berarti penjualan dan laba perusahaan naik, sehingga investor membeli saham. Kenaikannya moderat.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Saat suasana pasar membaik atau dolar menguat, emas kurang diminati dan harganya turun.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K030",
  "cat": "Makro",
  "color": "#0E6E8C",
  "title": "Kredit Perbankan Tumbuh Tinggi",
  "narr": "Penyaluran kredit tumbuh dua digit.",
  "why": "Kredit yang tumbuh mencerminkan ekspansi usaha dan mendorong laba bank sebagai saham berbobot terbesar di bursa.",
  "fx": [
   0,
   6.0,
   0.1,
   0,
   3.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Ekonomi yang lebih kuat berarti penjualan dan laba perusahaan naik, sehingga investor membeli saham. Kenaikannya moderat.",
   "Bunga deposito dan pasar uang naik, sehingga imbal hasil RD pasar uang sedikit lebih tinggi dari biasanya.",
   "Kabar ini tidak banyak menggerakkan harga emas.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K031",
  "cat": "Pasar Modal",
  "color": "#3B3FB6",
  "title": "Aksi Jual Asing di Bursa",
  "narr": "Investor asing mencatat penjualan bersih besar di pasar saham.",
  "why": "Tekanan jual asing menurunkan indeks saham, terutama saham berkapitalisasi besar. Sebagian dana beralih ke aset aman.",
  "fx": [
   0,
   -12.0,
   0,
   2.5,
   -6.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Tekanan jual di bursa menurunkan harga saham. Penurunannya cukup besar.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Sebagian dana pindah ke aset aman, sehingga harga emas naik.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K032",
  "cat": "Pasar Modal",
  "color": "#3B3FB6",
  "title": "Laba Emiten di Atas Ekspektasi",
  "narr": "Musim laporan keuangan: mayoritas emiten mencetak laba melampaui estimasi.",
  "why": "Harga saham pada akhirnya mengikuti laba. Laba yang lebih baik dari perkiraan mendorong reli.",
  "fx": [
   0,
   10.0,
   0,
   -1.0,
   5.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Permintaan di bursa meningkat sehingga harga saham terdorong naik. Kenaikannya cukup besar.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Saat suasana pasar membaik atau dolar menguat, emas kurang diminati dan harganya turun.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K033",
  "cat": "Pasar Modal",
  "color": "#3B3FB6",
  "title": "Laba Emiten Mengecewakan",
  "narr": "Banyak emiten melaporkan laba di bawah perkiraan analis.",
  "why": "Revisi turun ekspektasi laba menurunkan harga wajar saham. Investor berpindah ke instrumen pendapatan tetap.",
  "fx": [
   0,
   -8.0,
   0,
   1.0,
   -4.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Tekanan jual di bursa menurunkan harga saham. Penurunannya cukup besar.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Sebagian dana pindah ke aset aman, sehingga harga emas naik.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K034",
  "cat": "Pasar Modal",
  "color": "#3B3FB6",
  "title": "IPO Jumbo Serap Likuiditas",
  "narr": "Beberapa IPO berukuran besar menyedot dana investor.",
  "why": "Investor menjual saham lama untuk membeli saham IPO, sehingga indeks tertekan sementara.",
  "fx": [
   0,
   -4.0,
   0,
   0,
   -2.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Tekanan jual di bursa menurunkan harga saham. Penurunannya moderat.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Kabar ini tidak banyak menggerakkan harga emas.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K035",
  "cat": "Pasar Modal",
  "color": "#3B3FB6",
  "title": "Bobot Indonesia di Indeks Global Naik",
  "narr": "Penyedia indeks global menaikkan bobot saham Indonesia.",
  "why": "Dana pasif global yang mengikuti indeks wajib membeli saham Indonesia → arus masuk besar.",
  "fx": [
   0,
   8.0,
   0,
   -1.0,
   4.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Permintaan di bursa meningkat sehingga harga saham terdorong naik. Kenaikannya cukup besar.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Saat suasana pasar membaik atau dolar menguat, emas kurang diminati dan harganya turun.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K036",
  "cat": "Pasar Modal",
  "color": "#3B3FB6",
  "title": "Window Dressing Akhir Tahun",
  "narr": "Manajer investasi mempercantik portofolio menjelang tutup buku.",
  "why": "Pembelian saham unggulan menjelang akhir periode cenderung mengangkat harga secara musiman.",
  "fx": [
   0,
   6.0,
   0,
   0,
   3.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Permintaan di bursa meningkat sehingga harga saham terdorong naik. Kenaikannya moderat.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Kabar ini tidak banyak menggerakkan harga emas.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K037",
  "cat": "Pasar Modal",
  "color": "#3B3FB6",
  "title": "Skandal Saham Gorengan",
  "narr": "Otoritas membongkar manipulasi harga beberapa saham.",
  "why": "Kepercayaan investor ritel turun dan saham-saham spekulatif anjlok. Pelajaran: pilih saham berfundamental baik.",
  "fx": [
   0,
   -8.0,
   0,
   1.0,
   -4.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Tekanan jual di bursa menurunkan harga saham. Penurunannya cukup besar.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Sebagian dana pindah ke aset aman, sehingga harga emas naik.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K038",
  "cat": "Pasar Modal",
  "color": "#3B3FB6",
  "title": "Skandal Manajer Investasi",
  "narr": "Sebuah manajer investasi terjerat kasus; investor reksa dana panik menarik dana.",
  "why": "Redemption massal memaksa manajer investasi menjual aset, sehingga NAB reksa dana tertekan, termasuk campuran. Pelajaran: cek izin OJK dan rekam jejak MI.",
  "fx": [
   0,
   -3.0,
   -0.4,
   1.0,
   -1.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Tekanan jual di bursa menurunkan harga saham. Penurunannya tipis.",
   "Bunga pasar uang ikut turun, sehingga imbal hasil RD pasar uang sedikit berkurang.",
   "Sebagian dana pindah ke aset aman, sehingga harga emas naik.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K039",
  "cat": "Pasar Modal",
  "color": "#3B3FB6",
  "title": "SBN Masuk Indeks Obligasi Global",
  "narr": "Bobot SBN dalam indeks obligasi global dinaikkan.",
  "why": "Dana global pengikut indeks wajib membeli SBN → rupiah menguat dan sentimen positif menjalar ke saham. Pasar SBN makin dalam dan likuid.",
  "fx": [
   0,
   3.0,
   0,
   -1.0,
   1.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Permintaan di bursa meningkat sehingga harga saham terdorong naik. Kenaikannya tipis.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Saat suasana pasar membaik atau dolar menguat, emas kurang diminati dan harganya turun.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K040",
  "cat": "Pasar Modal",
  "color": "#3B3FB6",
  "title": "Asing Lepas SBN Besar-besaran",
  "narr": "Kepemilikan asing di SBN turun tajam dalam sebulan.",
  "why": "Penjualan asing menekan rupiah dan sentimen pasar, sehingga saham ikut turun. Makin besar basis investor domestik (termasuk pembeli sukuk ritel), makin kecil guncangan semacam ini. Pemegang sukuk negara ritel tidak terdampak: imbalan tetap dibayar.",
  "fx": [
   0,
   -3.0,
   0,
   2.0,
   -1.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Tekanan jual di bursa menurunkan harga saham. Penurunannya tipis.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Sebagian dana pindah ke aset aman, sehingga harga emas naik.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K041",
  "cat": "Pasar Modal",
  "color": "#3B3FB6",
  "title": "Dividen Jumbo BUMN",
  "narr": "BUMN besar membagikan dividen dengan rasio pembayaran tinggi.",
  "why": "Dividen tinggi menarik investor ke saham berfundamental kuat. Imbal hasil saham = kenaikan harga + dividen.",
  "fx": [
   0,
   5.0,
   0,
   0,
   2.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Permintaan di bursa meningkat sehingga harga saham terdorong naik. Kenaikannya moderat.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Kabar ini tidak banyak menggerakkan harga emas.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K042",
  "cat": "Pasar Modal",
  "color": "#3B3FB6",
  "title": "Wall Street Koreksi Tajam",
  "narr": "Indeks saham AS turun lebih dari 10% dalam beberapa pekan.",
  "why": "Sentimen risk-off menular ke bursa global termasuk Indonesia. Investor berlindung ke emas dan obligasi pemerintah.",
  "fx": [
   0,
   -15.0,
   0,
   4.0,
   -7.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Tekanan jual di bursa menurunkan harga saham. Penurunannya tajam.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Investor berbondong mencari aset pelindung nilai, sehingga harga emas melonjak.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K043",
  "cat": "Pasar Modal",
  "color": "#3B3FB6",
  "title": "Reli Bursa Global",
  "narr": "Bursa global kompak menguat; investor kembali berani ambil risiko.",
  "why": "Sentimen risk-on mendorong arus dana ke saham negara berkembang. Emas sebagai aset lindung nilai ditinggalkan.",
  "fx": [
   0,
   15.0,
   0,
   -5.0,
   7.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Permintaan di bursa meningkat sehingga harga saham terdorong naik. Kenaikannya tajam.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Optimisme naik atau dolar menguat, sehingga emas banyak dilepas dan harganya turun cukup dalam.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K044",
  "cat": "Pasar Modal",
  "color": "#3B3FB6",
  "title": "Buyback Saham Massal",
  "narr": "Regulator mengizinkan emiten membeli kembali saham tanpa RUPS.",
  "why": "Buyback menambah permintaan saham dan menjadi sinyal bahwa manajemen menilai sahamnya murah.",
  "fx": [
   0,
   6.0,
   0,
   0,
   3.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Permintaan di bursa meningkat sehingga harga saham terdorong naik. Kenaikannya moderat.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Kabar ini tidak banyak menggerakkan harga emas.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K045",
  "cat": "Pasar Modal",
  "color": "#3B3FB6",
  "title": "Trading Halt Bursa",
  "narr": "Indeks anjlok lebih dari 5% dalam sehari; perdagangan dihentikan sementara.",
  "why": "Kepanikan jual memicu penghentian perdagangan. Aset aman seperti SBN dan emas menjadi tujuan pelarian dana.",
  "fx": [
   0,
   -15.0,
   0,
   3.0,
   -7.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun tetap dibayar negara. Gejolak di bursa saham tidak mengubah imbalan sukuk.",
   "Kepanikan jual membuat harga saham jatuh dalam hingga bursa harus menghentikan perdagangan.",
   "Dana di deposito dan pasar uang tetap menerima bunga dan tidak terkait harga saham.",
   "Investor memindahkan dana ke aset aman, sehingga permintaan emas naik.",
   "Separuh isinya saham ikut jatuh, tetapi separuh sukuk meredam penurunannya."
  ]
 },
 {
  "id": "K046",
  "cat": "Geopolitik",
  "color": "#8A3FC6",
  "title": "Konflik di Timur Tengah",
  "narr": "Konflik bersenjata pecah; harga minyak dunia melonjak.",
  "why": "Emas adalah aset lindung nilai utama saat krisis geopolitik. Minyak mahal menambah beban subsidi dan inflasi, sehingga saham tertekan. Pemegang sukuk negara ritel tidak terdampak: imbalan tetap dibayar.",
  "fx": [
   0,
   -6.0,
   0,
   14.5,
   -3.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Ketidakpastian global membuat investor menjual aset berisiko seperti saham. Penurunannya moderat.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Investor berbondong mencari aset pelindung nilai, sehingga harga emas melonjak.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K047",
  "cat": "Geopolitik",
  "color": "#8A3FC6",
  "title": "Perang Dagang Memanas",
  "narr": "AS dan Tiongkok saling menaikkan tarif impor.",
  "why": "Perdagangan global melambat, permintaan ekspor Indonesia terancam. Investor lari ke emas.",
  "fx": [
   0,
   -8.0,
   0,
   7.0,
   -4.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Ketidakpastian global membuat investor menjual aset berisiko seperti saham. Penurunannya cukup besar.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Investor berbondong mencari aset pelindung nilai, sehingga harga emas melonjak.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K048",
  "cat": "Geopolitik",
  "color": "#8A3FC6",
  "title": "Ketegangan Dagang Mereda",
  "narr": "AS dan Tiongkok menyepakati gencatan tarif.",
  "why": "Ketidakpastian turun dan prospek perdagangan global membaik. Saham negara berkembang reli, emas terkoreksi.",
  "fx": [
   0,
   10.0,
   0,
   -5.0,
   5.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Ketidakpastian global mereda dan dana asing kembali masuk, investor berani membeli saham. Kenaikannya cukup besar.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Optimisme naik atau dolar menguat, sehingga emas banyak dilepas dan harganya turun cukup dalam.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K049",
  "cat": "Geopolitik",
  "color": "#8A3FC6",
  "title": "Resesi di Amerika Serikat",
  "narr": "Ekonomi AS resmi masuk resesi.",
  "why": "Permintaan global melemah sehingga saham turun. Bank sentral diperkirakan memangkas bunga, positif bagi emas.",
  "fx": [
   0,
   -12.0,
   0,
   9.5,
   -6.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Ketidakpastian global membuat investor menjual aset berisiko seperti saham. Penurunannya cukup besar.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Investor berbondong mencari aset pelindung nilai, sehingga harga emas melonjak.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K050",
  "cat": "Geopolitik",
  "color": "#8A3FC6",
  "title": "Ekonomi Tiongkok Melambat",
  "narr": "Pertumbuhan Tiongkok, mitra dagang terbesar RI, melambat.",
  "why": "Permintaan batu bara, nikel, dan CPO turun sehingga saham komoditas dan ekspor tertekan.",
  "fx": [
   0,
   -5.0,
   0,
   2.5,
   -2.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Ketidakpastian global membuat investor menjual aset berisiko seperti saham. Penurunannya moderat.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Sebagian dana pindah ke aset aman, sehingga harga emas naik.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K051",
  "cat": "Geopolitik",
  "color": "#8A3FC6",
  "title": "Stimulus Besar Tiongkok",
  "narr": "Tiongkok mengumumkan stimulus ekonomi jumbo.",
  "why": "Permintaan komoditas diperkirakan naik, positif bagi emiten tambang dan perkebunan Indonesia.",
  "fx": [
   0,
   8.0,
   0,
   2.5,
   4.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Ketidakpastian global mereda dan dana asing kembali masuk, investor berani membeli saham. Kenaikannya cukup besar.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Sebagian dana pindah ke aset aman, sehingga harga emas naik.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K052",
  "cat": "Geopolitik",
  "color": "#8A3FC6",
  "title": "Krisis Utang Negara Berkembang",
  "narr": "Sebuah negara berkembang gagal bayar utang; kepanikan menular.",
  "why": "Efek penularan: investor menjual aset seluruh negara berkembang tanpa membedakan fundamental. Saham turun, emas naik. Pemegang sukuk negara ritel tidak terdampak: imbalan tetap dibayar.",
  "fx": [
   0,
   -10.0,
   0,
   5.0,
   -5.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Ketidakpastian global membuat investor menjual aset berisiko seperti saham. Penurunannya cukup besar.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Investor berbondong mencari aset pelindung nilai, sehingga harga emas melonjak.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K053",
  "cat": "Geopolitik",
  "color": "#8A3FC6",
  "title": "Ketegangan Laut China Selatan",
  "narr": "Insiden militer meningkatkan ketegangan kawasan.",
  "why": "Risiko geopolitik kawasan menaikkan premi risiko aset Indonesia. Emas diuntungkan.",
  "fx": [
   0,
   -4.0,
   0,
   6.0,
   -2.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Ketidakpastian global membuat investor menjual aset berisiko seperti saham. Penurunannya moderat.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Investor berbondong mencari aset pelindung nilai, sehingga harga emas melonjak.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K054",
  "cat": "Geopolitik",
  "color": "#8A3FC6",
  "title": "Hasil Pemilu Mengejutkan",
  "narr": "Pemilu di negara ekonomi besar menghasilkan kejutan.",
  "why": "Ketidakpastian arah kebijakan global membuat investor mengurangi risiko sementara.",
  "fx": [
   0,
   -4.0,
   0,
   5.0,
   -2.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Ketidakpastian global membuat investor menjual aset berisiko seperti saham. Penurunannya moderat.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Investor berbondong mencari aset pelindung nilai, sehingga harga emas melonjak.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K055",
  "cat": "Geopolitik",
  "color": "#8A3FC6",
  "title": "Perjanjian Dagang Baru",
  "narr": "Indonesia menandatangani perjanjian dagang komprehensif dengan blok ekonomi besar.",
  "why": "Akses pasar ekspor meluas dan investasi berpotensi masuk, sehingga prospek pertumbuhan jangka panjang membaik.",
  "fx": [
   0,
   5.0,
   0,
   -1.0,
   2.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Ketidakpastian global mereda dan dana asing kembali masuk, investor berani membeli saham. Kenaikannya moderat.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Saat suasana pasar membaik atau dolar menguat, emas kurang diminati dan harganya turun.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K056",
  "cat": "Geopolitik",
  "color": "#8A3FC6",
  "title": "Krisis Perbankan di Negara Maju",
  "narr": "Beberapa bank di negara maju kolaps.",
  "why": "Ketakutan sistemik mendorong investor ke emas. Bank sentral cenderung melonggarkan kebijakan, menopang obligasi.",
  "fx": [
   0,
   -8.0,
   0,
   12.0,
   -4.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Ketidakpastian global membuat investor menjual aset berisiko seperti saham. Penurunannya cukup besar.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Investor berbondong mencari aset pelindung nilai, sehingga harga emas melonjak.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K057",
  "cat": "Geopolitik",
  "color": "#8A3FC6",
  "title": "Dolar AS Melemah Global",
  "narr": "Indeks dolar turun ke level terendah beberapa tahun.",
  "why": "Mata uang negara berkembang menguat dan dana global mengalir masuk. Emas dalam dolar naik, tetapi rupiah juga menguat, jadi kenaikan dalam rupiah terbatas.",
  "fx": [
   0,
   5.0,
   0,
   3.5,
   2.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Ketidakpastian global mereda dan dana asing kembali masuk, investor berani membeli saham. Kenaikannya moderat.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Sebagian dana pindah ke aset aman, sehingga harga emas naik.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K058",
  "cat": "Geopolitik",
  "color": "#8A3FC6",
  "title": "Bank Sentral Dunia Borong Emas",
  "narr": "Bank-bank sentral mencatat pembelian emas terbesar dalam dekade ini.",
  "why": "Diversifikasi cadangan devisa ke emas menandakan kekhawatiran global; sebagian dana beralih dari saham ke aset aman.",
  "fx": [
   0,
   -2.0,
   0,
   9.5,
   -1.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Ketidakpastian global membuat investor menjual aset berisiko seperti saham. Penurunannya tipis.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Investor berbondong mencari aset pelindung nilai, sehingga harga emas melonjak.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K059",
  "cat": "Geopolitik",
  "color": "#8A3FC6",
  "title": "Gencatan Senjata Global",
  "narr": "Konflik besar berakhir dengan kesepakatan damai.",
  "why": "Premi risiko geopolitik turun. Emas terkoreksi, aset berisiko menguat.",
  "fx": [
   0,
   5.0,
   0,
   -7.0,
   2.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Ketidakpastian global mereda dan dana asing kembali masuk, investor berani membeli saham. Kenaikannya moderat.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Optimisme naik atau dolar menguat, sehingga emas banyak dilepas dan harganya turun cukup dalam.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K060",
  "cat": "Geopolitik",
  "color": "#8A3FC6",
  "title": "Serangan Siber ke Sistem Keuangan",
  "narr": "Serangan siber mengganggu sistem pembayaran di beberapa negara.",
  "why": "Kepercayaan terhadap sistem keuangan digital goyah sementara, investor beralih ke aset fisik seperti emas.",
  "fx": [
   0,
   -5.0,
   0,
   5.0,
   -2.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Ketidakpastian global membuat investor menjual aset berisiko seperti saham. Penurunannya moderat.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Investor berbondong mencari aset pelindung nilai, sehingga harga emas melonjak.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K061",
  "cat": "Komoditas",
  "color": "#A15C07",
  "title": "Booming Komoditas",
  "narr": "Harga batu bara dan CPO melonjak tajam.",
  "why": "Laba emiten komoditas melesat. Penerimaan negara (pajak dan PNBP) naik sehingga kebutuhan penerbitan SBN berkurang.",
  "fx": [
   0,
   15.0,
   0,
   2.5,
   7.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Laba emiten komoditas dan ekspor membaik, mengangkat harga saham. Kenaikannya tajam.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Sebagian dana pindah ke aset aman, sehingga harga emas naik.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K062",
  "cat": "Komoditas",
  "color": "#A15C07",
  "title": "Harga Komoditas Ekspor Anjlok",
  "narr": "Harga batu bara, CPO, dan nikel turun bersamaan.",
  "why": "Laba emiten komoditas dan penerimaan ekspor turun. Penerimaan negara berkurang sehingga defisit berpotensi naik.",
  "fx": [
   0,
   -8.0,
   0,
   0,
   -4.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Laba emiten tertekan oleh gejolak harga komoditas, sehingga saham turun. Penurunannya cukup besar.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Kabar ini tidak banyak menggerakkan harga emas.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K063",
  "cat": "Komoditas",
  "color": "#A15C07",
  "title": "Harga Minyak Melonjak",
  "narr": "Harga minyak mentah dunia naik tajam.",
  "why": "Indonesia adalah net importir minyak: subsidi energi membengkak dan inflasi naik. Saham tertekan, emas naik.",
  "fx": [
   0,
   -4.0,
   0,
   5.0,
   -2.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Laba emiten tertekan oleh gejolak harga komoditas, sehingga saham turun. Penurunannya moderat.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Investor berbondong mencari aset pelindung nilai, sehingga harga emas melonjak.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K064",
  "cat": "Komoditas",
  "color": "#A15C07",
  "title": "Harga Minyak Anjlok",
  "narr": "Harga minyak dunia turun drastis karena kelebihan pasokan.",
  "why": "Beban subsidi dan impor energi berkurang, positif untuk APBN dan inflasi.",
  "fx": [
   0,
   3.0,
   0,
   -2.5,
   1.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Laba emiten komoditas dan ekspor membaik, mengangkat harga saham. Kenaikannya tipis.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Saat suasana pasar membaik atau dolar menguat, emas kurang diminati dan harganya turun.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K065",
  "cat": "Komoditas",
  "color": "#A15C07",
  "title": "Hilirisasi Nikel Sukses",
  "narr": "Smelter baru beroperasi; ekspor produk olahan nikel melonjak.",
  "why": "Nilai tambah ekspor meningkat dan investasi masuk, memperkuat neraca dagang dan prospek jangka panjang.",
  "fx": [
   0,
   4.0,
   0,
   0,
   2.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Laba emiten komoditas dan ekspor membaik, mengangkat harga saham. Kenaikannya moderat.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Kabar ini tidak banyak menggerakkan harga emas.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K066",
  "cat": "Komoditas",
  "color": "#A15C07",
  "title": "El Nino & Gagal Panen",
  "narr": "Kemarau panjang memangkas produksi pangan.",
  "why": "Harga pangan naik sehingga inflasi meningkat dan daya beli tertekan. Emas menjadi pelindung nilai.",
  "fx": [
   0,
   -3.0,
   0,
   3.5,
   -1.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Laba emiten tertekan oleh gejolak harga komoditas, sehingga saham turun. Penurunannya tipis.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Sebagian dana pindah ke aset aman, sehingga harga emas naik.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K067",
  "cat": "Komoditas",
  "color": "#A15C07",
  "title": "Emas Cetak Rekor",
  "narr": "Harga emas dunia menembus rekor tertinggi sepanjang masa.",
  "why": "Ketidakpastian global dan pembelian bank sentral mendorong reli emas; investor memindahkan sebagian dana dari saham ke aset aman.",
  "fx": [
   0,
   -2.0,
   0,
   11.0,
   -1.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Laba emiten tertekan oleh gejolak harga komoditas, sehingga saham turun. Penurunannya tipis.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Investor berbondong mencari aset pelindung nilai, sehingga harga emas melonjak.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K068",
  "cat": "Komoditas",
  "color": "#A15C07",
  "title": "Aksi Ambil Untung Emas",
  "narr": "Harga emas terkoreksi tajam setelah reli panjang.",
  "why": "Investor merealisasikan keuntungan. Aset yang naik terlalu cepat rentan koreksi.",
  "fx": [
   0,
   1.0,
   0,
   -10.0,
   0.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Laba emiten komoditas dan ekspor membaik, mengangkat harga saham. Kenaikannya tipis.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Optimisme naik atau dolar menguat, sehingga emas banyak dilepas dan harganya turun cukup dalam.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K069",
  "cat": "Komoditas",
  "color": "#A15C07",
  "title": "Permintaan Emas Domestik Naik",
  "narr": "Bank bullion dan permintaan perhiasan mendorong pembelian emas.",
  "why": "Masyarakat bersikap defensif dan memilih aset fisik, sehingga pasar saham sedikit sepi pembeli.",
  "fx": [
   0,
   -1.0,
   0,
   6.0,
   -0.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Laba emiten tertekan oleh gejolak harga komoditas, sehingga saham turun. Penurunannya tipis.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Investor berbondong mencari aset pelindung nilai, sehingga harga emas melonjak.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K070",
  "cat": "Komoditas",
  "color": "#A15C07",
  "title": "Harga Nikel Anjlok",
  "narr": "Kelebihan pasokan global menjatuhkan harga nikel.",
  "why": "Emiten tambang nikel tertekan dan penerimaan ekspor berkurang.",
  "fx": [
   0,
   -5.0,
   0,
   0,
   -2.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Laba emiten tertekan oleh gejolak harga komoditas, sehingga saham turun. Penurunannya moderat.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Kabar ini tidak banyak menggerakkan harga emas.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K071",
  "cat": "Fiskal & SBN",
  "color": "#0E7A55",
  "title": "Rating Indonesia Naik",
  "narr": "Lembaga pemeringkat menaikkan peringkat utang Indonesia.",
  "why": "Risiko negara dinilai lebih rendah → biaya utang negara dan korporasi turun, investor asing masuk ke saham. Kredibilitas SBN/sukuk makin kuat.",
  "fx": [
   0,
   5.0,
   0,
   -2.5,
   2.5
  ],
  "r": [
   "Imbalan tetap dibayar. Kredibilitas SBN dan sukuk makin kuat karena risiko negara dinilai lebih rendah.",
   "Biaya utang korporasi turun dan investor asing masuk, sehingga harga saham naik.",
   "Bunga pasar uang stabil; kabar rating tidak banyak mengubah imbal hasilnya.",
   "Saat optimisme naik, sebagian dana keluar dari aset aman seperti emas.",
   "Ikut naik karena separuh isinya saham, ditambah imbalan dari porsi sukuk."
  ]
 },
 {
  "id": "K072",
  "cat": "Fiskal & SBN",
  "color": "#0E7A55",
  "title": "Outlook Rating Diturunkan",
  "narr": "Lembaga pemeringkat menurunkan outlook utang Indonesia menjadi negatif.",
  "why": "Investor menuntut imbal hasil lebih tinggi atas risiko yang dianggap naik, sehingga saham turun. Pemegang sukuk negara ritel tidak terdampak: imbalan tetap dibayar.",
  "fx": [
   0,
   -6.0,
   0,
   2.5,
   -3.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Kekhawatiran soal keuangan negara membuat investor menahan diri dari saham. Penurunannya moderat.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Sebagian dana pindah ke aset aman, sehingga harga emas naik.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K073",
  "cat": "Fiskal & SBN",
  "color": "#0E7A55",
  "title": "Lelang SBSN Oversubscribed",
  "narr": "Lelang sukuk negara kelebihan permintaan beberapa kali lipat.",
  "why": "Permintaan kuat menandakan kepercayaan investor pada ekonomi Indonesia, sentimen positif juga ke pasar saham. Pemerintah bisa membiayai APBN dengan biaya lebih rendah.",
  "fx": [
   0,
   2.0,
   0,
   0,
   1.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Kepercayaan terhadap keuangan negara ikut menular ke pasar saham. Kenaikannya tipis.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Kabar ini tidak banyak menggerakkan harga emas.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K074",
  "cat": "Fiskal & SBN",
  "color": "#0E7A55",
  "title": "Sukuk Ritel Laris Manis",
  "narr": "Penjualan sukuk ritel melampaui target dengan rekor jumlah investor baru.",
  "why": "Penjualan sukuk ritel melampaui target. Sebagian dana investor ritel berpindah dari saham ke sukuk yang imbalannya pasti, dan basis investor domestik makin kuat.",
  "fx": [
   0,
   -1.0,
   0,
   0,
   -0.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Kekhawatiran soal keuangan negara membuat investor menahan diri dari saham. Penurunannya tipis.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Kabar ini tidak banyak menggerakkan harga emas.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K075",
  "cat": "Fiskal & SBN",
  "color": "#0E7A55",
  "title": "Green Sukuk Global Diminati",
  "narr": "Green Sukuk pemerintah diburu investor global berwawasan lingkungan.",
  "why": "Permintaan dari investor ESG global memperluas basis investor dan menurunkan biaya pembiayaan proyek hijau.",
  "fx": [
   0,
   2.0,
   0,
   0,
   1.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Kepercayaan terhadap keuangan negara ikut menular ke pasar saham. Kenaikannya tipis.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Kabar ini tidak banyak menggerakkan harga emas.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K076",
  "cat": "Fiskal & SBN",
  "color": "#0E7A55",
  "title": "Defisit APBN Melebar",
  "narr": "Defisit anggaran melampaui perkiraan awal.",
  "why": "Kebutuhan pembiayaan naik dan pasar khawatir soal disiplin fiskal, sehingga sentimen saham melemah. Pemegang sukuk negara ritel tidak terdampak: imbalan tetap dibayar.",
  "fx": [
   0,
   -3.0,
   0,
   2.5,
   -1.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Kekhawatiran soal keuangan negara membuat investor menahan diri dari saham. Penurunannya tipis.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Sebagian dana pindah ke aset aman, sehingga harga emas naik.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K077",
  "cat": "Fiskal & SBN",
  "color": "#0E7A55",
  "title": "Penerimaan Pajak Melampaui Target",
  "narr": "Realisasi pajak lebih tinggi dari target APBN.",
  "why": "Kebutuhan penerbitan utang berkurang dan kredibilitas fiskal meningkat, positif bagi SBN.",
  "fx": [
   0,
   2.0,
   0,
   0,
   1.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Kepercayaan terhadap keuangan negara ikut menular ke pasar saham. Kenaikannya tipis.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Kabar ini tidak banyak menggerakkan harga emas.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K078",
  "cat": "Fiskal & SBN",
  "color": "#0E7A55",
  "title": "Proyek SBSN Dipercepat",
  "narr": "Proyek infrastruktur yang dibiayai SBSN (jalan, jembatan, madrasah) dipercepat.",
  "why": "Belanja infrastruktur mendorong emiten konstruksi dan semen, serta menunjukkan manfaat nyata sukuk negara.",
  "fx": [
   0,
   3.0,
   0,
   0,
   1.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Kepercayaan terhadap keuangan negara ikut menular ke pasar saham. Kenaikannya tipis.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Kabar ini tidak banyak menggerakkan harga emas.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K079",
  "cat": "Fiskal & SBN",
  "color": "#0E7A55",
  "title": "Target Penerbitan SBN Dikurangi",
  "narr": "Pemerintah memangkas target penerbitan SBN kuartal ini.",
  "why": "Kebutuhan pembiayaan negara turun menandakan fiskal sehat; sentimen pasar sedikit membaik.",
  "fx": [
   0,
   1.0,
   0,
   0,
   0.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Kepercayaan terhadap keuangan negara ikut menular ke pasar saham. Kenaikannya tipis.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Kabar ini tidak banyak menggerakkan harga emas.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K080",
  "cat": "Fiskal & SBN",
  "color": "#0E7A55",
  "title": "Stimulus Fiskal Jumbo",
  "narr": "Pemerintah meluncurkan stimulus besar yang dibiayai penerbitan SBN.",
  "why": "Belanja pemerintah mendorong ekonomi dan laba emiten, sehingga saham naik.",
  "fx": [
   0,
   4.0,
   0,
   1.0,
   2.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Kepercayaan terhadap keuangan negara ikut menular ke pasar saham. Kenaikannya moderat.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Sebagian dana pindah ke aset aman, sehingga harga emas naik.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K081",
  "cat": "Krisis",
  "color": "#B4282E",
  "title": "Pandemi Global",
  "narr": "Wabah penyakit baru menyebar ke seluruh dunia; aktivitas ekonomi terhenti.",
  "why": "Kepanikan menjatuhkan saham secara ekstrem dalam waktu singkat. Investor lari ke aset paling aman: surat berharga negara. Sukuk negara tetap membayar imbalan, dan BI serta investor domestik menopang pasar SBN. Pelajaran: diversifikasi dan dana darurat.",
  "fx": [
   0,
   -25.0,
   0.2,
   12.0,
   -12.5
  ],
  "r": [
   "Imbalan tetap dibayar negara. Saat krisis, surat berharga negara justru dicari sebagai tempat berlindung.",
   "Pabrik, toko, dan perjalanan berhenti sehingga laba perusahaan anjlok dan harga saham jatuh tajam.",
   "Bunga deposito tetap berjalan dan sedikit naik karena orang menyimpan uang tunai.",
   "Emas menjadi aset lindung nilai utama saat ketidakpastian global memuncak.",
   "Bagian saham jatuh dalam; bagian sukuk menahan agar tidak separah saham."
  ]
 },
 {
  "id": "K082",
  "cat": "Krisis",
  "color": "#B4282E",
  "title": "Krisis Keuangan Global",
  "narr": "Lembaga keuangan besar dunia bangkrut; pasar kredit membeku.",
  "why": "Investor menjual aset berisiko untuk mencari likuiditas; saham runtuh. Surat utang negara menjadi tempat berlindung karena dijamin pemerintah (flight to quality). Imbalan sukuk tetap dibayar penuh.",
  "fx": [
   0,
   -30.0,
   0.2,
   9.0,
   -15.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) tetap dibayar penuh oleh negara. Saat krisis, sukuk negara justru menjadi tempat berlindung.",
   "Krisis membuat investor panik dan menjual saham secara besar-besaran. Penurunannya tajam.",
   "Bunga deposito dan pasar uang naik, sehingga imbal hasil RD pasar uang sedikit lebih tinggi dari biasanya.",
   "Investor berbondong mencari aset pelindung nilai, sehingga harga emas melonjak.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K083",
  "cat": "Krisis",
  "color": "#B4282E",
  "title": "Gempa Besar di Kawasan Industri",
  "narr": "Gempa kuat mengguncang kawasan industri dan pelabuhan utama.",
  "why": "Rantai pasok terganggu dan kerugian ekonomi besar. Pemerintah perlu dana rehabilitasi.",
  "fx": [
   0,
   -10.0,
   0,
   3.0,
   -5.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) tetap dibayar penuh oleh negara. Saat krisis, sukuk negara justru menjadi tempat berlindung.",
   "Krisis membuat investor panik dan menjual saham secara besar-besaran. Penurunannya cukup besar.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Sebagian dana pindah ke aset aman, sehingga harga emas naik.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K084",
  "cat": "Krisis",
  "color": "#B4282E",
  "title": "Krisis Nilai Tukar (Sudden Stop)",
  "narr": "Arus modal asing tiba-tiba berhenti; rupiah jatuh bebas.",
  "why": "Asing menjual aset rupiah serentak. Saham anjlok dalam, emas dalam rupiah melonjak. Sukuk negara yang dipegang hingga jatuh tempo tetap menerima imbalan dan pokok penuh.",
  "fx": [
   0,
   -20.0,
   0.3,
   12.0,
   -10.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) tetap dibayar penuh oleh negara. Saat krisis, sukuk negara justru menjadi tempat berlindung.",
   "Krisis membuat investor panik dan menjual saham secara besar-besaran. Penurunannya tajam.",
   "Bunga deposito dan pasar uang naik, sehingga imbal hasil RD pasar uang sedikit lebih tinggi dari biasanya.",
   "Investor berbondong mencari aset pelindung nilai, sehingga harga emas melonjak.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K085",
  "cat": "Krisis",
  "color": "#B4282E",
  "title": "Bank Besar Domestik Gagal",
  "narr": "Sebuah bank besar dalam negeri mengalami gagal bayar.",
  "why": "Kepercayaan pada sistem perbankan anjlok. Deposito dan reksa dana pasar uang yang menempatkan dana di bank itu ikut rugi. Dana masyarakat berpindah ke instrumen yang dijamin negara: sukuk dan SBN.",
  "fx": [
   0,
   -18.0,
   -1.0,
   9.0,
   -9.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) tetap dibayar penuh oleh negara. Saat krisis, sukuk negara justru menjadi tempat berlindung.",
   "Krisis membuat investor panik dan menjual saham secara besar-besaran. Penurunannya tajam.",
   "Sebagian dana pasar uang ditempatkan di bank yang bermasalah, sehingga nilainya ikut tergerus.",
   "Investor berbondong mencari aset pelindung nilai, sehingga harga emas melonjak.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K086",
  "cat": "Kabar Baik",
  "color": "#15803D",
  "title": "Rebound Tajam (V-Shape)",
  "narr": "Setelah masa sulit, ekonomi pulih jauh lebih cepat dari perkiraan.",
  "why": "Pasar selalu melihat ke depan: saham melonjak sebelum data ekonomi pulih sepenuhnya. Yang panik menjual kehilangan momen ini.",
  "fx": [
   0,
   30.0,
   0,
   -3.0,
   15.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Kabar baik besar memicu optimisme dan reli di bursa saham. Kenaikannya tajam.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Saat suasana pasar membaik atau dolar menguat, emas kurang diminati dan harganya turun.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K087",
  "cat": "Kabar Baik",
  "color": "#15803D",
  "title": "Arus Modal Asing Deras",
  "narr": "Peringkat layak investasi dari semua lembaga memicu arus masuk besar.",
  "why": "Dana institusi global yang hanya boleh membeli aset layak investasi mengalir deras ke pasar Indonesia; saham melonjak.",
  "fx": [
   0,
   25.0,
   0,
   -3.5,
   12.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Kabar baik besar memicu optimisme dan reli di bursa saham. Kenaikannya tajam.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Saat suasana pasar membaik atau dolar menguat, emas kurang diminati dan harganya turun.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K088",
  "cat": "Kabar Baik",
  "color": "#15803D",
  "title": "IPO Teknologi Sukses",
  "narr": "IPO perusahaan teknologi lokal sukses besar.",
  "why": "Sentimen positif terhadap pasar modal meningkat dan investor ritel baru masuk.",
  "fx": [
   0,
   8.0,
   0,
   0,
   4.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Kabar baik besar memicu optimisme dan reli di bursa saham. Kenaikannya cukup besar.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Kabar ini tidak banyak menggerakkan harga emas.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K089",
  "cat": "Kabar Baik",
  "color": "#15803D",
  "title": "Reformasi Struktural Besar",
  "narr": "Pemerintah meloloskan reformasi perizinan dan kemudahan berusaha.",
  "why": "Iklim investasi membaik, potensi pertumbuhan jangka panjang naik, dan premi risiko negara turun.",
  "fx": [
   0,
   12.0,
   0,
   0,
   6.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Kabar baik besar memicu optimisme dan reli di bursa saham. Kenaikannya cukup besar.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Kabar ini tidak banyak menggerakkan harga emas.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K090",
  "cat": "Kabar Baik",
  "color": "#15803D",
  "title": "Suku Bunga Global Turun Serentak",
  "narr": "Bank sentral utama dunia kompak memangkas suku bunga.",
  "why": "Likuiditas global melimpah → semua aset naik, kecuali imbal hasil pasar uang yang ikut turun.",
  "fx": [
   0,
   12.0,
   -0.3,
   5.0,
   6.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Kabar baik besar memicu optimisme dan reli di bursa saham. Kenaikannya cukup besar.",
   "Bunga pasar uang ikut turun, sehingga imbal hasil RD pasar uang sedikit berkurang.",
   "Investor berbondong mencari aset pelindung nilai, sehingga harga emas melonjak.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K091",
  "cat": "Kabar Baik",
  "color": "#15803D",
  "title": "Laba Perbankan Rekor",
  "narr": "Bank-bank besar mencetak laba tertinggi sepanjang sejarah.",
  "why": "Saham perbankan berbobot terbesar di indeks, sehingga labanya mengangkat IHSG.",
  "fx": [
   0,
   6.0,
   0,
   0,
   3.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Kabar baik besar memicu optimisme dan reli di bursa saham. Kenaikannya moderat.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Kabar ini tidak banyak menggerakkan harga emas.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K092",
  "cat": "Kabar Baik",
  "color": "#15803D",
  "title": "Pariwisata Melonjak",
  "narr": "Kunjungan wisatawan mancanegara mencetak rekor.",
  "why": "Devisa masuk, sektor hotel, transportasi, dan konsumsi bergairah.",
  "fx": [
   0,
   8.0,
   0,
   0,
   4.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Kabar baik besar memicu optimisme dan reli di bursa saham. Kenaikannya cukup besar.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Kabar ini tidak banyak menggerakkan harga emas.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K093",
  "cat": "Kabar Baik",
  "color": "#15803D",
  "title": "Reli Pasar Negara Berkembang",
  "narr": "Investor global memindahkan dana besar ke pasar negara berkembang.",
  "why": "Arus masuk ke pasar negara berkembang mengangkat harga saham. Emas kurang diminati.",
  "fx": [
   0,
   20.0,
   0,
   -2.0,
   10.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Kabar baik besar memicu optimisme dan reli di bursa saham. Kenaikannya tajam.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Saat suasana pasar membaik atau dolar menguat, emas kurang diminati dan harganya turun.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K094",
  "cat": "Kabar Baik",
  "color": "#15803D",
  "title": "Proyek Strategis Rampung",
  "narr": "Sejumlah proyek infrastruktur strategis selesai dan beroperasi.",
  "why": "Biaya logistik turun dan produktivitas naik, sehingga prospek laba jangka panjang membaik.",
  "fx": [
   0,
   8.0,
   0,
   0,
   4.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Kabar baik besar memicu optimisme dan reli di bursa saham. Kenaikannya cukup besar.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Kabar ini tidak banyak menggerakkan harga emas.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K095",
  "cat": "Kabar Baik",
  "color": "#15803D",
  "title": "Swasembada Pangan & Energi",
  "narr": "Impor pangan dan energi turun tajam berkat produksi domestik.",
  "why": "Neraca dagang dan rupiah menguat, inflasi lebih terkendali. Positif bagi saham.",
  "fx": [
   0,
   8.0,
   0,
   -2.5,
   4.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Kabar baik besar memicu optimisme dan reli di bursa saham. Kenaikannya cukup besar.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Saat suasana pasar membaik atau dolar menguat, emas kurang diminati dan harganya turun.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K096",
  "cat": "Tenang",
  "color": "#4B5B70",
  "title": "Kuartal Tenang",
  "narr": "Tidak ada kejutan berarti; pasar bergerak datar.",
  "why": "Tidak ada kejutan berarti; tanpa katalis, saham melemah tipis. Di kuartal tenang, yang bekerja adalah imbal hasil dasar: imbalan sukuk dan bunga pasar uang.",
  "fx": [
   0,
   -1.0,
   0,
   0,
   -0.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Tanpa katalis, saham melemah tipis karena investor menunggu. Penurunannya tipis.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Kabar ini tidak banyak menggerakkan harga emas.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K097",
  "cat": "Tenang",
  "color": "#4B5B70",
  "title": "Libur Panjang",
  "narr": "Libur panjang membuat transaksi di bursa sepi.",
  "why": "Volume tipis membuat harga saham bergerak lesu.",
  "fx": [
   0,
   -2.0,
   0,
   0,
   -1.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Tanpa katalis, saham melemah tipis karena investor menunggu. Penurunannya tipis.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Kabar ini tidak banyak menggerakkan harga emas.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K098",
  "cat": "Tenang",
  "color": "#4B5B70",
  "title": "Data Sesuai Ekspektasi",
  "narr": "Data inflasi, PDB, dan neraca dagang sesuai perkiraan.",
  "why": "Tanpa kejutan, pasar cenderung stabil dan sedikit positif.",
  "fx": [
   0,
   2.0,
   0,
   0,
   1.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Tanpa kabar besar, saham hanya naik tipis. Kenaikannya tipis.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Kabar ini tidak banyak menggerakkan harga emas.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K099",
  "cat": "Tenang",
  "color": "#4B5B70",
  "title": "Rebalancing Indeks Rutin",
  "narr": "Penyesuaian komposisi indeks saham secara berkala.",
  "why": "Sebagian saham naik, sebagian turun; secara keseluruhan dampaknya kecil.",
  "fx": [
   0,
   1.0,
   0,
   0,
   0.5
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Tanpa kabar besar, saham hanya naik tipis. Kenaikannya tipis.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Kabar ini tidak banyak menggerakkan harga emas.",
   "Separuh isinya saham sehingga ikut naik, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 },
 {
  "id": "K100",
  "cat": "Tenang",
  "color": "#4B5B70",
  "title": "Pasar Wait and See",
  "narr": "Investor menunggu arah kebijakan menjelang pengumuman penting.",
  "why": "Ketidakpastian membuat investor menahan diri dan sedikit menambah aset aman.",
  "fx": [
   0,
   -2.0,
   0,
   1.0,
   -1.0
  ],
  "r": [
   "Imbalan tetap 7% per tahun (1,75% per kuartal) dibayar dan dijamin negara, apa pun kabarnya.",
   "Tanpa katalis, saham melemah tipis karena investor menunggu. Penurunannya tipis.",
   "Bunga pasar uang tetap mengalir seperti biasa; kabar ini tidak banyak memengaruhinya.",
   "Sebagian dana pindah ke aset aman, sehingga harga emas naik.",
   "Separuh isinya saham sehingga ikut turun, tetapi separuh lagi sukuk dengan imbalan tetap, jadi geraknya kira-kira setengah dari saham."
  ]
 }
];
