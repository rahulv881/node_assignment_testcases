const { validationResult } = require("express-validator");
const questionOneService = require("../services/question_one.service");

class QuestionOneController {
  constructor() {
    this.questionOneService = questionOneService;
    this.defaultData = process.env.DEFAULT_OUTPUT;
  }

  // * Get mathematical string output.
  getOutput = (req, res, next) => {
    try {
      const output = this.questionOneService.getOutput(req.body.input);
      return res.json({ data: output, message: "success", error: [] });
    } catch (e) {
      // TODO: Add logger here.
      return res
        .status(500)
        .json({ data: this.defaultData, message: e.toString(), error: [] });
    }
  };

  // * Validate question one controller methods request packet.
  validate = (method) => {
    try {
      return async (req, res, next) => {
        const errors = await this.questionOneService.validate(method, req);

        if (errors.isEmpty()) {
          return next();
        }

        return res.status(400).json({
          data: this.defaultData,
          message: "Invalid data provided, Refer error for more detail.",
          error: errors.array(),
        });
      };
    } catch (e) {
      // TODO: Add logger here.
      console.log(e);
      return res
        .status(500)
        .json({ data: this.defaultData, message: e.toString(), error: [] });
    }
  };
}

module.exports = new QuestionOneController();
