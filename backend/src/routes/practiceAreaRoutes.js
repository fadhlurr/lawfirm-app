const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const {
  getAllPracticeAreas,
  getPracticeAreaBySlug,
  createPracticeArea,
  updatePracticeArea,
  deletePracticeArea,
} = require('../controllers/practiceAreaController');

router.get('/', getAllPracticeAreas);
router.get('/:slug', getPracticeAreaBySlug);
router.post('/', requireAuth, createPracticeArea);
router.put('/:id', requireAuth, updatePracticeArea);
router.delete('/:id', requireAuth, deletePracticeArea);

module.exports = router;
