const sequelize = require('../config/database');
const PracticeArea = require('./PracticeArea');
const Lawyer = require('./Lawyer');
const Insight = require('./Insight');
const Consultation = require('./Consultation');
const User = require('./User');

module.exports = { sequelize, PracticeArea, Lawyer, Insight, Consultation, User };
