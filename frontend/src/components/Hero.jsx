import { site } from '../siteConfig';

const yearsActive = new Date().getFullYear() - site.established;

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <p className="eyebrow">{site.legalName} · Jakarta</p>
          <h1 className="serif">
            Persoalan hukum jarang selesai dengan <em>jawaban umum</em>.
          </h1>
          <p className="lead">
            Kami menangani sengketa komersial, transaksi korporasi, ketenagakerjaan,
            dan perkara keluarga — dengan penilaian yang jujur sejak awal tentang
            peluang, biaya, dan lamanya proses.
          </p>

          <div className="hero-cta">
            <a href="#konsultasi" className="btn-primary">
              Jadwalkan Konsultasi
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="#praktik" className="btn-ghost">Lihat Bidang Praktik</a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <b className="serif">{yearsActive}</b>
              <span>tahun beroperasi</span>
            </div>
            <div className="hero-stat">
              <b className="serif">6</b>
              <span>bidang praktik</span>
            </div>
            <div className="hero-stat">
              <b className="serif">2×24</b>
              <span>jam waktu balas</span>
            </div>
          </div>
        </div>

        <aside className="hero-panel">
          <h3 className="serif">Cara kami memulai</h3>
          <p>Tiga langkah pertama, sebelum ada perikatan atau biaya apa pun.</p>

          <div className="panel-row">
            <span>01</span>
            <p><b>Pertemuan awal 30 menit</b>Menyimak duduk perkara dan memeriksa dokumen yang ada.</p>
          </div>
          <div className="panel-row">
            <span>02</span>
            <p><b>Penilaian tertulis</b>Peluang, pilihan jalur, perkiraan biaya, dan perkiraan lama proses.</p>
          </div>
          <div className="panel-row">
            <span>03</span>
            <p><b>Keputusan ada pada Anda</b>Kalau menurut kami perkara lebih baik diselesaikan di luar pengadilan, itu yang kami sampaikan.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
