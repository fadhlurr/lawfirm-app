import { Link } from 'react-router-dom';
import { api } from '../api/client';
import { useResource } from '../api/useResource';
import { site } from '../siteConfig';

export default function Footer() {
  const { data: areas } = useResource(() => api.getPracticeAreas());

  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-about">
            <Link to="/" className="logo">
              <b className="serif">{site.name}</b>
              <span>{site.tagline}</span>
            </Link>
            <p>
              {site.address.street}<br />
              {site.address.city} {site.address.postalCode}, {site.address.country}<br />
              {site.phone} · {site.email}
            </p>
          </div>

          <div>
            <h4>Bidang Praktik</h4>
            <ul>
              {(areas || []).map((area) => (
                <li key={area.id}>
                  <Link to={`/praktik/${area.slug}`}>{area.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Kantor</h4>
            <ul>
              <li><a href="/#tentang">Tentang Kami</a></li>
              <li><a href="/#tim">Tim</a></li>
              <li><a href="/#wawasan">Wawasan</a></li>
              <li><a href="/#konsultasi">Konsultasi</a></li>
              <li><a href={`https://wa.me/${site.whatsapp.replace(/\D/g, '')}`}
                    target="_blank" rel="noreferrer">WhatsApp</a></li>
            </ul>
          </div>
        </div>

        <div className="foot-bottom">
          <p className="foot-disclaimer">
            Isi situs ini bersifat umum dan bukan nasihat hukum atas perkara tertentu.
            Hubungan advokat–klien baru terbentuk melalui perikatan tertulis.
          </p>
          <p>© {new Date().getFullYear()} {site.legalName}</p>
        </div>
      </div>
    </footer>
  );
}
