const { Lawyer } = require('../models');

// GET /api/lawyers?practiceArea=<slug>
async function getAllLawyers(req, res, next) {
  try {
    const lawyers = await Lawyer.findAll({
      order: [['order', 'ASC'], ['name', 'ASC']],
    });

    // Filter di aplikasi, bukan di SQL: daftar advokat berjumlah puluhan, dan
    // operator array Postgres lewat Sequelize menambah kerumitan yang belum
    // sepadan. Pindahkan ke query kalau daftarnya tumbuh jadi ratusan.
    const { practiceArea } = req.query;
    const result = practiceArea
      ? lawyers.filter((l) => (l.practiceAreas || []).includes(practiceArea))
      : lawyers;

    res.json(result);
  } catch (err) {
    next(err);
  }
}

// GET /api/lawyers/:slug
async function getLawyerBySlug(req, res, next) {
  try {
    const lawyer = await Lawyer.findOne({ where: { slug: req.params.slug } });
    if (!lawyer) return res.status(404).json({ error: 'Lawyer not found' });
    res.json(lawyer);
  } catch (err) {
    next(err);
  }
}

// POST /api/lawyers  (JWT)
async function createLawyer(req, res, next) {
  try {
    const { name, slug, position } = req.body;
    if (!name || !slug || !position) {
      return res.status(400).json({ error: 'name, slug, and position are required' });
    }
    const lawyer = await Lawyer.create(req.body);
    res.status(201).json(lawyer);
  } catch (err) {
    next(err);
  }
}

// PUT /api/lawyers/:id  (JWT)
async function updateLawyer(req, res, next) {
  try {
    const lawyer = await Lawyer.findByPk(req.params.id);
    if (!lawyer) return res.status(404).json({ error: 'Lawyer not found' });
    await lawyer.update(req.body);
    res.json(lawyer);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/lawyers/:id  (JWT)
async function deleteLawyer(req, res, next) {
  try {
    const lawyer = await Lawyer.findByPk(req.params.id);
    if (!lawyer) return res.status(404).json({ error: 'Lawyer not found' });
    await lawyer.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllLawyers, getLawyerBySlug, createLawyer, updateLawyer, deleteLawyer };
