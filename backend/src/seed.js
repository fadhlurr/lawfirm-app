// Mengisi database dengan konten contoh untuk kantor hukum fiktif
// "Arkana & Rekan". Aman dijalankan berulang: baris dicocokkan lewat slug,
// yang sudah ada diperbarui, bukan digandakan.
//
// Isinya ada di ./seedData.js, dan semuanya karangan — ganti sebelum dipakai
// kantor sungguhan.
require('dotenv').config();
const { sequelize, PracticeArea, Lawyer, Insight } = require('./models');

if (process.env.NODE_ENV === 'production' && process.env.ALLOW_SEED !== 'true') {
  console.error('Menolak seed di production. Set ALLOW_SEED=true kalau memang disengaja.');
  process.exit(1);
}

const { practiceAreas, lawyers, insights } = require('./seedData');

// Catatan: update hanya menyentuh kolom yang ada di objek baris. Menghapus
// sebuah field dari seedData TIDAK mengosongkan kolomnya di baris yang sudah
// ada — nilai lamanya bertahan diam-diam. Untuk benar-benar mengosongkan,
// tulis field itu secara eksplisit sebagai null.
async function upsertBySlug(Model, rows, label) {
  for (const row of rows) {
    const existing = await Model.findOne({ where: { slug: row.slug } });
    if (existing) {
      await existing.update(row);
    } else {
      await Model.create(row);
    }
  }
  console.log(`${label}: ${rows.length} baris siap.`);
}

async function main() {
  await sequelize.authenticate();
  await sequelize.sync();

  await upsertBySlug(PracticeArea, practiceAreas, 'Practice areas');
  await upsertBySlug(Lawyer, lawyers, 'Lawyers');
  await upsertBySlug(Insight, insights, 'Insights');

  console.log('Seed selesai.');
  process.exit(0);
}

main().catch((err) => {
  // Seed adalah perintah sekali jalan, bukan proses yang melayani traffic, jadi
  // di sini berhenti memang benar — beda dengan server.js yang wajib tetap
  // hidup dan mencoba ulang. Yang tidak benar adalah menumpahkan stack trace
  // driver untuk masalah yang sebenarnya cuma satu baris di .env.
  const code = err.parent?.code || err.original?.code;
  const hint = {
    '28P01': 'Password di LAWFIRM_DATABASE_URL salah. Kalau .env baru disalin dari\n' +
             '.env.example, bagian GANTI_PASSWORD masih placeholder — isi dengan password asli.',
    '3D000': 'Database yang disebut di LAWFIRM_DATABASE_URL belum ada. Buat dulu, misalnya:\n' +
             '  createdb -U postgres -h localhost lawfirm_db',
    ECONNREFUSED: 'Tidak ada PostgreSQL yang menjawab di host dan port itu. Pastikan servernya jalan.',
    ENOTFOUND: 'Host di LAWFIRM_DATABASE_URL tidak dikenali. Periksa ejaan host-nya.',
  }[code];

  if (hint) {
    console.error(`\nSeed gagal: ${err.message}\n\n${hint}\n`);
  } else {
    console.error(err);
  }
  process.exit(1);
});
