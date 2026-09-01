// Ikon disimpan di frontend dan dipilih lewat kolom `icon` di database, bukan
// disimpan sebagai SVG di database. Alasannya: markup dari database akan perlu
// disuntikkan sebagai HTML mentah, dan menaruh jalur itu di aplikasi hanya
// demi enam ikon tidak sepadan risikonya.
const paths = {
  scale: (
    <>
      <path d="M12 3v18M7 21h10M12 6l-7 2 3 6h8l3-6-7-2z" />
      <path d="M5 14a3 3 0 0 0 6 0M13 14a3 3 0 0 0 6 0" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V6l8-3 8 3v15" />
      <path d="M9 21v-5h6v5M8 9h.01M12 9h.01M16 9h.01M8 13h.01M12 13h.01M16 13h.01" />
    </>
  ),
  users: (
    <>
      <path d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="3.2" />
      <path d="M22 20v-2a4 4 0 0 0-3-3.8M16.5 4.2a3.2 3.2 0 0 1 0 5.6" />
    </>
  ),
  home: (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V21h13V9.5M10 21v-6h4v6" />
    </>
  ),
  map: (
    <>
      <path d="M9 3 3 6v15l6-3 6 3 6-3V3l-6 3-6-3z" />
      <path d="M9 3v15M15 6v15" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
};

export default function PracticeIcon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.scale}
    </svg>
  );
}
