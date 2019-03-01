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
    },
    // hooks: {
    //     beforeUpdate: (instance, options) => {
    //         article.version++;
    //     }
    // }
});

//Hooks
// Article.beforeCreate(title, content)

//Method Definitions

Article.prototype.truncate = function (length) {
//I want it to take in a length where it should truncate to the length specified -- slice
    // return [Article.find({where: {content: this.content}})].slice(0, length);
    // const fullText = Article.content;
    // return fullText.slice(0, length)
    return this.content = [this.content].slice(0, length);
}

Article.findByTitle = function () {
    return Article.findOne({
        where: {
            title: this.title,
        }
    })
}

//Associations
Article.belongsTo(User, {as: 'author'});


//---------^^^---------  your code above  ---------^^^----------

module.exports = Article;
