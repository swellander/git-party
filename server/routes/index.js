const express = require("express");
const router = express.Router();

const Article = require("../models/article");

/**
 *
 *___ _____ _   ___ _____   _  _ ___ ___ ___
 / __|_   _/_\ | _ \_   _| | || | __| _ \ __|
 \__ \ | |/ _ \|   / | |   | __ | _||   / _|
 |___/ |_/_/ \_\_|_\ |_|   |_||_|___|_|_\___|
 *
 *
 */

router.get("/articles", async (req, res, next) => {
  const articles = await Article.findAll();
  res.json(articles);
});

module.exports = router;
