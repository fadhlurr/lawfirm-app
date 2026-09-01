# Kantor Hukum — Situs Full-stack

Situs kantor hukum dengan backend dan database sendiri: profil kantor, bidang
praktik, tim advokat, tulisan, dan formulir permintaan konsultasi. Konten
dikelola lewat REST API, jadi menambah bidang praktik atau advokat tidak perlu
deploy ulang.

Arsitekturnya mengikuti pola yang sama dengan `portofolio-app`: React + Vite di
depan, Express MVC + Sequelize di belakang, PostgreSQL sebagai penyimpanan.

```
┌─────────────────┐        ┌──────────────────┐        ┌─────────────────┐
│  Frontend       │  HTTP  │  Backend         │  SQL   │  Database       │
│  React + Vite   │◄──────►│  Express + MVC   │◄──────►│  PostgreSQL     │
└─────────────────┘        └──────────────────┘        └─────────────────┘
```

## Menjalankan secara lokal

Butuh Node 18+ (kode memakai `fetch` bawaan) dan satu database PostgreSQL.

**1. Siapkan database**

```bash
createdb -U postgres -h localhost lawfirm_db
```

**2. Backend**

```bash
cd backend
npm install
cp .env.example .env
```

Lalu **buka `backend/.env` dan isi dua baris** sebelum melanjutkan — menyalin
`.env.example` saja tidak cukup, isinya masih placeholder:

- `LAWFIRM_DATABASE_URL` — ganti `GANTI_PASSWORD` dengan password PostgreSQL Anda
- `JWT_SECRET` — hasil dari:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Baru kemudian:

```bash
npm run seed              # isi konten contoh; aman dijalankan berulang
npm run dev               # http://localhost:4000
```

Kalau salah satu nilai belum benar, `npm run seed` berhenti dengan satu baris
penjelasan (password salah, database belum ada, atau server tidak menjawab) —
bukan stack trace driver.

**Frontend**

```bash
cd frontend
npm install
cp .env.example .env
npm run dev               # http://localhost:5173
```

**Membuat admin pertama**

```bash
cd backend
ADMIN_EMAIL=admin@contoh.id ADMIN_PASSWORD='<acak, minimal 12 karakter>' npm run create-admin
```

## Endpoint

| Method | Endpoint | Akses |
|---|---|---|
| POST | `/api/auth/login` | Publik → menghasilkan JWT |
| GET | `/api/auth/me` | JWT |
| GET | `/api/practice-areas`, `/api/practice-areas/:slug` | Publik |
| POST/PUT/DELETE | `/api/practice-areas` | JWT |
| GET | `/api/lawyers?practiceArea=<slug>`, `/api/lawyers/:slug` | Publik |
| POST/PUT/DELETE | `/api/lawyers` | JWT |
| GET | `/api/insights?practiceArea=<slug>`, `/api/insights/:slug` | Publik |
| POST/PUT/DELETE | `/api/insights` | JWT |
| POST | `/api/consultations` | **Publik** — supaya form jalan tanpa login |
| GET/PUT/DELETE | `/api/consultations` | JWT |

Contoh menambah bidang praktik:

```bash
TOKEN=$(curl -s -X POST http://localhost:4000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@contoh.id","password":"..."}' | node -pe 'JSON.parse(require("fs").readFileSync(0)).token')

curl -X POST http://localhost:4000/api/practice-areas \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"name":"Kekayaan Intelektual","slug":"ki","summary":"Pendaftaran merek dan penanganan sengketa.","icon":"shield"}'
```

## Model data

- **PracticeArea** — `name, slug, summary, content, services[], icon, featured, order`
- **Lawyer** — `name, slug, position, photoUrl, bio, education[], practiceAreas[], barNumber, email, order`
- **Insight** — `title, slug, excerpt, content, category, author, practiceAreaSlug, publishedAt`
- **Consultation** — `name, email, phone, practiceAreaSlug, message, status, notes`
- **User** — tabel `admin_users`, email + hash bcrypt

Tautan silang bidang praktik ↔ tulisan dipetakan lewat kolom `practiceAreaSlug`
pada `insights`, bukan tabel terpisah — cukup untuk satu tulisan yang membahas
satu bidang, dan cukup untuk mengisi kedua arah tautannya.

## Mode demo

`frontend/src/siteConfig.js` punya flag `isDemo`. Selama nilainya `true`:

- Banner peringatan tampil di setiap halaman, dan **tidak bisa ditutup** —
  tombol tutup akan menyembunyikannya tepat dari orang yang paling perlu
  membacanya
- `<meta name="robots" content="noindex, nofollow">` dan `robots.txt`
  `Disallow: /` menolak pengindeksan. Orang yang mencari "kantor hukum jakarta"
  tidak boleh mendarat di sini tanpa konteks
- Structured data `LegalService` **dihapus** — gunanya justru memberi tahu mesin
  pencari bahwa ini penyedia jasa hukum sungguhan dengan alamat dan jam kerja
- `barNumber` semua advokat `null`. Nama karangan masih terbaca sebagai
  karangan; nomor induk advokat terbaca sebagai kredensial yang bisa
  diverifikasi, dan memalsukannya adalah jenis kebohongan yang berbeda
- Form konsultasi menyatakan terus terang tidak ada yang membacanya

Mengubahnya jadi `false` mematikan seluruh pengaman itu sekaligus. Jangan
lakukan sebelum daftar di bawah selesai.

## Yang harus diganti sebelum dipakai kantor sungguhan

Konten hasil `npm run seed` adalah **contoh untuk kantor fiktif**. Sebelum
tayang, ganti:

1. Seluruh isi `backend/src/seed.js` — profil advokat, nomor induk PERADI, dan
   isi tulisan semuanya karangan. Halaman profil advokat yang fiktif menyesatkan
   calon klien tentang siapa yang akan menangani perkaranya.
2. `frontend/src/siteConfig.js` — nama kantor, alamat, telepon, email.
3. `frontend/index.html` — judul, deskripsi, canonical, dan blok JSON-LD
   `LegalService` (alamat dan jam kerja dipakai Google untuk pencarian lokal).
4. `frontend/public/robots.txt` dan `og-image.png` (1200×630, belum disertakan).
5. `isDemo` jadi `false` di `frontend/src/siteConfig.js` — **paling akhir**,
   setelah keempat langkah di atas benar-benar selesai.

Catatan kalau menyunting `seedData.js`: menghapus sebuah field dari objek
**tidak** mengosongkan kolomnya di baris yang sudah ada — `update` hanya
menyentuh field yang disebut, jadi nilai lama bertahan diam-diam. Tulis `null`
secara eksplisit kalau memang ingin mengosongkan.

## Catatan operasional

- **Backend tidak mati saat database tak terjangkau.** `server.js` listen lebih
  dulu, lalu mencoba koneksi dengan backoff 5s→10s→20s→40s→60s. Jangan tambahkan
  `process.exit` di jalur ini: itu mengubah gangguan sementara jadi crash loop,
  dan container lama yang masih memegang environment lama akan terus melayani
  traffic.
- **Log koneksi mencetak variable yang dibaca, user, host, port, dan panjang
  password — tidak pernah passwordnya.** Cukup untuk memastikan proses menunjuk
  ke database yang benar.
- **Jangan pernah ganti `sequelize.sync()` jadi `sync({ alter: true })`.**
  Database bisa dipakai bersama aplikasi lain.
- **Supabase: pakai transaction pooler, bukan direct connection.** Direct
  connection hanya bisa dilewati IPv6 di plan Free.
- Kredensial hanya hidup sebagai environment variable. Yang pernah muncul di
  layar, screenshot, atau transkrip chat dianggap bocor dan wajib dirotasi.

## Belum dikerjakan

- UI admin panel (`/admin/login` + CRUD) — pengelolaan saat ini lewat API langsung
- Rate limiting di `POST /api/consultations`
- Prerender halaman utama saat build
- Automated testing
- `sitemap.xml` yang dihasilkan dari isi database
