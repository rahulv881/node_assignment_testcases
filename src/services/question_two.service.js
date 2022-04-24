const { body, validationResult } = require("express-validator");
class QuestionsTwoService {
  constructor() {
    this.getOutput = this.getOutput.bind(this);
    this.validate = this.validate.bind(this);
  }

  getOutput(input) {
    try {
      const searchStr = "bear";
      const l = searchStr.length;
      if (l == 0) {
        return [];
      }

      // * Find out indices of search string.
      var startIndex = 0,
        index,
        indices = [];
      while ((index = input.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + l;
      }

      // * Make the pairs
      const pairs = [];
      for (var i = 0; i < indices.length; i++) {
        for (var j = i + l - 1; j < input.length; j++) {
          pairs.push([i, j]);
        }
      }

      // * Convert to 1-based indices pairs.
      const res = pairs.map((pair) => [pair[0] + 1, pair[1] + 1]);
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
        .isLength({ min: 1, max: 1000 })
        .withMessage("input string must have length>=1 and length<=1000"),
      body("input")
        .isLowercase()
        .withMessage("input string must have lowercase letters only"),
      body("input")
        .matches(/^[a-z]+$/)
        .withMessage("input string must have lowercase alphabets only"),
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

module.exports = new QuestionsTwoService();
