'use strict';

const db = require('./database');
const Sequelize = require('sequelize');

// Make sure you have `postgres` running!

const User = require('./user');

//---------VVVV---------  your code below  ---------VVV----------

const Article = db.define('article', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: false
        }
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// Article.prototype.truncate({

// })

// Article.prototype.findByTitle({

// })

//---------^^^---------  your code above  ---------^^^----------

module.exports = Article;
