const express = require('express');
const router = express.Router();

router.use('/auth', require('./authRoutes'));
router.use('/practice-areas', require('./practiceAreaRoutes'));
router.use('/lawyers', require('./lawyerRoutes'));
router.use('/insights', require('./insightRoutes'));
router.use('/consultations', require('./consultationRoutes'));

router.get('/', (req, res) => {
  res.json({
    message: 'Law firm API is running',
    endpoints: ['/auth', '/practice-areas', '/lawyers', '/insights', '/consultations'],
  });
});

module.exports = router;
