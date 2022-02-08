import "./App.css";
import Start from "./Start";
import Line from "./Line";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

function App() {
  const [newGame, setNewGame] = useState(true);
  const [filterAPI, setFilterAPI] = useState([]);
  const [questionAnswers, setQuestionAnswers] = useState([]);
  const [answersSelected, setAnswersSelected] = useState([]);

  function getQuestion() {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=11&difficulty=medium&type=multiple"
    )
      .then((response) => response.json())
      .then((data) =>
        setFilterAPI(
          data.results.map((e) => {
            return {
              question: e.question,
              correctAnswer: e.correct_answer,
              incorrectAnswer: e.incorrect_answers,
            };
          })
        )
      );
  }

  useEffect(() => {
    getQuestion();
  }, []);

  useEffect(() => {
    const item = filterAPI.map((question) => {
      const quest = question.question;
      const answers = [
        ...question.incorrectAnswer,
        question.correctAnswer,
      ].sort(() => Math.random() - 0.5);

      return { quest, answers };
    });

    setQuestionAnswers(item);
  }, [filterAPI]);

  const elements = questionAnswers.map((item) => {
    return (
      <Line
        key={nanoid()}
        question={item.quest}
        answers={item.answers}
        handleClick={getClick}
      />
    );
  });

  function startQuiz() {
    setNewGame((prevState) => !prevState);
  }

  function getClick(id) {
    setAnswersSelected(id);
  }

  console.log(answersSelected);

  return newGame ? (
    <div className="container">
      <Start handleClick={startQuiz} />
    </div>
  ) : (
    <div className="container">
      <div className="question-container">{elements}</div>
    </div>
  );
}

export default App;

/*


NOT USED, JUST FOR REFERENCE


*/

// import "./App.css";
// import Start from "./Start";
// import Line from "./Line";
// import { useEffect, useState } from "react";
// import { nanoid } from "nanoid";

// function App() {
//   const [newGame, setNewGame] = useState(true);
//   const [questions, setQuestions] = useState([]);

//   function getQuestion() {
//     fetch(
//       "https://opentdb.com/api.php?amount=5&category=11&difficulty=medium&type=multiple"
//     )
//       .then((response) => response.json())
//       .then((data) =>
//         setQuestions(
//           data.results.map((e) => {
//             return {
//               question: e.question,
//               correctAnswer: e.correct_answer,
//               incorrectAnswer: e.incorrect_answers,
//             };
//           })
//         )
//       );
//   }

//   useEffect(() => {
//     getQuestion();
//   }, []);

//   const elements = questions.map((q) => {
//     return (
//       <Line
//         key={nanoid()}
//         question={q.question}
//         correctAnswer={q.correctAnswer}
//         incorrectAnswer={q.incorrectAnswer}
//       />
//     );
//   });
//   const questionsDisplay = (
//     <div className="question-container">
//       {elements}
//       <button className="check-answers" onClick={checkAnswers}>
//         Check Answers
//       </button>
//     </div>
//   );

//   function startQuiz() {
//     setNewGame((prevState) => !prevState);
//   }

//   function checkAnswers() {
//     console.log("check");
//   }

//   return (
//     <div className="container">
//       {newGame ? <Start handleClick={startQuiz} /> : questionsDisplay}
//     </div>
//   );
// }
// export default App;
