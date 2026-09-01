const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const {
  getAllLawyers,
  getLawyerBySlug,
  createLawyer,
  updateLawyer,
  deleteLawyer,
} = require('../controllers/lawyerController');

router.get('/', getAllLawyers);
router.get('/:slug', getLawyerBySlug);
router.post('/', requireAuth, createLawyer);
router.put('/:id', requireAuth, updateLawyer);
router.delete('/:id', requireAuth, deleteLawyer);

module.exports = router;
