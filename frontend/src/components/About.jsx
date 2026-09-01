import { site } from '../siteConfig';

export default function About() {
  return (
    <section id="tentang">
      <div className="wrap about-grid">
        <div>
          <p className="eyebrow">Tentang Kami</p>
          <h2 className="sec-title">
            Kantor kecil, perkara<br />yang ditangani sendiri
          </h2>
        </div>

        <div>
          <p>
            {site.legalName} berdiri pada {site.established} di Jakarta. Kami sengaja
            tetap berukuran kecil: setiap perkara ditangani langsung oleh advokat yang
            Anda temui di pertemuan pertama, bukan diteruskan ke tim yang belum pernah
            membaca berkasnya.
          </p>
          <p>
            Klien kami berkisar dari perusahaan menengah yang butuh pendampingan
            transaksi dan kepatuhan, sampai perorangan yang sedang menghadapi perkara
            keluarga atau sengketa tanah. Ukuran perkaranya berbeda jauh, tetapi
            cara kerjanya sama: pahami faktanya lebih dulu, baru tentukan langkahnya.
          </p>
          <p>
            Kami menagih berdasarkan lingkup pekerjaan yang disepakati di awal.
            Kalau suatu langkah menurut kami tidak sepadan dengan biayanya,
            kami sampaikan sebelum dikerjakan — bukan setelah tagihan terbit.
          </p>

          <p className="about-quote">
            “Nasihat hukum yang paling bernilai sering kali yang membuat kami
            kehilangan honorarium beracara.”
          </p>
        </div>
      </div>
    </section>
  );
}
