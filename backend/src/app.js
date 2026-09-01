const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Tiap origin yang dikonfigurasi otomatis membolehkan kembarannya (www /
// non-www), jadi CORS_ORIGIN cukup menyebut satu bentuk domain saja.
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)
  .flatMap((origin) =>
    origin.includes('://www.')
      ? [origin, origin.replace('://www.', '://')]
      : [origin, origin.replace('://', '://www.')]
  );

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.use('/api', routes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Error handler terpusat — harus didaftarkan paling akhir.
app.use(errorHandler);

module.exports = app;
