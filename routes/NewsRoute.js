const express = require("express");
const routes = express();
const {
  getNews,
  createNews,
  updateNews,
  deleteNews,
  findNewsById,
} = require("../controller/NewsController");

routes.get("/news", getNews);
routes.get("/news/:id", findNewsById);
routes.post("/news", createNews);
routes.put("/news", updateNews);
routes.delete("/news", deleteNews);

module.exports = routes;
