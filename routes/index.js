const express = require("express");
const app = express();

const users = require("./UserRoute");
const news = require("./NewsRoute");

const apiUrl = "/api/v1";

app.use(apiUrl, users);
app.use(apiUrl, news);

module.exports = app;
