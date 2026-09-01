const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Lawyer = sequelize.define('Lawyer', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  // Jabatan di kantor: Managing Partner, Partner, Senior Associate, Associate.
  position: { type: DataTypes.STRING, allowNull: false },
  photoUrl: { type: DataTypes.STRING },
  bio: { type: DataTypes.TEXT },
  education: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
  // Slug practice area yang ditangani. Sengaja array of slug, bukan relasi
  // tabel: seorang advokat berpindah fokus lebih sering daripada daftar
  // practice area berubah, dan join tabel belum sepadan untuk 4-8 orang.
  practiceAreas: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
  // Nomor induk advokat PERADI — yang membedakan advokat berizin dari
  // konsultan biasa, dan hal pertama yang dicek klien korporat.
  barNumber: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, validate: { isEmail: true } },
  linkedinUrl: { type: DataTypes.STRING },
  order: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  tableName: 'lawyers',
  timestamps: true,
});

module.exports = Lawyer;
