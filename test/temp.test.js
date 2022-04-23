// // * Output Test Cases
// // -> Valid Test Cases Output.
// // 1. Data type: string.  typeof input === 'string'
// // 2. Grammar:
// //     i. All characters should be set of allowed characters.
// //    ii. Satisfy the regular expression.
// //   iii. Length of the string must be <= 100.
// // 3. Is sorted.

// // -> Invalid Test Cases Output
// // 1. -404.

// const testCase = require("mocha").describe;
// const pre = require("mocha").before;
// const assertions = require("mocha").it;
// const assert = require("chai").assert;
// const qs = require("../src/services/question_one.service");
// const qc = require("../src/controllers/question_one.controller");
// const ejs = require("ejs");
// const MockExpressResponse = require("mock-express-response");
// const validateInput = async (input) => {
//   const mockRequest = new MockExpressResponse();
//   mockRequest.body = {
//     input: input,
//   };
//   const { isValid, errors, defaultOutput } = await qs.validate(
//     "getOutput",
//     mockRequest
//   );
//   return { isValid, errors, defaultOutput };
// };

// // * 0. Valid Input case
// // 1. Data type: string.  typeof input === 'string'
// // 2. Grammar:
// //     i. All characters should be set of allowed characters.
// //    ii. Satisfy the regular expression: /(-?\d+\+)?(-?\d+)?$/
// //   iii. Length of the string must be <= 100

// testCase(
//   "\n\n****************************** QUESTION ONE TEST CASES ******************************\n",
//   function () {
//     testCase("Invalid test cases", function () {
//       var temp = "";
//       //   assertions(
//       //     "Input = null, assert.equal(isValid, false) and assert.equal(defaultOutput, -404 ",
//       //     async function () {
//       //       try {
//       //         const input = null;
//       //         const { isValid, defaultOutput } = await validateInput(input);
//       //         assert.equal(isValid, false);
//       //         assert.equal(defaultOutput, -404);
//       //       } catch (e) {
//       //         console.log(e);
//       //       }
//       //     }
//       //   );

//       //   temp = "9".repeat(101);
//       //   assertions(
//       //     `Input = ${temp}, assert.equal(isValid, false) and assert.equal(defaultOutput, -404`,
//       //     async function () {
//       //       const input = "9".repeat(101);
//       //       const { isValid, errors, defaultOutput } = await validateInput(input);
//       //       assert.equal(isValid, false);
//       //       assert.equal(defaultOutput, -404);
//       //     }
//       //   );

//       assertions(
//         "Input = '1+2.0', assert.equal(isValid, false) and assert.equal(defaultOutput, -404",
//         async function () {
//           const input = "1+2.0";
//           const { isValid, errors, defaultOutput } = await validateInput(input);
//           assert.equal(isValid, false);
//           assert.equal(defaultOutput, -404);
//         }
//       );

//       temp = "1+2+".repeat(24) + "1+2+";
//       assertions(
//         `Input is ${temp}, assert.equal(isValid, false) and assert.equal(defaultOutput, -404`,
//         async function () {
//           const input = "1+2+".repeat(24) + "1+2+";
//           const { isValid, defaultOutput } = await validateInput(input);
//           assert.equal(isValid, false);
//           assert.equal(defaultOutput, -404);
//         }
//       );
//     });

//     // * 2. Equivalence Class Partitioning: divide the range of values into Equivalent parts & test for all
//     // *      the values & also make sure that we are testing for at least two invalid values.
//     // * -> Taking length of string as heuristic -> [1,100] and partition interval = 20;
//     // ! Note: Per interval 2 invalid test cases / 20 valid test cases are taken.
//     testCase(
//       "Equivalence Class Partitioning (2 invalid test cases per interval)",
//       function () {
//         var temp = "";
//         for (var i = 0; i < 5; i++) {
//           for (var j = 1; j <= 20; j++) {
//             const input = "1".repeat(20 * i + j);
//             assertions(
//               `Input = ${input}, assert isValid, true `,
//               async function () {
//                 try {
//                   const { isValid, defaultOutput } = await validateInput(input);
//                   assert.equal(isValid, true);
//                   const output = qs.getOutput(input);
//                   const expectedOutput = input;
//                   assert.equal(output, expectedOutput);
//                 } catch (e) {
//                   console.log(e);
//                 }
//               }
//             );
//           }

//           // * Two invalid cases per interval.
//           const invalidInput1 = "9".repeat(100 + i * 20 + 1);
//           assertions(
//             `Input = ${invalidInput1}, assert isValid == false and defaultOutput == -404 `,
//             async function () {
//               try {
//                 const { isValid, defaultOutput } = await validateInput(
//                   invalidInput1
//                 );
//                 assert.equal(isValid, false);
//                 assert.equal(defaultOutput, -404);
//               } catch (e) {
//                 console.log(e);
//               }
//             }
//           );

//           const invalidInput2 = "9".repeat(100 + i * 20 + 1);
//           assertions(
//             `Input = ${invalidInput2}, assert isValid == false && defaultOutput == -404`,
//             async function () {
//               try {
//                 const { isValid, defaultOutput } = await validateInput(
//                   invalidInput2
//                 );
//                 assert.equal(isValid, false);
//                 assert.equal(defaultOutput, -404);
//               } catch (e) {
//                 console.log(e);
//               }
//             }
//           );
//         }
//       }
//     );

//     // * 3. Boundary Value Analysis (BVA): If the input is range of values between A to B then design test cases for A, A+1, A-1 and B, B+1, B-1.
//     // * -> Taking length of string as Boundary [1,100] -> 0 , 1 , 99 , 100 , 101 (Rejecting -1 as length can't be negative).
//     testCase("Boundary test cases", function () {
//       var temp = "";
//       temp = "7".repeat(99);
//       assertions(`Input = ${temp}, assert isValid, true `, async function () {
//         const input = "7".repeat("99");
//         try {
//           const { isValid } = await validateInput(input);
//           assert.equal(isValid, true);
//           const expectedOutput = input;
//           assert.equal(output, expectedOutput);
//         } catch (e) {
//           console.log(e);
//         }
//       });
//     });

//     // * 4. Decision Table Technique: not required for question one and question two testing.
//     // * -> As this technique requires two or more dependent input states.

//     // * 5. State Transition Diagram/ Technique: not required (As it useful for testing a set of functions/transitions).
//     // * -> Can we used by taking regular expression grammar.
//   }
// );
