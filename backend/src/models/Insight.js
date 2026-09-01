const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Insight = sequelize.define('Insight', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  excerpt: { type: DataTypes.TEXT },
  content: { type: DataTypes.TEXT },
  category: { type: DataTypes.STRING },
  // Nama penulis disimpan sebagai teks, bukan foreign key ke lawyers:
  // artikel harus tetap utuh dan terbaca walau penulisnya sudah tidak di kantor.
  author: { type: DataTypes.STRING },
  // Slug practice area yang dibahas — dipakai untuk tautan silang dua arah
  // antara halaman practice area dan artikel.
  practiceAreaSlug: { type: DataTypes.STRING },
  publishedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'insights',
  timestamps: true,
});

module.exports = Insight;
