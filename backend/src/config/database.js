const { Sequelize } = require('sequelize');

// Baca LAWFIRM_DATABASE_URL duluan, baru DATABASE_URL.
//
// DATABASE_URL adalah nama yang diklaim banyak pihak: plugin database bawaan
// platform, service lain di project yang sama, atau entri lama yang tertinggal.
// Kalau ada dua entri dengan nama itu, yang sampai ke proses bisa berbeda dari
// yang terlihat di dashboard — dan gejalanya menyesatkan: kredensial jalan di
// lokal tapi gagal di production. Nama yang tidak diklaim siapa pun
// menghindarkan seluruh kelas masalah itu. DATABASE_URL tetap dipakai sebagai
// fallback untuk development lokal.
const DATABASE_URL = process.env.LAWFIRM_DATABASE_URL || process.env.DATABASE_URL;

// Tanpa penjagaan ini, Sequelize menerima `undefined` dan gagal jauh di dalam
// driver — pesannya tidak menyebut sama sekali bahwa yang kurang adalah satu
// baris di .env.
if (!DATABASE_URL) {
  console.error(
    '\nDATABASE_URL belum diisi.\n' +
    'Salin backend/.env.example ke backend/.env, lalu isi LAWFIRM_DATABASE_URL\n' +
    'dengan connection string PostgreSQL Anda.\n'
  );
  process.exit(1);
}

const isLocalDb = /localhost|127\.0\.0\.1/.test(DATABASE_URL || '');

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // ganti ke console.log kalau mau lihat tiap query SQL
  // Postgres terkelola (Supabase, Neon, RDS) mewajibkan SSL;
  // Postgres lokal umumnya tidak mendukungnya.
  dialectOptions: isLocalDb
    ? {}
    : {
        ssl: {
          require: true,
          rejectUnauthorized: false, // sertifikat Supabase tidak ada di CA store bawaan Node
        },
      },
});

module.exports = sequelize;
module.exports.DATABASE_URL = DATABASE_URL;
module.exports.DATABASE_URL_SOURCE = process.env.LAWFIRM_DATABASE_URL
  ? 'LAWFIRM_DATABASE_URL'
  : 'DATABASE_URL';
