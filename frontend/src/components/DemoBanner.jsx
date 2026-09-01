import { site } from '../siteConfig';

// Banner ini sengaja tidak bisa ditutup dan tidak ikut menggulung.
//
// Situs ini memajang nama advokat, alamat kantor, dan formulir yang mengundang
// orang menceritakan persoalan hukumnya. Semua isinya fiktif. Tombol "tutup"
// akan membuat peringatan itu hilang tepat pada orang yang paling perlu
// membacanya — pengunjung yang datang dari pencarian dan mengira ini kantor
// hukum sungguhan.
export default function DemoBanner() {
  if (!site.isDemo) return null;

  return (
    <div className="demo-banner" role="note">
      <div className="demo-banner-inner">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
             strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 9v4M12 17h.01" />
          <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
        </svg>
        <p>
          <strong>Demo portfolio.</strong> {site.demoNotice}
        </p>
      </div>
    </div>
  );
}
