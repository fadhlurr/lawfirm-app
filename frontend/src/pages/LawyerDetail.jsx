import { useParams, Link } from 'react-router-dom';
import { api } from '../api/client';
import { useResource } from '../api/useResource';
import { initialsOf } from '../components/LawyerCard';
import NotFound from './NotFound';

export default function LawyerDetail() {
  const { slug } = useParams();
  const { data: lawyer, status } = useResource(() => api.getLawyer(slug), [slug]);
  const { data: areas } = useResource(() => api.getPracticeAreas());

  if (status === 'loading') return <div className="wrap detail"><p className="state">Memuat…</p></div>;
  if (status === 'error') return <NotFound message="Profil advokat tidak ditemukan." />;

  // Cocokkan slug bidang praktik dengan namanya, supaya di halaman profil
  // yang muncul "Litigasi & Penyelesaian Sengketa", bukan "litigasi".
  const areaBySlug = new Map((areas || []).map((a) => [a.slug, a]));

  return (
    <div className="wrap detail">
      <Link to="/#tim" className="back-link">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M19 12H5M11 6l-6 6 6 6" />
        </svg>
        Semua anggota tim
      </Link>

      <div className="lawyer-detail-grid">
        <div className="lawyer-detail-photo">
          {lawyer.photoUrl
            ? <img src={lawyer.photoUrl} alt={lawyer.name} />
            : <span className="lawyer-initials serif">{initialsOf(lawyer.name)}</span>}
        </div>

        <div>
          <p className="eyebrow">{lawyer.position}</p>
          <h1 className="detail-title serif" style={{ fontSize: 'clamp(28px,3.8vw,42px)' }}>
            {lawyer.name}
          </h1>

          {lawyer.bio && <div className="detail-body" style={{ fontSize: '16.5px' }}>{lawyer.bio}</div>}

          {lawyer.practiceAreas?.length > 0 && (
            <div className="lawyer-areas" style={{ margin: '28px 0 0' }}>
              {lawyer.practiceAreas.map((areaSlug) => (
                <Link className="chip" to={`/praktik/${areaSlug}`} key={areaSlug}>
                  {areaBySlug.get(areaSlug)?.name || areaSlug}
                </Link>
              ))}
            </div>
          )}

          <ul className="credentials">
            {lawyer.barNumber && <li><strong>Nomor induk advokat</strong> — {lawyer.barNumber}</li>}
            {(lawyer.education || []).map((item) => <li key={item}>{item}</li>)}
            {lawyer.email && (
              <li><a href={`mailto:${lawyer.email}`} className="link-arrow">{lawyer.email}</a></li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
