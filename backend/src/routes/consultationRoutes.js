const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const {
  submitConsultation,
  getAllConsultations,
  updateConsultation,
  deleteConsultation,
} = require('../controllers/consultationController');

// POST sengaja publik: form konsultasi harus jalan tanpa login.
router.post('/', submitConsultation);
router.get('/', requireAuth, getAllConsultations);
router.put('/:id', requireAuth, updateConsultation);
router.delete('/:id', requireAuth, deleteConsultation);

module.exports = router;
