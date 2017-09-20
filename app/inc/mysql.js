const sequelize = require('sequelize');
const config = require('../../config/config.json')[process.env.NODE_ENV];

module.exports = new sequelize(config.database, config.username, config.password, config);