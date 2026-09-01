import { Link } from 'react-router-dom';

// Inisial dari dua kata pertama nama. Gelar di belakang nama ("S.H., M.H.")
// sengaja tidak ikut supaya inisialnya tidak berubah jadi "SM".
export function initialsOf(name) {
  return name
    .split(',')[0]
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

export default function LawyerCard({ lawyer }) {
  return (
    <Link to={`/tim/${lawyer.slug}`} className="lawyer-card">
      <div className="lawyer-photo">
        {lawyer.photoUrl ? (
          <img src={lawyer.photoUrl} alt={lawyer.name} loading="lazy" />
        ) : (
          <span className="lawyer-initials serif">{initialsOf(lawyer.name)}</span>
        )}
      </div>
      <div className="lawyer-body">
        <h3 className="serif">{lawyer.name}</h3>
        <p className="lawyer-position">{lawyer.position}</p>
        <div className="lawyer-areas">
          {(lawyer.practiceAreas || []).slice(0, 3).map((slug) => (
            <span className="chip" key={slug}>{slug}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
