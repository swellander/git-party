'use strict';

var db = require('./database');
var Sequelize = require('sequelize');

var User = db.define('user', {
  name: Sequelize.STRING
});

module.exports = User;
