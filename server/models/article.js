"use strict";

const db = require("./database");
const Sequelize = require("sequelize");

// Make sure you have `postgres` running!

const User = require("./user");

//---------VVVV---------  your code below  ---------VVV----------

const Article = db.define("article", {
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
  version: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
  //   hooks: {
  //     beforeUpdate: (instance, options) => {
  //       instance.version++;
  //     }
  //   }
});

// instance = {
//     title: 'whatever',
//     content: 'content woo',
//     version: 4
// }
//Hooks
Article.beforeUpdate(function(instance, options) {
  instance.version++;
});

//Method Definitions

//instance method
Article.prototype.truncate = function(length) {
  //I want it to take in a length where it should truncate to the length specified -- slice
  // return [Article.find({where: {content: this.content}})].slice(0, length);
  // const fullText = Article.content;
  // return fullText.slice(0, length)
  this.content = this.content.slice(0, length);
  return this.content.slice(0, length);
};

//class method
Article.findByTitle = function(title) {
  return Article.findOne({
    where: {
      title
    }
  });
};

//Associations
Article.belongsTo(User, { as: "author" });

//---------^^^---------  your code above  ---------^^^----------

module.exports = Article;
