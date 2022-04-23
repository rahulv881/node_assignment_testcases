const testCase = require("mocha").describe;
const pre = require("mocha").before;
const assertions = require("mocha").it;
const assert = require("chai").assert;
const qs = require("../src/services/question_one.service");
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
// 1. Data type: string.  typeof input === 'string'
// 2. Grammar:
//     i. All characters should be set of allowed characters.
//    ii. Satisfy the regular expression: /(-?\d+\+)?(-?\d+)?$/
//   iii. Length of the string must be <= 100

testCase(
  "\n\n****************************** QUESTION ONE TEST CASES ******************************\n",
  function () {
    pre(function () {
      temp = "";
    });
    testCase("Valid input test cases", function () {
      assertions(
        "assert.equal(isValid, true) and should return(excluding quotes): '1' ",
        async function () {
          const input = "1";
          const { isValid } = await validateInput(input);
          assert.equal(isValid, true);
          const output = qs.getOutput(input);
          const expectedOutput = "1";
          assert.equal(output, expectedOutput);
        }
      );

      temp = "9".repeat(100);
      assertions(
        `assert.equal(isValid, true) and should return: ${temp} `,
        async function () {
          const input = "9".repeat(100);
          const { isValid } = await validateInput(input);
          assert.equal(isValid, true);
          const output = qs.getOutput(input);
          const expectedOutput = input;
          assert.equal(output, expectedOutput);
        }
      );

      assertions(
        "assert.equal(isValid, true) and should return(excluding quotes): '-1' ",
        async function () {
          const input = "-1";
          const { isValid } = await validateInput(input);
          assert.equal(isValid, true);
          const output = qs.getOutput(input);
          const expectedOutput = "-1";
          assert.equal(output, expectedOutput);
        }
      );

      // * Negative integers are also integers so the must also pass the test case.
      temp = "-" + "9".repeat(99);
      assertions(
        `assert.equal(isValid, true) and should return: ${temp} `,
        async function () {
          const input = "-" + "9".repeat(99);
          const { isValid } = await validateInput(input);
          assert.equal(isValid, true);
          const output = qs.getOutput(input);
          const expectedOutput = input;
          assert.equal(output, expectedOutput);
        }
      );

      assertions(
        "assert.equal(isValid, true) and should return(excluding quotes): '1+2' ",
        async function () {
          const input = "1+2";
          const { isValid } = await validateInput(input);
          assert.equal(isValid, true);
          const output = qs.getOutput(input);
          const expectedOutput = "1+2";
          assert.equal(output, expectedOutput);
        }
      );

      temp = "1+2+".repeat(24) + "1+2";
      assertions(
        `assert.equal(isValid, true) and should return(without quotes): '${temp}' `,
        async function () {
          const input = "1+2+".repeat(24) + "1+2";
          const { isValid } = await validateInput(input);
          assert.equal(isValid, true);
          const output = qs.getOutput(input);
          const expectedOutput = "1+".repeat(25) + "2+".repeat(24) + "2";
          assert.equal(output, expectedOutput);
        }
      );

      assertions(
        `assert.equal(isValid, true) and should return(without quotes): '${temp}' `,
        async function () {
          const input = "1+2+".repeat(24) + "1+2";
          const { isValid } = await validateInput(input);
          assert.equal(isValid, true);
          const output = qs.getOutput(input);
          const expectedOutput = "1+".repeat(25) + "2+".repeat(24) + "2";
          assert.equal(output, expectedOutput);
        }
      );

      const a = "1".repeat(49);
      const b = "2".repeat(49);
      assertions(
        `assert.equal(isValid, true) and should return(without quotes): '${a}+${b}' `,
        async function () {
          const a = "1".repeat(49);
          const b = "2".repeat(49);
          const input = a + "+" + b;
          const { isValid } = await validateInput(input);
          assert.equal(isValid, true);
          const output = qs.getOutput(input);
          const expectedOutput = a + "+" + b;
          assert.equal(output, expectedOutput);
        }
      );

      assertions(
        `assert.equal(isValid, true) and should return(excluding quotes): '${b}+${a}' `,
        async function () {
          const a = "1".repeat(49);
          const b = "2".repeat(49);
          const input = b + "+" + a;
          const { isValid } = await validateInput(input);
          assert.equal(isValid, true);
          const output = qs.getOutput(input);
          const expectedOutput = a + "+" + b;
          assert.equal(output, expectedOutput);
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

      // 4. invalid numbers: fraction (Note: negative integers are not included).
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

      // 8. Length of the string >= 100.
      temp = "3".repeat(150);
      assertions(
        `Input = ${temp}, assert.equal(isValid, false) and assert.equal(defaultOutput, -404`,
        async function () {
          const input = "3".repeat(150);
          const { isValid, errors, defaultOutput } = await validateInput(input);
          assert.equal(isValid, false);
          assert.equal(defaultOutput, -404);
        }
      );

      // 9. Invalid characters
      assertions(
        "Input = '1+2.0', assert.equal(isValid, false) and assert.equal(defaultOutput, -404",
        async function () {
          const input = "1+2.0";
          const { isValid, errors, defaultOutput } = await validateInput(input);
          assert.equal(isValid, false);
          assert.equal(defaultOutput, -404);
        }
      );

      // 10. Invalid grammar
      temp = "1+2+".repeat(24) + "1+2+";
      assertions(
        `Input is ${temp}, assert.equal(isValid, false) and assert.equal(defaultOutput, -404`,
        async function () {
          const input = "1+2+".repeat(24) + "1+2+";
          const { isValid, defaultOutput } = await validateInput(input);
          assert.equal(isValid, false);
          assert.equal(defaultOutput, -404);
        }
      );
    });

    // * 2. Equivalence Class Partitioning: divide the range of values into Equivalent parts & test for all
    // *      the values & also make sure that we are testing for at least two invalid values.
    // * -> Taking length of string as heuristic -> [1,100] and partition interval = 20;
    // ! Note: Per interval 2 invalid test cases / 20 valid test cases are taken.
    testCase(
      "Equivalence Class Partitioning (2 invalid test cases per interval)",
      function () {
        for (var i = 0; i < 5; i++) {
          for (var j = 1; j <= 20; j++) {
            const input = "1".repeat(20 * i + j);
            assertions(
              `Input = ${input}, assert isValid, true `,
              async function () {
                try {
                  const { isValid } = await validateInput(input);
                  assert.equal(isValid, true);
                  const output = qs.getOutput(input);
                  const expectedOutput = input;
                  assert.equal(output, expectedOutput);
                } catch (e) {
                  console.log(e);
                }
              }
            );
          }

          // * Two invalid cases per interval.
          const invalidInput1 = "9".repeat(100 + i * 20 + 1);
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

          const invalidInput2 = "9".repeat(100 + i * 20 + 1);
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
    // * -> Taking length of string as Boundary [1,100] -> 0 , 1 , 99 , 100 , 101 (Rejecting -1 as length can't be negative).
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

        assertions(`Input = '5', assert isValid, true `, async function () {
          const input = "5";
          try {
            const { isValid } = await validateInput(input);
            assert.equal(isValid, true);
            const output = qs.getOutput(input);
            const expectedOutput = input;
            assert.equal(output, expectedOutput);
          } catch (e) {
            console.log(e);
          }
        });

        temp = "7".repeat(99);
        assertions(`Input = ${temp}, assert isValid, true `, async function () {
          const input = "7".repeat("99");
          try {
            const { isValid } = await validateInput(input);
            assert.equal(isValid, true);
            const expectedOutput = input;
            const output = qs.getOutput(input);
            assert.equal(output, expectedOutput);
          } catch (e) {
            console.log(e);
          }
        });

        temp = "6".repeat(100);
        assertions(`Input = ${temp}, assert isValid, true `, async function () {
          const input = "6".repeat("100");
          try {
            const { isValid } = await validateInput(input);
            assert.equal(isValid, true);
            const expectedOutput = input;
            const output = qs.getOutput(input);
            assert.equal(output, expectedOutput);
          } catch (e) {
            console.log(e);
          }
        });

        temp = "4".repeat(101);
        assertions(
          `Input = ${temp}, assert isValid, false `,
          async function () {
            const input = "4".repeat("101");
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

    // * 4. Decision Table Technique: not required for question one and question two testing.
    // * -> As this technique requires two or more dependent input states.

    // * 5. State Transition Diagram/ Technique: not required (As it useful for testing a set of functions/transitions).
    // * -> Can we used by taking regular expression grammar.
  }
);
