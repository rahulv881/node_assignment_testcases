const express = require("express");
const questionOneController = require("../controllers/question_one.controller");
let app = express.Router();

app.post(
  "/one",
  questionOneController.validate("getOutput"),
  questionOneController.getOutput
);

app.get("/two", function (req, res) {
  res.json({ message: "success", data: "Questions two" });
});

module.exports = app;
