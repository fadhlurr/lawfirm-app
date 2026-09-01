import { Link } from 'react-router-dom';
import { api } from '../api/client';
import { useResource } from '../api/useResource';

export function formatDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function Insights() {
  const { data: insights, status } = useResource(() => api.getInsights());

  if (status === 'ready' && (!insights || insights.length === 0)) return null;

  return (
    <section id="wawasan">
      <div className="wrap">
        <p className="eyebrow">Wawasan</p>
        <h2 className="sec-title">Catatan dari perkara yang kami tangani</h2>
        <p className="sec-desc">
          Tulisan umum untuk membantu Anda mengenali persoalan lebih awal.
          Ini bukan nasihat hukum atas perkara Anda — untuk itu, faktanya perlu
          kami dengar lebih dulu.
        </p>

        {status === 'loading' && <p className="state">Memuat tulisan…</p>}
        {status === 'error' && <p className="state error">Daftar tulisan gagal dimuat.</p>}

        {status === 'ready' && (
          <div className="insight-grid">
            {insights.slice(0, 3).map((post) => (
              <article className="insight-card" key={post.id}>
                <div className="insight-meta">
                  {post.category && <span className="cat">{post.category}</span>}
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <h3 className="serif">{post.title}</h3>
                <p>{post.excerpt}</p>
                <Link to={`/wawasan/${post.slug}`} className="link-arrow">
                  Baca
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
