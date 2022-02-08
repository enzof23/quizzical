/*


NOT USED, JUST FOR REFERENCE


*/

// import { nanoid } from "nanoid";
// // import { useEffect, useState } from "react";
// import Line from "./Line";

// function Questions({ questions }) {
//   const questionLine = questions.map((q) => {
//     const { question, correctAnswer, incorrectAnswer } = q;
//     return (
//       <Line
//         key={nanoid()}
//         question={question}
//         correctAnswer={correctAnswer}
//         incorrectAnswer={incorrectAnswer}
//       />
//     );
//   });

//   const correctAnswers = questions.map((question) => {
//     return question.correctAnswer;
//   });

//   //   console.log(`Correct answers : ${correctAnswers}`);

//   return (
//     <div className="question-container">
//       {questionLine}
//       <button className="check-answers">Check Answers</button>
//     </div>
//   );
// }

// export default Questions;

// //   function getCorrect() {
// //     let count = 0;
// //     const pass = (
// //       <div>
// //         <h2>You scored {count}/5 correct answers</h2>
// //         <button className="check-answers">Play again</button>
// //       </div>
// //     );

// //     correctAnswers.map((answer) => {
// //       for (let i = 0; i < answerArr.length; i++) {
// //         if (answer === answerArr[i]) {
// //           count++;
// //         }
// //       }
// //     });
// //     return count === 5 ? pass : `${count}/5 good answers`;
// //   }

// //   function checkAnswers() {
// //     const missAnswer = (
// //       <div>
// //         <h2>Please answer all questions</h2>
// //         <button className="check-answers">Check Answers</button>
// //       </div>
// //     );
// //     const tooManyAnswers = (
// //       <div>
// //         <h2>Only select one answer per question</h2>
// //         <button className="check-answers">Check Answers</button>
// //       </div>
// //     );

// //     return answerArr.length < 5
// //       ? { missAnswer }
// //       : answerArr.length === 5
// //       ? console.log(getCorrect())
// //       : { tooManyAnswers };
// //   }

// // let answerArr = [];

// //   function updateHeld(answer) {
// //     let index = answerArr.indexOf(answer);
// //     if (index === -1) {
// //       answerArr.push(answer);
// //     } else {
// //       answerArr.splice(index, 1);
// //     }
// //   }
