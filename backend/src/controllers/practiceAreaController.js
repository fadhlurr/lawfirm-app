const { PracticeArea } = require('../models');

// GET /api/practice-areas
async function getAllPracticeAreas(req, res, next) {
  try {
    const areas = await PracticeArea.findAll({
      order: [['order', 'ASC'], ['name', 'ASC']],
    });
    res.json(areas);
  } catch (err) {
    next(err);
  }
}

// GET /api/practice-areas/:slug
async function getPracticeAreaBySlug(req, res, next) {
  try {
    const area = await PracticeArea.findOne({ where: { slug: req.params.slug } });
    if (!area) return res.status(404).json({ error: 'Practice area not found' });
    res.json(area);
  } catch (err) {
    next(err);
  }
}

// POST /api/practice-areas  (JWT)
async function createPracticeArea(req, res, next) {
  try {
    const { name, slug, summary } = req.body;
    if (!name || !slug || !summary) {
      return res.status(400).json({ error: 'name, slug, and summary are required' });
    }
    const area = await PracticeArea.create(req.body);
    res.status(201).json(area);
  } catch (err) {
    next(err);
  }
}

// PUT /api/practice-areas/:id  (JWT)
async function updatePracticeArea(req, res, next) {
  try {
    const area = await PracticeArea.findByPk(req.params.id);
    if (!area) return res.status(404).json({ error: 'Practice area not found' });
    await area.update(req.body);
    res.json(area);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/practice-areas/:id  (JWT)
async function deletePracticeArea(req, res, next) {
  try {
    const area = await PracticeArea.findByPk(req.params.id);
    if (!area) return res.status(404).json({ error: 'Practice area not found' });
    await area.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllPracticeAreas,
  getPracticeAreaBySlug,
  createPracticeArea,
  updatePracticeArea,
  deletePracticeArea,
};
