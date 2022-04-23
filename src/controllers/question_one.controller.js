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
        .json({ data: null, message: e.toString(), error: [] });
    }
  };

  // * Validate question one controller methods request packet.
  validate = (method) => {
    try {
      return async (req, res, next) => {
        const { isValid, errors, defaultOutput } =
          await this.questionOneService.validate(method, req);

        if (isValid) {
          return next();
        }

        return res.status(400).json({
          data: defaultOutput,
          message: "Invalid data provided, Refer error for more detail.",
          error: errors,
        });
      };
    } catch (e) {
      // TODO: Add logger here.
      console.log(e);
      return res
        .status(500)
        .json({ data: null, message: e.toString(), error: [] });
    }
  };
}

module.exports = new QuestionOneController();
