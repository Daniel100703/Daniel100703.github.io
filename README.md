# Portofolio Daniel Halomoan Siregar

Portofolio statis berbahasa Indonesia untuk GitHub Pages, menggunakan HTML, Tailwind CSS, CSS, dan JavaScript tanpa framework aplikasi.

## Pratinjau lokal

Jalankan `python3 -m http.server 8000` dari direktori ini, lalu buka http://localhost:8000. Tidak ada proses build. CSS lokal menjaga tata letak tetap berfungsi ketika CDN Tailwind atau Google Fonts tidak tersedia.

## Struktur

- `index.html`: profil, pengalaman, proyek, sertifikat, dan kontak.
- `assets/styles.css`: desain responsif dan reduced motion.
- `assets/main.js`: navigasi seluler, filter proyek, pencarian sertifikat, dan pratinjau gambar.
- `assets/images/`: foto formal dari CV dan tangkapan layar yang disediakan pemilik.
- `cv/README.md`: informasi PDF CV dan cara memperbaruinya.

## Pembaruan

Cari komentar `TODO:` dan `CEK:` di HTML untuk item yang perlu dilengkapi pemilik. Sertifikat tanpa bukti tetap dipertahankan sebagai kartu tanpa tautan. Foto dan dokumentasi proyek lama tetap disimpan di lokasi asal. Gambar dapat dibuka dalam pratinjau atau sebagai file langsung jika JavaScript tidak aktif.

RME masih dalam pengembangan; screenshot yang disertakan secara eksplisit bertanda mode demo dan bukan data pasien nyata. Integrasi SATUSEHAT belum dinyatakan selesai.

## Dokumentasi yang disertakan

| File dalam `assets/images/` | Isi |
| --- | --- |
| `daniel-halomoan-siregar.png` | Foto formal dari CV yang dilampirkan |
| `wella-waha.png` | Dasbor WAHA |
| `wella-workflow.png` | Alur n8n menyeluruh |
| `wella-workflow-detail.png` | Detail alur n8n |
| `portal-ai-nusindo.png` | Beranda orkestrator |
| `portal-produksi.png` | Daftar produksi konten |
| `rme-nusindo-demo.png` | Dasbor RME dengan label mode demo |
| `claude-chatgpt-skills.png` | Daftar skill |
| `server-sftp.png` | Dokumentasi folder server melalui SFTP |
| `server-sftp-detail.png` | Dokumentasi folder server tambahan |

Seluruh sembilan tangkapan layar asli disimpan; galeri utama menampilkan yang relevan dengan studi kasus. Dokumentasi SFTP tersimpan sebagai aset tambahan. Gambar sumber tidak diubah atau diklaim telah disensor.

## Bukti sertifikat dan CV

PDF CV sudah tersedia di `cv/CV_Daniel_Halomoan_Siregar.pdf`. Tautan tujuh sertifikat Dicoding/Cisco dan dua entri IBM sudah dilengkapi dari PDF yang diberikan pemilik. Tiga sertifikat webinar Kemnaker dan satu sertifikat kompetensi multimedia ditambahkan sebagai entri tersendiri.

Entri `Build an AI Agent` dan `Intelligent by Design: Build an AI Agent` memakai satu bukti yang sama; keduanya dipertahankan untuk keputusan pemilik. Entri lama lain yang belum memiliki bukti tetap ditandai CEK. Sertifikat Kemnaker tersimpan dalam `certificates/`; PDF yang sudah ada di root digunakan kembali tanpa duplikasi.
