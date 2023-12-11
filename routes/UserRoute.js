const express = require("express");
const routes = express();
const {
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers,
  findUsersById,
} = require("../controller/UserController");

routes.get("/users", getUsers);
routes.get("/users/:email", findUsersById);
routes.post("/users", createUsers);
routes.put("/users", updateUsers);
routes.delete("/users", deleteUsers);

module.exports = routes;
