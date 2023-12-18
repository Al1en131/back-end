const express = require("express");
const app = express();

const users = require("./UserRoute");
const news = require("./NewsRoute");
const education = require("./EducationRoute");
const community = require("./CommunityRoute");
const pickups = require("./PickupRoute");

const apiUrl = "/api/v1";

app.use(apiUrl, users);
app.use(apiUrl, news);
app.use(apiUrl, education);
app.use(apiUrl, community);
app.use(apiUrl, pickups);

module.exports = app;
