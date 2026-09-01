import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { site } from '../siteConfig';

const LINKS = [
  { href: '/#tentang', label: 'Tentang' },
  { href: '/#praktik', label: 'Bidang Praktik' },
  { href: '/#tim', label: 'Tim' },
  { href: '/#wawasan', label: 'Wawasan' },
  { href: '/#konsultasi', label: 'Kontak' },
];

export default function Nav() {
  // Tema mengikuti preferensi sistem sampai pengunjung memilih sendiri, lalu
  // pilihan itu diingat. Memaksa terang pada perangkat yang seluruhnya gelap
  // adalah hal pertama yang membuat orang menutup tab.
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Tutup menu tiap kali rute berubah; kalau tidak, menu tetap terbuka
  // menutupi halaman yang baru dibuka.
  useEffect(() => setMenuOpen(false), [location]);

  return (
    <nav>
      <div className="nav-inner">
        <Link to="/" className="logo">
          <b className="serif">{site.name}</b>
          <span>{site.tagline}</span>
        </Link>

        <div className={`nav-links${menuOpen ? ' open' : ''}`}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </div>

        <div className="nav-right">
          <button
            className="toggle-btn"
            aria-label={isDark ? 'Ganti ke tema terang' : 'Ganti ke tema gelap'}
            onClick={() => setIsDark((d) => !d)}
          >
            {isDark ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="12" cy="12" r="4.2" />
                <path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <a href="/#konsultasi" className="nav-cta">Jadwalkan Konsultasi</a>

          <button
            className="nav-toggle"
            aria-label="Buka menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
