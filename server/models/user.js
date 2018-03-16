'use strict';

const db = require('./database');
const Sequelize = require('sequelize');

const User = db.define('user', {
  name: Sequelize.STRING
});

module.exports = User;
