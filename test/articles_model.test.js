'use strict';

var Promise = require('bluebird');
var expect = require('chai').expect;
var Article = require('../models/article');
var User = require('../models/user');
var db = require('../models/database');

/**
 *
 * Start here!
 *
 * These tests describe the model that you'll be writing in models/article.js
 *
 */

describe('The `Article` model', function () {

  /**
   * First we clear the database and recreate the tables before beginning a run
   */
  before(function () {
    return db.sync({force: true});
  });

  /**
   * Next, we create an (un-saved!) article instance before every spec
   */
  var fullText = 'The South African cliff swallow (Petrochelidon spilodera), also known as the South African swallow, is a species of bird in the Hirundinidae family.';

  var article;
  beforeEach(function(){
    article = Article.build({
      title: 'Migratory Birds',
      content: fullText
    });
  });

  /**
   * Also, we empty the tables after each spec
   */
  afterEach(function () {
    return Promise.all([
      Article.truncate({ cascade: true }),
      User.truncate({ cascade: true })
    ]);
  });

  describe('attributes definition', function(){

    /**
     * Your model should have two fields (both required): `title` and `content`.
     *
     * http://docs.sequelizejs.com/manual/tutorial/models-definition.html
     */
    it('includes `title` and `content` fields', function () {

      return article.save()
      .then(function (savedArticle) {
        expect(savedArticle.title).to.equal('Migratory Birds');
        expect(savedArticle.content).to.equal(fullText);
      });

    });

    xit('requires `content`', function () {

      article.content = null;

      return article.validate()
      .then(function () {
        throw new Error('validation should fail when content is null');
      },
      function(result) {
        expect(result).to.be.an.instanceOf(Error);
      });

    });

    xit('requires `title` (in a more strict way than for `content`)', function () {

      article.title = '';

      return article.validate()
      .then(function () {
        throw new Error('validation should fail when content is empty');
      },
      function (result) {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('Validation error');
      });

    });

    xit('can handle long `content`', function() {

      var articleContent = 'WALL-E (stylized with an interpunct as WALL·E) is a 2008 American computer-animated science-fiction comedy film produced by Pixar Animation Studios and released by Walt Disney Pictures. Directed by Andrew Stanton, the story follows a robot named WALL-E, who is designed to clean up an abandoned, waste-covered Earth far in the future. He falls in love with another robot named EVE, who also has a programmed task, and follows her into outer space on an adventure that changes the destiny of both his kind and humanity. Both robots exhibit an appearance of free will and emotions similar to humans, which develop further as the film progresses.';

      return Article.create({
        title: 'WALL-E',
        content: articleContent
      })
      .then(function(result) {
        expect(result).to.be.an('object');
        expect(result.title).to.equal('WALL-E');
        expect(result.content).to.equal(articleContent);
      });

    });

  });

/**
 * SPECIAL NOTE: at this point, you have defined enough of the Article model to
 * move on to the Routes tests. The rest of these specs, while necessary to
 * fully pass the Model suite, are not necessary for the Routes suite. Bear in
 * mind that the Routes suite depends on a WORKING model, so if you break the
 * Article model in your code below, the Routes will also fail. Make commits!
 */

  describe('options definition', function(){

    describe('`snippet` virtual field', function(){

      /**
       * Set up a virtual field (check out sequelize getter methods) called `snippet`
       * that returns the first 23 characters of the content followed by "...".
       *
       * http://docs.sequelizejs.com/manual/tutorial/models-definition.html#defining-as-part-of-the-model-options
       */
      xit('evaluates to the first 23 characters of the `content` appended with "..."', function () {

        expect(article.snippet).to.equal('The South African cliff...');

        article.content = 'At length did cross an Albatross / Thorough the fog it came';
        expect(article.snippet).to.equal('At length did cross an ...');

        article.content = 'The Albatross fell off, and sank / Like lead into the sea';
        expect(article.snippet).to.equal('The Albatross fell off,...');

      });

      // This is mostly to avoid a corner case seen during `Model.update`.
      xit('returns empty string for missing `content`', function(){

        article.content = undefined;

        expect(article.snippet).to.equal('');

      });

    });

    describe('`truncate` instance method', function(){

      /**
       * Set up an instance method (check out sequelize instanceMethods) called `truncate`
       * that will shorten (change!) the article instance content to a passed-in length.
       * This method does not save to the backend, it just modifies the Sequelize
       * object so the user can choose if and when to actually save.
       *
       * http://docs.sequelizejs.com/manual/tutorial/models-definition.html#expansion-of-models
       */
      xit('truncates the `content`', function () {

        expect(article.content).to.equal(fullText);

        article.truncate(12);
        expect(article.content).to.equal('The South Af');

      });

      xit('accepts any length', function () {

        expect(article.content).to.equal(fullText);

        var randLength = Math.ceil(Math.random() * 20);
        article.truncate(randLength);
        expect(article.content).to.have.length(randLength);

      });

      xit('does not save the instance once truncated', function() {

        expect(article.content).to.equal(fullText);

        article.truncate(7);
        expect(article.content).to.have.length(7);

        return Article.findAll()
        .then(function(articles) {
          expect(articles).to.have.length(0);
        });

      });

    });

    describe('`findByTitle` class method', function(){

      /**
       * Set up a class method called `findByTitle` that's a convenience
       * method to find a *single* document by its title.
       *
       * http://docs.sequelizejs.com/manual/tutorial/models-definition.html#expansion-of-models
       */

      beforeEach(function(){
        var otherArticles = [1, 2, 3].map(function (num) {
          return Article.create({
            title: 'Article Number ' + num,
            content: 'etc.'
          });
        });
        var articles = otherArticles.concat(article.save());
        return Promise.all(articles);
      });

      xit('finds one specific article by its `title`', function () {

        return Article.findByTitle('Migratory Birds')
        .then(function (foundArticle) {
          expect(foundArticle).not.to.be.an.instanceOf(Array);
          expect(foundArticle.content).to.equal(fullText);
        });

      });

    });

  });

  describe('associations', function(){

    /**
     * Add a `belongsTo` relationship between articles and users,
     * but make sure the user is aliased as `author` for each article.
     *
     * http://docs.sequelizejs.com/manual/tutorial/associations.html#belongsto
     */

    xit("belongs to a user, who is stored as the article's `author`", function() {

      var creatingUser = User.create({ name: 'Alatar the Blue'});
      var creatingArticle = Article.create({
        title: 'Blue Wizards',
        content: 'They are two of the five Wizards (or Istari) sent by the Valar to Middle-earth to aid in the struggle against Sauron.'
      });

      return Promise.all([creatingUser, creatingArticle])
      .spread(function(createdUser, createdArticle) {
        // this method `setAuthor` method automatically exists if you set up the association correctly
        return createdArticle.setAuthor(createdUser);
      })
      .then(function() {
        return Article.findOne({
          where: { title: 'Blue Wizards' },
          include: { model: User, as: 'author' }
        });
      })
      .then(function(foundArticle){
        expect(foundArticle.author).to.exist; // eslint-disable-line no-unused-expressions
        expect(foundArticle.author.name).to.equal('Alatar the Blue');
      });

    });

  });

  /**
   * Your model should have a field called `version`,
   * which increases by 1 every time you save
   *
   * http://docs.sequelizejs.com/manual/tutorial/hooks.html
   */

  describe('`version` field', function() {

    beforeEach(function() {
      return Article.create({
        title: 'Biological Immortality',
        content: 'Biological immortality refers to a stable or decreasing rate of mortality from senescence, thus decoupling it from chronological age.'
      });
    });

    xit('is originally 0, even if not explicitly set', function() {

      return Article.findOne({where: {title: 'Biological Immortality'}})
      .then(function(foundArticle) {
        expect(foundArticle.version).to.equal(0);
      });

    });

    xit('increments by 1 every time the article is updated', function() {

      return Article.findOne({where: {title: 'Biological Immortality'}})
      .then(function(foundArticle) {
        expect(foundArticle.version).to.equal(0);
        return foundArticle.update({
          content: 'Biological immortality is a lie!'
        });
      })
      .then(function(updatedArticle) {
        expect(updatedArticle.version).to.equal(1);
        return updatedArticle.update({
          content: 'Have you seen the 19th century painting of Keanu Reeves?'
        });
      })
      .then(function(updatedArticle) {
        expect(updatedArticle.version).to.equal(2);

        // "reload" the article from the database,
        // just to make sure that the changes to the version
        // are saved properly!
        return updatedArticle.reload();
      })
      .then(function (reloadedArticle) {
        expect(reloadedArticle.version).to.equal(2);
      });

    });

  });

  describe('extra credit `tags` field', function(){

    /** EXTRA CREDIT
     * Your Article model should have a tag field that's an array, but when we
     * access it, we should get one string: the tags joined by a comma and space
     *
     * Look at getters and setters:
     * http://docs.sequelizejs.com/manual/tutorial/models-definition.html#getters-setters
     *
     * To activate this spec, change `xit` to `it`
     */
    xit('is a custom getter', function () {

      // tags should have a `defaultValue` that is an empty array.
      expect(Article.attributes.tags.defaultValue).to.deep.equal([]);

      // main functionality of tags
      return Article.create({
        title: 'Taggy',
        content: 'So Taggy',
        tags: ['tag1', 'tag2', 'tag3']
      })
      .then(function (createdArticle) {
        expect(createdArticle.tags).to.equal('tag1, tag2, tag3');
      });

    });

  });

});
