const { Insight } = require('../models');

// GET /api/insights?practiceArea=<slug>
async function getAllInsights(req, res, next) {
  try {
    const where = req.query.practiceArea
      ? { practiceAreaSlug: req.query.practiceArea }
      : {};
    const insights = await Insight.findAll({
      where,
      order: [['publishedAt', 'DESC']],
    });
    res.json(insights);
  } catch (err) {
    next(err);
  }
}

// GET /api/insights/:slug
async function getInsightBySlug(req, res, next) {
  try {
    const insight = await Insight.findOne({ where: { slug: req.params.slug } });
    if (!insight) return res.status(404).json({ error: 'Insight not found' });
    res.json(insight);
  } catch (err) {
    next(err);
  }
}

// POST /api/insights  (JWT)
async function createInsight(req, res, next) {
  try {
    const { title, slug } = req.body;
    if (!title || !slug) {
      return res.status(400).json({ error: 'title and slug are required' });
    }
    const insight = await Insight.create(req.body);
    res.status(201).json(insight);
  } catch (err) {
    next(err);
  }
}

// PUT /api/insights/:id  (JWT)
async function updateInsight(req, res, next) {
  try {
    const insight = await Insight.findByPk(req.params.id);
    if (!insight) return res.status(404).json({ error: 'Insight not found' });
    await insight.update(req.body);
    res.json(insight);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/insights/:id  (JWT)
async function deleteInsight(req, res, next) {
  try {
    const insight = await Insight.findByPk(req.params.id);
    if (!insight) return res.status(404).json({ error: 'Insight not found' });
    await insight.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllInsights, getInsightBySlug, createInsight, updateInsight, deleteInsight };
