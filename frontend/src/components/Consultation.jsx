import { useState } from 'react';
import { api } from '../api/client';
import { useResource } from '../api/useResource';
import { site } from '../siteConfig';

const EMPTY = { name: '', email: '', phone: '', practiceAreaSlug: '', message: '' };

export default function Consultation() {
  const { data: areas } = useResource(() => api.getPracticeAreas());
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      await api.submitConsultation(form);
      setStatus('success');
      setForm(EMPTY);
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err.message ||
          'Pesan gagal terkirim. Silakan hubungi kami lewat telepon atau email.'
      );
    }
  }

  return (
    <section id="konsultasi">
      <div className="wrap consult-grid">
        <div>
          <p className="eyebrow">Konsultasi</p>
          <h2 className="sec-title">Ceritakan persoalannya</h2>
          <p className="sec-desc" style={{ marginBottom: '32px' }}>
            {site.consultationNote} Kami membalas setiap permintaan dalam 2×24 jam
            kerja — termasuk ketika jawabannya adalah bahwa perkara Anda lebih tepat
            ditangani rekan lain.
          </p>

          <div className="info-line">
            <b>Kantor</b>
            <span>{site.address.street}<br />{site.address.city} {site.address.postalCode}</span>
          </div>
          <div className="info-line">
            <b>Telepon</b>
            <span><a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a></span>
          </div>
          <div className="info-line">
            <b>Email</b>
            <span><a href={`mailto:${site.email}`}>{site.email}</a></span>
          </div>
          <div className="info-line">
            <b>Jam kerja</b>
            <span>{site.officeHours}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field-row">
            <div className="field">
              <label htmlFor="name">Nama lengkap</label>
              <input id="name" name="name" type="text" value={form.name}
                onChange={handleChange} required autoComplete="name" />
            </div>
            <div className="field">
              <label htmlFor="phone">Telepon <span className="optional">(opsional)</span></label>
              <input id="phone" name="phone" type="tel" value={form.phone}
                onChange={handleChange} autoComplete="tel" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email}
              onChange={handleChange} required autoComplete="email" />
          </div>

          <div className="field">
            <label htmlFor="practiceAreaSlug">
              Bidang <span className="optional">(kosongkan kalau belum yakin)</span>
            </label>
            <select id="practiceAreaSlug" name="practiceAreaSlug"
              value={form.practiceAreaSlug} onChange={handleChange}>
              <option value="">Belum tahu / lainnya</option>
              {(areas || []).map((area) => (
                <option value={area.slug} key={area.id}>{area.name}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="message">Uraian singkat</label>
            <textarea id="message" name="message" value={form.message}
              onChange={handleChange} required
              placeholder="Apa yang terjadi, kapan, dan dengan siapa. Dokumen bisa menyusul." />
          </div>

          {/* Peringatan ini perlu ada sebelum tombol kirim, bukan sesudahnya.
              Form kontak bukan saluran yang aman, dan hubungan advokat-klien
              belum terbentuk sampai ada perikatan tertulis. */}
          <p className="form-note">
            Mengirim formulir ini belum membentuk hubungan advokat–klien. Jangan
            kirimkan dokumen atau keterangan yang bersifat sangat rahasia sebelum
            kita sepakat mengenai perikatan.
          </p>

          {status === 'success' && (
            <p className="form-status success">
              Permintaan Anda sudah kami terima. Kami menghubungi kembali dalam
              2×24 jam kerja.
            </p>
          )}
          {status === 'error' && <p className="form-status error">{errorMsg}</p>}

          <button type="submit" className="btn-primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Mengirim…' : 'Kirim Permintaan'}
          </button>
        </form>
      </div>
    </section>
  );
}
