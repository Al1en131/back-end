const express = require("express");
const routes = express();
const { login } = require("../../controller/auth/AuthController");

routes.post("/login", login);

module.exports = routes;
