const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
}, {
  // Diberi awalan nama aplikasi, bukan 'users' atau 'admin_users'.
  //
  // Database terkelola sering dipakai bareng aplikasi lain — plan gratis
  // membatasi jumlah project, sehingga berbagi satu database jadi hal biasa.
  // 'users' hampir pasti sudah dipakai, dan 'admin_users' pun ternyata bentrok
  // dengan portofolio-app yang memakai nama persis sama beserta kolom yang
  // sama. Kalau dibiarkan, dua aplikasi akan berbagi akun admin tanpa ada yang
  // menyadarinya: login ke satu situs otomatis membuka situs lainnya.
  tableName: 'lawfirm_admin_users',
  timestamps: true,
});

module.exports = User;
