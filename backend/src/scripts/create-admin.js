// Script sekali pakai untuk membuat user admin pertama.
//
//   ADMIN_EMAIL=... ADMIN_PASSWORD=... ADMIN_NAME=... npm run create-admin
//
// Jangan ketik password langsung di baris perintah pada mesin bersama —
// masuk ke shell history. Password yang pernah muncul di layar, screenshot,
// atau transkrip chat harus dianggap bocor dan wajib diganti.
require('dotenv').config();
const bcrypt = require('bcryptjs');
const { sequelize, User } = require('../models');

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || 'Admin';

  if (!email || !password) {
    console.error('Set dulu ADMIN_EMAIL dan ADMIN_PASSWORD.');
    process.exit(1);
  }
  if (password.length < 12) {
    console.error('Password minimal 12 karakter.');
    process.exit(1);
  }

  await sequelize.authenticate();
  await sequelize.sync();

  const existing = await User.findOne({ where: { email: email.toLowerCase() } });
  if (existing) {
    await existing.update({ passwordHash: await bcrypt.hash(password, 10), name });
    console.log(`Password untuk ${email} diperbarui.`);
  } else {
    await User.create({
      email: email.toLowerCase(),
      passwordHash: await bcrypt.hash(password, 10),
      name,
    });
    console.log(`Admin dibuat: ${email}`);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
