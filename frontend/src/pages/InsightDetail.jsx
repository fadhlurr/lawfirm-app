import { useParams, Link } from 'react-router-dom';
import { api } from '../api/client';
import { useResource } from '../api/useResource';
import { formatDate } from '../components/Insights';
import NotFound from './NotFound';

export default function InsightDetail() {
  const { slug } = useParams();
  const { data: post, status } = useResource(() => api.getInsight(slug), [slug]);

  if (status === 'loading') return <div className="wrap detail"><p className="state">Memuat…</p></div>;
  if (status === 'error') return <NotFound message="Tulisan ini tidak ditemukan." />;

  return (
    <article className="wrap detail">
      <Link to="/#wawasan" className="back-link">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M19 12H5M11 6l-6 6 6 6" />
        </svg>
        Semua tulisan
      </Link>

      <h1 className="detail-title serif">{post.title}</h1>
      <div className="detail-meta">
        {post.author && <span>{post.author}</span>}
        {post.category && <span>· {post.category}</span>}
        <span>· {formatDate(post.publishedAt)}</span>
      </div>

      <div className="detail-body">{post.content || post.excerpt}</div>

      {/* Tautan silang ke bidang praktik yang dibahas — pembaca yang sampai ke
          artikel lewat pencarian belum tentu tahu kantor ini menangani bidangnya. */}
      {post.practiceAreaSlug && (
        <Link to={`/praktik/${post.practiceAreaSlug}`} className="related-card">
          <small>Bidang praktik terkait</small>
          <p className="serif">Lihat bagaimana kami menangani perkara di bidang ini</p>
        </Link>
      )}

      <aside className="detail-aside">
        <h4 className="serif">Tulisan ini bukan nasihat hukum</h4>
        <p>
          Isinya umum dan disusun tanpa mengetahui fakta perkara Anda. Kalau Anda
          sedang menghadapi persoalan serupa, ceritakan duduk perkaranya lebih dulu.
        </p>
        <a href="/#konsultasi" className="btn-primary">Jadwalkan Konsultasi</a>
      </aside>
    </article>
  );
}
