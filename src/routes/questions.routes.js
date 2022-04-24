const express = require("express");
const questionOneController = require("../controllers/question_one.controller");
const questionTwoController = require("../controllers/question_two.controller");
let app = express.Router();

app.post(
  "/one",
  questionOneController.validate("getOutput"),
  questionOneController.getOutput
);

app.post(
  "/two",
  questionTwoController.validate("getOutput"),
  questionTwoController.getOutput
);

module.exports = app; // * For testing (if required).
