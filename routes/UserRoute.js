const express = require("express");
const routes = express();
const {
  getUsers,
  register,
  updateUsers,
  deleteUsers,
  findUsersById,
} = require("../controller/UserController");

routes.get("/users", getUsers);
routes.post("/users/login", findUsersById);
routes.post("/users", register);
routes.put("/users", updateUsers);
routes.delete("/users", deleteUsers);

module.exports = routes;
