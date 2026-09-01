// Baca VITE_LAWFIRM_API_URL duluan, baru VITE_API_URL.
//
// VITE_API_URL adalah nama generik yang gampang tertukar antar-project di satu
// akun hosting, dan sebagian dashboard tidak mengizinkan variable dihapus
// setelah dibuat. Nama yang spesifik project menghindari keduanya.
//
// Whitespace dan garis miring di ujung juga dibuang: newline yang ikut
// ter-paste di dashboard tidak terlihat, tapi membuat setiap request gagal.
const API_URL = (
  import.meta.env.VITE_LAWFIRM_API_URL ||
  import.meta.env.VITE_API_URL ||
  'http://localhost:4000/api'
)
  .trim()
  .replace(/\/+$/, '');

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }

  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  getPracticeAreas: () => request('/practice-areas'),
  getPracticeArea: (slug) => request(`/practice-areas/${slug}`),

  getLawyers: (practiceArea) =>
    request(practiceArea ? `/lawyers?practiceArea=${encodeURIComponent(practiceArea)}` : '/lawyers'),
  getLawyer: (slug) => request(`/lawyers/${slug}`),

  getInsights: (practiceArea) =>
    request(practiceArea ? `/insights?practiceArea=${encodeURIComponent(practiceArea)}` : '/insights'),
  getInsight: (slug) => request(`/insights/${slug}`),

  submitConsultation: (data) =>
    request('/consultations', { method: 'POST', body: JSON.stringify(data) }),
};
