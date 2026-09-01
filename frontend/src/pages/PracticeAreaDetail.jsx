import { useParams, Link } from 'react-router-dom';
import { api } from '../api/client';
import { useResource } from '../api/useResource';
import PracticeIcon from '../components/PracticeIcon';
import LawyerCard from '../components/LawyerCard';
import { formatDate } from '../components/Insights';
import NotFound from './NotFound';

export default function PracticeAreaDetail() {
  const { slug } = useParams();
  const { data: area, status } = useResource(() => api.getPracticeArea(slug), [slug]);

  // Advokat dan tulisan terkait dimuat terpisah. Kalau salah satunya gagal,
  // halaman utamanya tetap terbaca — bagian yang kosong hanya hilang.
  const { data: lawyers } = useResource(() => api.getLawyers(slug), [slug]);
  const { data: insights } = useResource(() => api.getInsights(slug), [slug]);

  if (status === 'loading') return <div className="wrap detail"><p className="state">Memuat…</p></div>;
  if (status === 'error') return <NotFound message="Bidang praktik ini tidak ditemukan." />;

  return (
    <div className="wrap detail">
      <Link to="/#praktik" className="back-link">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M19 12H5M11 6l-6 6 6 6" />
        </svg>
        Semua bidang praktik
      </Link>

      <div className="practice-icon" style={{ marginBottom: '24px' }}>
        <PracticeIcon name={area.icon} />
      </div>

      <h1 className="detail-title serif">{area.name}</h1>
      <p className="detail-meta">{area.summary}</p>

      <div className="detail-body">{area.content || area.summary}</div>

      {area.services?.length > 0 && (
        <ul className="service-list">
          {area.services.map((service) => <li key={service}>{service}</li>)}
        </ul>
      )}

      {lawyers?.length > 0 && (
        <>
          <h2 className="sec-title" style={{ margin: '72px 0 28px' }}>
            Advokat yang menangani
          </h2>
          <div className="team-grid">
            {lawyers.map((lawyer) => <LawyerCard lawyer={lawyer} key={lawyer.id} />)}
          </div>
        </>
      )}

      {insights?.length > 0 && (
        <>
          <h2 className="sec-title" style={{ margin: '72px 0 28px' }}>
            Tulisan terkait
          </h2>
          {insights.map((post) => (
            <Link to={`/wawasan/${post.slug}`} className="related-card" key={post.id}>
              <small>{formatDate(post.publishedAt)}</small>
              <p className="serif">{post.title}</p>
            </Link>
          ))}
        </>
      )}

      <aside className="detail-aside">
        <h4 className="serif">Persoalan Anda masuk bidang ini?</h4>
        <p>
          Ceritakan duduk perkaranya. Konsultasi awal 30 menit tanpa biaya, dan kami
          sampaikan penilaian jujur tentang peluang serta biayanya.
        </p>
        <a href="/#konsultasi" className="btn-primary">Jadwalkan Konsultasi</a>
      </aside>
    </div>
  );
}
