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
  // Sengaja bukan 'users'. Database terkelola sering dipakai bareng aplikasi
  // lain, dan 'users' adalah nama tabel yang paling mungkin sudah dipakai.
  tableName: 'admin_users',
  timestamps: true,
});

module.exports = User;
