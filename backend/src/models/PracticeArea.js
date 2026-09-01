const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PracticeArea = sequelize.define('PracticeArea', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  // Kalimat pendek untuk kartu di halaman depan.
  summary: { type: DataTypes.TEXT, allowNull: false },
  // Isi panjang untuk halaman detail: ruang lingkup, cara kerja, contoh perkara.
  content: { type: DataTypes.TEXT },
  // Daftar layanan konkret. Klien membaca ini untuk memastikan masalahnya
  // memang ditangani, jadi isinya harus spesifik ("gugatan wanprestasi"),
  // bukan kategori ("penyelesaian sengketa").
  services: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
  icon: { type: DataTypes.STRING }, // nama ikon yang dikenali frontend
  featured: { type: DataTypes.BOOLEAN, defaultValue: false },
  order: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  tableName: 'practice_areas',
  timestamps: true,
});

module.exports = PracticeArea;
