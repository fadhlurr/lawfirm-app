const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Consultation = sequelize.define('Consultation', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING },
  // Slug practice area yang dipilih di form; boleh kosong kalau calon klien
  // belum tahu masalahnya masuk kategori mana.
  practiceAreaSlug: { type: DataTypes.STRING },
  message: { type: DataTypes.TEXT, allowNull: false },
  // Permintaan konsultasi punya siklus hidup, tidak cuma dibaca/belum:
  // baru masuk -> sudah dihubungi -> dijadwalkan -> selesai/ditolak.
  status: {
    type: DataTypes.ENUM('baru', 'dihubungi', 'dijadwalkan', 'selesai', 'ditolak'),
    defaultValue: 'baru',
  },
  // Catatan internal, tidak pernah dikirim ke endpoint publik.
  notes: { type: DataTypes.TEXT },
}, {
  tableName: 'consultations',
  timestamps: true,
  updatedAt: true,
});

module.exports = Consultation;
