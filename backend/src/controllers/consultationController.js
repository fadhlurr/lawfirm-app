const { Consultation } = require('../models');

const FIRM_NAME = process.env.FIRM_NAME || 'Kantor Hukum';

// Isi form masuk ke badan email sebagai HTML. Tanpa escape, satu tanda kurung
// sudut dari calon klien bisa mengubah struktur email yang dibaca kantor.
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Kirim notifikasi lewat Resend. Sengaja non-blocking: kalau email gagal,
// permintaan konsultasi tetap tersimpan di database dan calon klien tetap
// dapat respon sukses. Kehilangan notifikasi masih bisa dipulihkan lewat
// GET /api/consultations; kehilangan datanya tidak.
async function sendNotificationEmail({ name, email, phone, practiceAreaSlug, message }) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.NOTIFY_EMAIL;

  if (!apiKey || !toEmail) {
    console.warn('Notifikasi email dilewati: RESEND_API_KEY atau NOTIFY_EMAIL belum diset');
    return;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${FIRM_NAME} <onboarding@resend.dev>`,
        to: [toEmail],
        reply_to: email,
        subject: `Permintaan konsultasi baru — ${name}`,
        html: `
          <div style="font-family:-apple-system,Segoe UI,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#F7F5F1;color:#101B2D;">
            <h2 style="margin:0 0 16px;font-size:20px;">Permintaan konsultasi baru</h2>
            <div style="background:#fff;padding:20px;border-radius:12px;border:1px solid #E0DAD0;">
              <p style="margin:0 0 8px;"><strong>Nama:</strong> ${escapeHtml(name)}</p>
              <p style="margin:0 0 8px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
              <p style="margin:0 0 8px;"><strong>Telepon:</strong> ${escapeHtml(phone || '-')}</p>
              <p style="margin:0 0 8px;"><strong>Bidang:</strong> ${escapeHtml(practiceAreaSlug || 'belum ditentukan')}</p>
              <p style="margin:16px 0 8px;"><strong>Uraian:</strong></p>
              <p style="margin:0;white-space:pre-wrap;line-height:1.6;">${escapeHtml(message)}</p>
            </div>
            <p style="margin:20px 0 0;font-size:13px;color:#5A6478;">
              Balas email ini untuk membalas langsung ke ${escapeHtml(name)}.
            </p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      console.error('Resend API error:', res.status, await res.text());
    }
  } catch (err) {
    console.error('Gagal mengirim notifikasi email:', err);
  }
}

// POST /api/consultations  (publik — form harus jalan tanpa login)
async function submitConsultation(req, res, next) {
  try {
    const { name, email, phone, practiceAreaSlug, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'name, email, and message are required' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const saved = await Consultation.create({
      name,
      email,
      phone,
      practiceAreaSlug,
      message,
    });

    sendNotificationEmail({ name, email, phone, practiceAreaSlug, message });

    // Balas dengan id saja. Isi permintaan konsultasi tidak dikembalikan ke
    // response publik — endpoint ini tanpa autentikasi, dan yang dikirim balik
    // tidak menambah apa pun bagi pengirimnya.
    res.status(201).json({ success: true, id: saved.id });
  } catch (err) {
    next(err);
  }
}

// GET /api/consultations?status=baru  (JWT)
async function getAllConsultations(req, res, next) {
  try {
    const where = req.query.status ? { status: req.query.status } : {};
    const consultations = await Consultation.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });
    res.json(consultations);
  } catch (err) {
    next(err);
  }
}

// PUT /api/consultations/:id  (JWT) — ubah status dan catatan internal
async function updateConsultation(req, res, next) {
  try {
    const consultation = await Consultation.findByPk(req.params.id);
    if (!consultation) return res.status(404).json({ error: 'Consultation not found' });

    // Hanya dua kolom ini yang boleh berubah setelah tersimpan. Nama, email,
    // dan uraian adalah catatan tentang apa yang dikirim klien; kalau bisa
    // ditimpa lewat API, catatan itu berhenti jadi bukti.
    const { status, notes } = req.body;
    await consultation.update({
      ...(status !== undefined && { status }),
      ...(notes !== undefined && { notes }),
    });

    res.json(consultation);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/consultations/:id  (JWT)
async function deleteConsultation(req, res, next) {
  try {
    const consultation = await Consultation.findByPk(req.params.id);
    if (!consultation) return res.status(404).json({ error: 'Consultation not found' });
    await consultation.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  submitConsultation,
  getAllConsultations,
  updateConsultation,
  deleteConsultation,
};
