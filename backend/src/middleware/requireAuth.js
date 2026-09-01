const jwt = require('jsonwebtoken');

// Verifikasi JWT dari header: Authorization: Bearer <token>
// Kalau valid, isi req.user dengan payload lalu lanjut ke controller.
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: missing or invalid token' });
  }

  const token = authHeader.slice(7); // buang "Bearer "

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET); // { userId, email }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: invalid or expired token' });
  }
}

module.exports = requireAuth;
