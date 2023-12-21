const jwt = require("jsonwebtoken");

const jwtSecret = "babehnyeJuraganTanah_666";
const jwtAlgorithm = "HS256";
const jwtExpiresIn = "2h";

module.exports = {
  jwt,
  jwtSecret,
  jwtAlgorithm,
  jwtExpiresIn,
};
