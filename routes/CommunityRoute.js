const express = require("express");
const routes = express();
const {
  getCommunity,
  createCommunity,
  updateCommunity,
  deleteCommunity,
  findCommunityById,
} = require("../controller/CommunityController");

routes.get("/community", getCommunity);
routes.get("/community/:id", findCommunityById);
routes.post("/community", createCommunity);
routes.put("/community", updateCommunity);
routes.delete("/community", deleteCommunity);

module.exports = routes;
