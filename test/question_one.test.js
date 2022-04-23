// * Output Test Cases
// -> Valid Test Cases Output.
// 1. Data type: string.  typeof input === 'string'
// 2. Grammar:
//     i. All characters should be set of allowed characters.
//    ii. Satisfy the regular expression.
//   iii. Length of the string must be <= 100.
// 3. Is sorted.

// -> Invalid Test Cases Output
// 1. -404.

const testCase = require("mocha").describe;
const pre = require("mocha").before;
const assertions = require("mocha").it;
const assert = require("chai").assert;
const qs = require("../src/services/question_one.service");
const qc = require("../src/controllers/question_one.controller");
const ejs = require("ejs");
const MockExpressRequest = require("mock-express-request");
const MockExpressResponse = require("mock-express-response");
const { resolveInclude } = require("ejs");

// * 0. Happy case / Valid Input case
// 1. Data type: string.  typeof input === 'string'
// 2. Grammar:
//     i. All characters should be set of allowed characters.
//    ii. Satisfy the regular expression: /(-?\d+\+)?(-?\d+)?$/
//   iii. Length of the string must be <= 100

testCase(
  "\n\n****************************** QUESTION ONE TEST CASES ******************************\n",
  function () {
    pre(function () {});

    testCase("Happy / Valid test cases", function () {
      assertions("Should return(excluding quotes): '1' ", function () {
        const input = "1";
        const output = qs.getOutput(input);
        assert.equal(output, "1");
      });

      var temp = "9".repeat(100);
      assertions(`Should return: ${temp} `, function () {
        const input = "9".repeat(100);
        const output = qs.getOutput(input);
        assert.equal(output, input);
      });

      assertions("Should return(excluding quotes): '-1' ", function () {
        const input = "-1";
        const output = qs.getOutput(input);
        assert.equal(output, "-1");
      });

      // * Negative integers
      var temp = "-" + "9".repeat(99);
      assertions(`Should return: ${temp} `, function () {
        const input = "-" + "9".repeat(99);
        const output = qs.getOutput(input);
        assert.equal(output, input);
      });

      assertions("Should return(excluding quotes): '1+2' ", function () {
        const input = "1+2";
        const output = qs.getOutput(input);
        assert.equal(output, "1+2");
      });

      temp = "1+2+".repeat(24) + "1+2";
      assertions(`Should return(excluding quotes): '${temp}' `, function () {
        const input = "1+2+".repeat(24) + "1+2";
        const output = qs.getOutput(input);
        const expectedOutput = "1+".repeat(25) + "2+".repeat(24) + "2";
        assert.equal(output, expectedOutput);
      });

      assertions(`Should return(excluding quotes): '${temp}' `, function () {
        const input = "1+2+".repeat(24) + "1+2";
        const output = qs.getOutput(input);
        const expectedOutput = "1+".repeat(25) + "2+".repeat(24) + "2";
        assert.equal(output, expectedOutput);
      });

      const a = "1".repeat(49);
      const b = "2".repeat(49);
      assertions(`Should return(excluding quotes): '${a}+${b}' `, function () {
        const a = "1".repeat(49);
        const b = "2".repeat(49);
        const input = a + "+" + b;
        const output = qs.getOutput(input);
        const expectedOutput = a + "+" + b;
        assert.equal(output, expectedOutput);
      });

      assertions(`Should return(excluding quotes): '${b}+${a}' `, function () {
        const a = "1".repeat(49);
        const b = "2".repeat(49);
        const input = b + "+" + a;
        const output = qs.getOutput(input);
        const expectedOutput = a + "+" + b;
        assert.equal(output, expectedOutput);
      });
    });

    // * 1. Error Guessing: Negative input or invalid values and try to guess the error message in the application.
    // 1. input: null / undefined.
    // 2. input: boolean.
    // 3. invalid string format cases: empty string / invalid grammar.
    // 4. invalid numbers: negative / 0 / positive, fraction, integer.
    // 5. invalid object: empty object / object with random key/value pairs.
    // 6. array: empty array / array with invalid data type / invalid values.
    // 7. function: arrow function / normal function * function with arguments.
    // 8. Length of the string >= 100.

    testCase("Invalid test cases", function () {
      assertions(
        "Input = null, assert errors.length == 0, false ",
        async function () {
          try {
            const input = null;
            const mockRequest = new MockExpressResponse();
            mockRequest.body = {
              input: input,
            };
            const { errors } = await qs.validate("getOutput", mockRequest);
            assert.equal(errors.length, false);
          } catch (e) {
            console.log(e);
          }
        }
      );

      assertions(
        "Input = undefined, assert errors.length == 0, false ",
        async function () {
          try {
            var input;
            const mockRequest = new MockExpressResponse();
            mockRequest.body = {
              input: input,
            };
            const { errors } = await qs.validate("getOutput", mockRequest);
            assert.equal(errors.length, false);
          } catch (e) {
            console.log(e);
          }
        }
      );

      var temp = "9".repeat(101);
      assertions(
        `Input = ${temp}, assert errors.length == 0, false`,
        async function () {
          const input = "9".repeat(101);
          const mockRequest = new MockExpressResponse();
          mockRequest.body = {
            input: input,
          };
          const { errors } = await qs.validate("getOutput", mockRequest);
          assert.equal(errors.length == 0, false);
        }
      );

      assertions(
        "Input = '1+2', assert errors.length == 0, false",
        async function () {
          const input = "1+2.0";
          const mockRequest = new MockExpressResponse();
          mockRequest.body = {
            input: input,
          };
          const { errors } = await qs.validate("getOutput", mockRequest);
          assert.equal(errors.length, false);
        }
      );

      temp = "1+2+".repeat(24) + "1+2";
      assertions(
        `Input is ${temp}, assert errors.length == 0, false`,
        async function () {
          const input = "1+2+".repeat(24) + "1+2+";
          const mockRequest = new MockExpressResponse();
          mockRequest.body = {
            input: input,
          };
          const { errors } = await qs.validate("getOutput", mockRequest);
          assert.equal(errors.length, false);
        }
      );

      assertions(
        `Input is ${temp}, assert errors.length == 0, false`,
        async function () {
          const input = "1+2+".repeat(24) + "1+2";
          const mockRequest = new MockExpressResponse();
          mockRequest.body = {
            input: input,
          };
          const { errors } = await qs.validate("getOutput", mockRequest);
          assert.equal(errors.length, false);
        }
      );

      const a = "1".repeat(49);
      const b = "2".repeat(49);
      assertions(
        `Input is ${a}+${b}, assert errors.length == 0, false`,
        async function () {
          const a = "1".repeat(49);
          const b = "2".repeat(49);
          const input = a + "+" + b;
          const mockRequest = new MockExpressResponse();
          mockRequest.body = {
            input: input,
          };
          const { errors } = await qs.validate("getOutput", mockRequest);
          assert.equal(errors.length, false);
        }
      );

      assertions(
        `Input is ${b}+${a}, assert errors.length == 0, false`,
        async function () {
          const a = "1".repeat(49);
          const b = "2".repeat(49);
          const input = a + "+" + b;
          const mockRequest = new MockExpressResponse();
          mockRequest.body = {
            input: input,
          };
          const { errors } = await qs.validate("getOutput", mockRequest);
          assert.equal(errors.length, false);
        }
      );
    });

    // * 2. Equivalence Class Partitioning: divide the range of values into Equivalent parts & test for all
    // *      the values & also make sure that we are testing for at least two invalid values.
    // * -> Taking length of string as heuristic -> [1,100] and partition interval = 20;
    testCase(
      "Equivalence Class Partitioning (2 invalid test cases per interval)",
      function () {
        for (var i = 0; i < 5; i++) {
          for (var j = 1; j <= 20; j++) {
            const input = "1".repeat(20 * i + j);
            assertions(
              `Input = ${input}, assert errors.length == 0, true `,
              async function () {
                try {
                  const mockRequest = new MockExpressResponse();
                  mockRequest.body = {
                    input: input,
                  };
                  const { errors } = await qs.validate(
                    "getOutput",
                    mockRequest
                  );
                  assert.equal(errors.length == 0, true);
                } catch (e) {
                  console.log(e);
                }
              }
            );
          }

          // * Two invalid cases per interval.
          const invalidInput1 = "9".repeat(100 + i * 20 + 1);
          assertions(
            `Input = ${invalidInput1}, assert errors.length == 0, false `,
            async function () {
              try {
                const mockRequest = new MockExpressResponse();
                mockRequest.body = {
                  input: invalidInput1,
                };
                const { errors } = await qs.validate("getOutput", mockRequest);
                assert.equal(errors.length == 0, false);
              } catch (e) {
                console.log(e);
              }
            }
          );

          const invalidInput2 = "9".repeat(100 + i * 20 + 1);
          assertions(
            `Input = ${invalidInput2}, assert !errors.isEmpty == true `,
            async function () {
              try {
                const mockRequest = new MockExpressResponse();
                mockRequest.body = {
                  input: invalidInput2,
                };
                const { errors } = await qs.validate("getOutput", mockRequest);
                assert.equal(!errors.isEmpty, true);
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
    testCase("Boundary test cases", function () {
      assertions(
        `Input = '', assert errors.length == 0, true `,
        async function () {
          const input = "";
          try {
            const mockRequest = new MockExpressResponse();
            mockRequest.body = {
              input: input,
            };
            const { errors } = await qs.validate("getOutput", mockRequest);
            assert.equal(errors.length == 0, false);
          } catch (e) {
            console.log(e);
          }
        }
      );

      assertions(
        `Input = '5', assert errors.length == 0, true `,
        async function () {
          const input = "5";
          try {
            const mockRequest = new MockExpressResponse();
            mockRequest.body = {
              input: input,
            };
            const { errors } = await qs.validate("getOutput", mockRequest);
            assert.equal(errors.length == 0, true);
          } catch (e) {
            console.log(e);
          }
        }
      );

      var temp = "7".repeat(99);
      assertions(
        `Input = ${temp}, assert errors.length == 0, true `,
        async function () {
          const input = "7".repeat("99");
          try {
            const mockRequest = new MockExpressResponse();
            mockRequest.body = {
              input: input,
            };
            const { errors } = await qs.validate("getOutput", mockRequest);
            assert.equal(errors.length == 0, true);
          } catch (e) {
            console.log(e);
          }
        }
      );

      temp = "6".repeat(100);
      assertions(
        `Input = ${temp}, assert errors.length == 0, true `,
        async function () {
          const input = "6".repeat("100");
          try {
            const mockRequest = new MockExpressResponse();
            mockRequest.body = {
              input: input,
            };
            const { errors } = await qs.validate("getOutput", mockRequest);
            assert.equal(errors.length == 0, true);
          } catch (e) {
            console.log(e);
          }
        }
      );

      temp = "4".repeat(101);
      assertions(
        `Input = ${temp}, assert errors.length == 0, true `,
        async function () {
          const input = "4".repeat("101");
          try {
            const mockRequest = new MockExpressResponse();
            mockRequest.body = {
              input: input,
            };
            const { errors } = await qs.validate("getOutput", mockRequest);
            assert.equal(errors.length == 0, false);
          } catch (e) {
            console.log(e);
          }
        }
      );
    });

    // * 4. Decision Table Technique: not required for question one and question two testing(As this technique requires two or more dependent inputs).

    // * 5. State Transition Diagram/ Technique: not required (As it useful for testing a set of functions/transitions).
    // * -> Can we used by taking regular expression grammar.
  }
);
