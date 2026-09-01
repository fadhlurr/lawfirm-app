import { api } from '../api/client';
import { useResource } from '../api/useResource';
import LawyerCard from './LawyerCard';
import { site } from '../siteConfig';

export default function Team() {
  const { data: lawyers, status } = useResource(() => api.getLawyers());

  if (status === 'ready' && (!lawyers || lawyers.length === 0)) return null;

  return (
    <section id="tim">
      <div className="wrap">
        <p className="eyebrow">Tim</p>
        <h2 className="sec-title">Siapa yang akan menangani perkara Anda</h2>
        <p className="sec-desc">
          {site.isDemo
            ? 'Keempat profil di bawah ini fiktif, dibuat untuk memperlihatkan bagaimana halaman tim bekerja. Kantor sungguhan mencantumkan nomor induk advokat di sini supaya bisa dicocokkan ke pangkalan data PERADI.'
            : 'Nomor induk advokat setiap orang tercantum di halaman profilnya, dan bisa Anda cocokkan sendiri dengan pangkalan data PERADI.'}
        </p>

        {status === 'loading' && <p className="state">Memuat profil tim…</p>}
        {status === 'error' && <p className="state error">Profil tim gagal dimuat.</p>}

        {status === 'ready' && (
          <div className="team-grid">
            {lawyers.map((lawyer) => (
              <LawyerCard lawyer={lawyer} key={lawyer.id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
