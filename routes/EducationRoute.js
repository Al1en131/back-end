const express = require("express");
const routes = express();
const {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
  findEducationById,
} = require("../controller/EducationController");

routes.get("/education", getEducation);
routes.get("/education/:id", findEducationById);
routes.post("/education", createEducation);
routes.put("/education", updateEducation);
routes.delete("/education", deleteEducation);

module.exports = routes;
