// Error handler terpusat — semua controller meneruskan error ke sini via next(err).
function errorHandler(err, req, res, next) {
  console.error(err);

  // Pelanggaran unique constraint, misalnya slug kembar.
  if (err.name === 'SequelizeUniqueConstraintError') {
    const field = err.errors?.[0]?.path || 'field';
    return res.status(409).json({ error: `Duplicate value for field: ${field}` });
  }

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: err.errors.map((e) => e.message).join(', ') });
  }

  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal server error' });
}

module.exports = errorHandler;
