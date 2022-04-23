const { body, validationResult } = require("express-validator");

class QuestionsOneService {
  constructor() {
    this.getOutput = this.getOutput.bind(this);
  }

  getOutput(input) {
    try {
      const arr = input.split("+");
      const sortedArr = arr.sort((a, b) => parseInt(a) - parseInt(b));
      const res = sortedArr.join("+");
      return res;
    } catch (e) {
      throw e;
    }
  }

  async validate(method, req) {
    try {
      switch (method) {
        case "getOutput": {
          return await this.validateGetOutput(req);
        }
      }
    } catch (e) {
      throw e;
    }
  }

  async validateGetOutput(req) {
    const validations = [
      body("input")
        .exists({
          checkFalsy: false,
          checkNull: false,
        })
        .withMessage("input should not be null or falsy"),
      body("input")
        .not()
        .isEmpty()
        .withMessage("input should not be empty string"),
      body("input")
        .isLength({ min: 1, max: 100 })
        .withMessage("input string must have length>=1 and length<=100"),
      // body("input")
      //   .matches(/[0-9+-]+/)
      //   .withMessage("Allowed characters integers and + and - symbol"),
      body("input")
        .matches(/^(-?\d+){1}(\+-?\d+)*$/)
        .withMessage(
          "Invalid input string provided, please refer to questions 1 problem statement."
        ),
    ];
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    return {
      isValid: errors.isEmpty(), // * request is valid
      errors: errors.errors, // * return errors to be used for in valid case
      defaultOutput: process?.env?.DEFAULT_OUTPUT ?? -404, // * return default output
    };
  }
}

module.exports = new QuestionsOneService();
