"use strict";

const expect = require("chai").expect;
const request = require("supertest");

const app = require("../server/app");
const agent = request.agent(app);

const db = require("../server/models/database");
const Article = require("../server/models/article");
const User = require("../server/models/user");

/**
 *
 * Article Route Tests
 *
 * Do these after you finish the Article Model tests
 *
 */
describe("Articles Route:", () => {
  /**
   * First we clear the database before beginning each run
   */
  before(() => {
    return db.sync({ force: true });
  });

  /**
   * Also, we empty the tables after each spec
   */
  afterEach(() => {
    return Promise.all([
      Article.truncate({ cascade: true }),
      User.truncate({ cascade: true })
    ]);
  });

  describe("GET /articles", () => {
    /**
     * Problem 1
     * We'll run a GET request to /articles
     *
     * 1.  It should return JSON (i.e., use res.json)
     * 2.  Because there isn't anything in the DB, it should be an empty array
     *
     * **Extra Credit**: Consider using app.param to automatically load
     * in the Article whenever a param :id is detected
     */
    it("responds with an array via JSON", async () => {
      const res = await agent
        .get("/articles")
        .expect("Content-Type", /json/)
        .expect(200);

      // res.body is the JSON return object
      expect(res.body).to.be.an.instanceOf(Array);
      expect(res.body).to.have.length(0);
    });

    /**
     * Problem 2
     * Save an article in the database using our model and then retrieve it
     * using the GET /articles route
     *
     */
    it("returns an article if there is one in the DB", async () => {
      await Article.create({
        title: "Test Article",
        content: "Test body"
      });

      const res = await agent.get("/articles").expect(200);

      expect(res.body).to.be.an.instanceOf(Array);
      expect(res.body[0].content).to.equal("Test body");
    });

    /**
     * Problem 3
     * Save a second article in the database using our model, then retrieve it
     * using the GET /articles route
     *
     */
    it("returns another article if there is one in the DB", async () => {
      await Article.create({
        title: "Test Article",
        content: "Test body"
      });
      await Article.create({
        title: "Another Test Article",
        content: "Another test body"
      });

      const res = await agent.get("/articles").expect(200);

      expect(res.body).to.be.an.instanceOf(Array);
      expect(res.body[0].content).to.equal("Test body");
      expect(res.body[1].content).to.equal("Another test body");
    });
  });

  /**
   * Search for articles by ID
   */
  describe("GET /articles/:id", () => {
    let coolArticle;

    beforeEach(async () => {
      const creatingArticles = [
        {
          title: "Boring article",
          content: "This article is boring"
        },
        {
          title: "Cool Article",
          content: "This article is cool"
        },
        {
          title: "Riveting Article",
          content: "This article is riveting"
        }
      ].map(data => Article.create(data));

      const createdArticles = await Promise.all(creatingArticles);
      coolArticle = createdArticles[1];
    });

    /**
     * This is a proper GET /articles/ID request
     * where we search by the ID of the article created above
     */
    xit("returns the JSON of the article based on the id", async () => {
      const res = await agent.get("/articles/" + coolArticle.id).expect(200);

      if (typeof res.body === "string") {
        res.body = JSON.parse(res.body);
      }
      expect(res.body.title).to.equal("Cool Article");
    });

    /**
     * Here we pass in a bad ID to the URL, we should get a 404 error
     */
    xit("returns a 404 error if the ID is not correct", () => {
      return agent.get("/articles/76142896").expect(404);
    });
  });

  /**
   * Series of tests to test creation of new Articles using a POST
   * request to /articles
   */
  describe("POST /articles", () => {
    /**
     * Test the creation of an article
     * Here we don't get back just the article, we get back an object of this type, which you construct:
     *  {
     *    message: 'Created successfully',
     *    article: <the created article instance>
     *  }
     *
     */
    xit("creates a new article", async () => {
      const res = await agent
        .post("/articles")
        .send({
          title: "Awesome POST-Created Article",
          content: "Can you believe I did this in a test?"
        })
        .expect(200);

      expect(res.body.message).to.equal("Created successfully");
      expect(res.body.article.id).to.not.be.an("undefined");
      expect(res.body.article.title).to.equal("Awesome POST-Created Article");
    });

    // This one should fail with a 500 because we don't set the article.content
    xit("does not create a new article without content", () => {
      return agent
        .post("/articles")
        .send({
          title: "This Article Should Not Be Allowed"
        })
        .expect(500);
    });

    // Check if the articles were actually saved to the database
    xit("saves the article to the DB", async () => {
      await agent
        .post("/articles")
        .send({
          title: "Awesome POST-Created Article",
          content: "Can you believe I did this in a test?"
        })
        .expect(200);

      const foundArticle = await Article.findOne({
        where: { title: "Awesome POST-Created Article" }
      });

      expect(foundArticle).to.exist; // eslint-disable-line no-unused-expressions
      expect(foundArticle.content).to.equal(
        "Can you believe I did this in a test?"
      );
    });

    // Do not assume async operations (like db writes) will work; always check
    xit("sends back JSON of the actual created article, not just the POSTed data", async () => {
      const res = await agent
        .post("/articles")
        .send({
          title: "Coconuts",
          content: "A full-sized coconut weighs about 1.44 kg (3.2 lb).",
          extraneous: "Sequelize will quietly ignore this non-schema property"
        })
        .expect(200);

      expect(res.body.article.extraneous).to.be.an("undefined");
      expect(res.body.article.createdAt).to.exist; // eslint-disable-line no-unused-expressions
    });
  });

  /**
   * Series of specs to test updating of Articles using a PUT
   * request to /articles/:id
   */
  describe("PUT /articles/:id", () => {
    let article;

    beforeEach(async () => {
      article = await Article.create({
        title: "Final Article",
        content: "You can do it!"
      });
    });

    /**
     * Test the updating of an article
     * Here we don't get back just the article, we get back an object of this type, which you construct:
     *  {
     *    message: 'Updated successfully',
     *    article: <the updated article instance>
     *  }
     *
     **/
    xit("updates an article", async () => {
      const res = await agent
        .put("/articles/" + article.id)
        .send({
          title: "Awesome PUT-Updated Article"
        })
        .expect(200);

      expect(res.body.message).to.equal("Updated successfully");
      expect(res.body.article.id).to.not.be.an("undefined");
      expect(res.body.article.title).to.equal("Awesome PUT-Updated Article");
      expect(res.body.article.content).to.equal("You can do it!");
    });

    xit("saves updates to the DB", async () => {
      await agent.put("/articles/" + article.id).send({
        title: "Awesome PUT-Updated Article"
      });

      const foundArticle = await Article.findById(article.id);

      expect(foundArticle).to.exist; // eslint-disable-line no-unused-expressions
      expect(foundArticle.title).to.equal("Awesome PUT-Updated Article");
    });

    xit("gets 500 for invalid update", () => {
      return agent
        .put("/articles/" + article.id)
        .send({ title: "" })
        .expect(500);
    });
  });
});
