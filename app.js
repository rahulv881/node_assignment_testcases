require("dotenv").config();
const express = require("express");

const questions = require("./src/routes/questions.routes");

const app = express();

app.use(express.json());

app.use("/questions", questions);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
