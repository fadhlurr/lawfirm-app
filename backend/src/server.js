require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 4000;

// Listen dulu, koneksi database belakangan. Keluar dari proses saat koneksi
// gagal mengubah gangguan database sementara menjadi crash loop: platform
// hosting terus menyajikan container lama, yang masih memegang environment
// lama, sehingga variable yang sudah dibetulkan tidak pernah sampai ke proses
// yang melayani traffic. Tetap hidup juga mencegah kita menghantam pooler
// database, yang memblokir koneksi baru setelah kegagalan auth berulang.
app.listen(PORT, () => {
  console.log(`Law firm API listening on port ${PORT}`);
  connectWithRetry();
});

async function connectWithRetry(attempt = 1) {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    // Membuat tabel yang belum ada. Tidak mengubah tabel yang sudah ada, jadi
    // perubahan model pada tabel lama butuh migrasi manual.
    // Jangan pernah ganti ke sync({ alter: true }): database bisa dipakai
    // bersama aplikasi lain, dan alter akan menulis ulang tabel milik mereka.
    await sequelize.sync();
    console.log('Models synced with database.');

    // Baris terakhir yang terlihat sebelum ini bercerita tentang pekerjaan
    // internal, bukan tentang kesiapan — dan karena prosesnya memang tidak
    // pernah berhenti sendiri, prompt yang tidak kembali gampang terbaca
    // sebagai macet. Katakan saja bahwa dia sudah siap, dan cara berhentinya.
    console.log(`Siap menerima request di http://localhost:${PORT}/api  (Ctrl+C untuk berhenti)`);
  } catch (err) {
    if (attempt === 1) logConnectionTarget();
    // Mundur 5s, 10s, 20s, 40s, lalu tiap 60s. Penyedia database terkelola
    // butuh beberapa detik menyebarkan password baru, jadi percobaan pertama
    // gagal setelah rotasi kredensial itu normal.
    const delay = Math.min(5000 * 2 ** (attempt - 1), 60000);
    console.error(
      `Database connection attempt ${attempt} failed: ${err.message}. Retrying in ${delay / 1000}s.`
    );
    setTimeout(() => connectWithRetry(attempt + 1), delay);
  }
}

// Cetak database mana yang sebenarnya dituju proses ini, supaya URL yang basi
// atau salah ketik terlihat di log deploy. Password tidak pernah dicetak —
// hanya panjangnya dan 3 huruf awal/akhir, cukup untuk memastikan nilainya
// sama dengan yang ada di dashboard tanpa membocorkannya ke log.
function logConnectionTarget() {
  try {
    const db = require('./config/database');
    const url = new URL(db.DATABASE_URL);
    console.error(
      'Connecting via %s as user=%s host=%s port=%s db=%s passwordLength=%d passwordEdges=%s..%s',
      db.DATABASE_URL_SOURCE,
      url.username,
      url.hostname,
      url.port,
      url.pathname.slice(1),
      url.password.length,
      url.password.slice(0, 3),
      url.password.slice(-3)
    );
  } catch (err) {
    console.error('No usable database URL: set LAWFIRM_DATABASE_URL or DATABASE_URL.');
  }
}
