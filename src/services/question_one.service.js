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
            body("input")
              .matches(/(-?\d+\+)?(-?\d+)?$/)
              .withMessage(
                "Invalid input string provided, please refer to questions 1 problem statement."
              ),
          ];
          await Promise.all(
            validations.map((validation) => validation.run(req))
          );
          return validationResult(req);
        }
      }
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new QuestionsOneService();
