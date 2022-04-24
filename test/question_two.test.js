const testCase = require("mocha").describe;
const pre = require("mocha").before;
const assertions = require("mocha").it;
const assert = require("chai").assert;
const qs = require("../src/services/question_two.service");
const MockExpressResponse = require("mock-express-response");
const validateInput = async (input) => {
  const mockRequest = new MockExpressResponse();
  mockRequest.body = {
    input: input,
  };
  const { isValid, errors, defaultOutput } = await qs.validate(
    "getOutput",
    mockRequest
  );
  return { isValid, errors, defaultOutput };
};
var temp;

// * 0. Valid Input case
testCase(
  "\n\n****************************** QUESTION TWO TEST CASES ******************************\n",
  function () {
    pre(function () {
      temp = "";
    });

    temp = "bearbtear";
    testCase("Valid input test cases", function () {
      assertions(
        `input = ${temp}assert.equal(isValid, true) and assert.equal(output, expectedOutput);`,
        async function () {
          const input = "bearbtear";
          const { isValid } = await validateInput(input);
          assert.equal(isValid, true);
          const output = qs.getOutput(input);
          const expectedOutput = [
            [1, 4],
            [1, 5],
            [1, 6],
            [1, 7],
            [1, 8],
            [1, 9],
          ];
          assert.deepEqual(output, expectedOutput);
        }
      );
    });

    // * 1. Error Guessing: Negative input or invalid values and try to guess the error message in the application.
    // ! Note: Invalid request will be reject before output calculation.
    // ! -therefore, we don't need to test output for invalid cases.
    testCase("Invalid input test cases", function () {
      // 1. input: null / undefined.
      assertions(
        "Input = null, assert.equal(isValid, false) and assert.equal(defaultOutput, -404 ",
        async function () {
          try {
            const input = null;
            const { isValid, defaultOutput } = await validateInput(input);
            assert.equal(isValid, false);
            assert.equal(defaultOutput, -404);
          } catch (e) {
            console.log(e);
          }
        }
      );
      assertions(
        "Input = undefined, assert.equal(isValid, false) and assert.equal(defaultOutput, -404",
        async function () {
          try {
            var input;
            const { isValid, defaultOutput } = await validateInput(input);
            assert.equal(isValid, false);
            assert.equal(defaultOutput, -404);
          } catch (e) {
            console.log(e);
          }
        }
      );

      // 2. input: boolean.
      assertions(
        "Input = null, assert.equal(isValid, false) and assert.equal(defaultOutput, -404 ",
        async function () {
          try {
            const input = true;
            const { isValid, defaultOutput } = await validateInput(input);
            assert.equal(isValid, false);
            assert.equal(defaultOutput, -404);
          } catch (e) {
            console.log(e);
          }
        }
      );
      assertions(
        "Input = null, assert.equal(isValid, false) and assert.equal(defaultOutput, -404 ",
        async function () {
          try {
            const input = false;
            const { isValid, defaultOutput } = await validateInput(input);
            assert.equal(isValid, false);
            assert.equal(defaultOutput, -404);
          } catch (e) {
            console.log(e);
          }
        }
      );

      // 3. invalid string format cases: empty string / invalid grammar.
      temp = "";
      assertions(
        `Input = ${temp}, assert.equal(isValid, false) and assert.equal(defaultOutput, -404`,
        async function () {
          const input = "";
          const { isValid, defaultOutput } = await validateInput(input);
          assert.equal(isValid, false);
          assert.equal(defaultOutput, -404);
        }
      );
      temp = "a*".repeat(11);
      assertions(
        `Input = ${temp}, assert.equal(isValid, false) and assert.equal(defaultOutput, -404`,
        async function () {
          const input = "a*".repeat(11);
          const { isValid, defaultOutput } = await validateInput(input);
          assert.equal(isValid, false);
          assert.equal(defaultOutput, -404);
        }
      );

      // 4. Invalid characters: fraction,number, integers, special characters('_', ' ').
      temp = "1.1".repeat(20);
      assertions(
        `Input = ${temp}, assert.equal(isValid, false) and assert.equal(defaultOutput, -404`,
        async function () {
          const input = "1.1".repeat(20);
          const { isValid, defaultOutput } = await validateInput(input);
          assert.equal(isValid, false);
          assert.equal(defaultOutput, -404);
        }
      );
      temp = "-1.1".repeat(11);
      assertions(
        `Input = ${temp}, assert.equal(isValid, false) and assert.equal(defaultOutput, -404`,
        async function () {
          const input = "-1.1".repeat(11);
          const { isValid, defaultOutput } = await validateInput(input);
          assert.equal(isValid, false);
          assert.equal(defaultOutput, -404);
        }
      );

      // 5. invalid object: empty object / object with random key/value pairs.
      temp = {};
      assertions(
        "Input = '{}', assert.equal(isValid, false) and assert.equal(defaultOutput, -404",
        async function () {
          const input = "1+2.0";
          const { isValid, defaultOutput } = await validateInput(input);
          assert.equal(isValid, false);
          assert.equal(defaultOutput, -404);
        }
      );
      temp = { name: "rahul" };
      assertions(
        "Input = '{}', assert.equal(isValid, false) and assert.equal(defaultOutput, -404",
        async function () {
          const input = { name: "rahul" };
          const { isValid, defaultOutput } = await validateInput(input);
          assert.equal(isValid, false);
          assert.equal(defaultOutput, -404);
        }
      );

      // 6. array: empty array / array with invalid data type / invalid values.
      temp = [];
      assertions(
        "Input = '[]', assert.equal(isValid, false) and assert.equal(defaultOutput, -404",
        async function () {
          const input = [];
          const { isValid, defaultOutput } = await validateInput(input);
          assert.equal(isValid, false);
          assert.equal(defaultOutput, -404);
        }
      );

      // 7. function: arrow function / normal function * function with arguments.
      temp = () => {};
      assertions(
        "Input is a function, assert.equal(isValid, false) and assert.equal(defaultOutput, -404",
        async function () {
          const input = () => {};
          const { isValid, errors, defaultOutput } = await validateInput(input);
          assert.equal(isValid, false);
          assert.equal(defaultOutput, -404);
        }
      );

      // 8. Length of the string >= 1000.
      temp = "3".repeat(1150);
      assertions(
        `Input = ${temp}, assert.equal(isValid, false) and assert.equal(defaultOutput, -404`,
        async function () {
          const input = "3".repeat(150);
          const { isValid, errors, defaultOutput } = await validateInput(input);
          assert.equal(isValid, false);
          assert.equal(defaultOutput, -404);
        }
      );
    });

    // * 2. Equivalence Class Partitioning: divide the range of values into Equivalent parts & test for all
    // *      the values & also make sure that we are testing for at least two invalid values.
    // * -> Taking length of string as heuristic -> [1,1000] and partition interval = 100;
    // ! Note: Per interval 2 invalid test cases / 100 valid test cases are taken.
    testCase(
      "Equivalence Class Partitioning (2 invalid test cases per interval)",
      function () {
        for (var i = 0; i < 5; i++) {
          for (var j = 1; j <= 200; j++) {
            const input = "b".repeat(200 * i + j);
            assertions(
              `Input = ${input}, assert isValid, true `,
              async function () {
                try {
                  const { isValid } = await validateInput(input);
                  assert.equal(isValid, true);
                  const output = qs.getOutput(input);
                  const expectedOutput = [];
                  assert.deepEqual(output, expectedOutput);
                } catch (e) {
                  console.log(e);
                }
              }
            );
          }

          // * Two invalid cases per interval.
          const invalidInput1 = "z".repeat(1000 + i * 100 + 1);
          assertions(
            `Input = ${invalidInput1}, assert isValid == false and defaultOutput == -404 `,
            async function () {
              try {
                const { isValid, defaultOutput } = await validateInput(
                  invalidInput1
                );
                assert.equal(isValid, false);
                assert.equal(defaultOutput, -404);
              } catch (e) {
                console.log(e);
              }
            }
          );

          const invalidInput2 = "e".repeat(1000 + i * 100 + 1);
          assertions(
            `Input = ${invalidInput2}, assert isValid == false && defaultOutput == -404`,
            async function () {
              try {
                const { isValid, defaultOutput } = await validateInput(
                  invalidInput2
                );
                assert.equal(isValid, false);
                assert.equal(defaultOutput, -404);
              } catch (e) {
                console.log(e);
              }
            }
          );
        }
      }
    );

    // * 3. Boundary Value Analysis (BVA): If the input is range of values between A to B then design test cases for A, A+1, A-1 and B, B+1, B-1.
    // * -> Taking length of string as Boundary [1,1000] -> 0 , 1 , 999 , 1000 , 1001 (Rejecting -1 as length can't be negative).
    testCase(
      "Boundary test cases (include both valid and invalid input test cases",
      function () {
        assertions(`Input = '', assert isValid, false `, async function () {
          const input = "";
          try {
            const { isValid, defaultOutput } = await validateInput(input);
            assert.equal(isValid, false);
            assert.equal(defaultOutput, -404);
          } catch (e) {
            console.log(e);
          }
        });

        assertions(`Input = 'd', assert isValid, true `, async function () {
          const input = "d";
          try {
            const { isValid } = await validateInput(input);
            assert.equal(isValid, true);
            const output = qs.getOutput(input);
            const expectedOutput = [];
            assert.deepEqual(output, expectedOutput);
          } catch (e) {
            console.log(e);
          }
        });

        temp = "b".repeat(999);
        assertions(`Input = ${temp}, assert isValid, true `, async function () {
          const input = "b".repeat(999);
          try {
            const { isValid } = await validateInput(input);
            assert.equal(isValid, true);
            const expectedOutput = [];
            const output = qs.getOutput(input);
            assert.deepEqual(output, expectedOutput);
          } catch (e) {
            console.log(e);
          }
        });

        temp = "c".repeat(1000);
        assertions(`Input = ${temp}, assert isValid, true `, async function () {
          const input = "c".repeat(1000);
          try {
            const { isValid } = await validateInput(input);
            assert.equal(isValid, true);
            const expectedOutput = [];
            const output = qs.getOutput(input);
            assert.deepEqual(output, expectedOutput);
          } catch (e) {
            console.log(e);
          }
        });

        temp = "f".repeat(1001);
        assertions(
          `Input = ${temp}, assert isValid, false `,
          async function () {
            const input = "f".repeat(1001);
            try {
              const { isValid, defaultOutput } = await validateInput(input);
              assert.equal(isValid, false);
              assert.equal(defaultOutput, -404);
            } catch (e) {
              console.log(e);
            }
          }
        );
      }
    );

    // * 4. Decision Table Technique: not required for question two and question two testing.
    // * -> As this technique requires two or more dependent input states.

    // * 5. State Transition Diagram/ Technique: not required (As it useful for testing a set of functions/transitions).
    // * -> Can we used by taking regular expression grammar.
  }
);
