const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const {
  getAllInsights,
  getInsightBySlug,
  createInsight,
  updateInsight,
  deleteInsight,
} = require('../controllers/insightController');

router.get('/', getAllInsights);
router.get('/:slug', getInsightBySlug);
router.post('/', requireAuth, createInsight);
router.put('/:id', requireAuth, updateInsight);
router.delete('/:id', requireAuth, deleteInsight);

module.exports = router;
