const express = require("express");
const routes = express();
const {
  getPickups,
  createPickup,
  updatePickup,
  deletePickup,
} = require("../controller/PickupController");

routes.get("/pickups/:id?", getPickups);
routes.post("/pickups", createPickup);
routes.put("/pickups", updatePickup);
routes.delete("/pickups", deletePickup);

module.exports = routes;