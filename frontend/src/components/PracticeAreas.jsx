import { Link } from 'react-router-dom';
import { api } from '../api/client';
import { useResource } from '../api/useResource';
import PracticeIcon from './PracticeIcon';

export default function PracticeAreas() {
  const { data: areas, status } = useResource(() => api.getPracticeAreas());

  // Bagian yang isinya kosong disembunyikan sepenuhnya. Judul bagian tanpa
  // satu pun bidang praktik di bawahnya membuat kantornya terlihat belum siap.
  if (status === 'ready' && (!areas || areas.length === 0)) return null;

  return (
    <section id="praktik">
      <div className="wrap">
        <p className="eyebrow">Bidang Praktik</p>
        <h2 className="sec-title">Yang kami tangani</h2>
        <p className="sec-desc">
          Enam bidang, dipilih karena memang ditangani sendiri sampai selesai.
          Perkara di luar ini kami rujuk ke rekan yang lebih tepat, dan kami
          sampaikan sejak pertemuan pertama.
        </p>

        {status === 'loading' && <p className="state">Memuat bidang praktik…</p>}
        {status === 'error' && (
          <p className="state error">
            Daftar bidang praktik gagal dimuat. Hubungi kami langsung lewat telepon
            atau email di bagian bawah halaman.
          </p>
        )}

        {status === 'ready' && (
          <div className="practice-grid">
            {areas.map((area) => (
              <article className="practice-card" key={area.id}>
                <div className="practice-icon"><PracticeIcon name={area.icon} /></div>
                <h3 className="serif">{area.name}</h3>
                <p>{area.summary}</p>
                <Link to={`/praktik/${area.slug}`} className="link-arrow">
                  Selengkapnya
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
