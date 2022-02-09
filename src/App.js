import "./App.css";
import Start from "./Start";
import Line from "./Line";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

function App() {
  const [newGame, setNewGame] = useState(true);
  const [filterAPI, setFilterAPI] = useState([]);
  const [questionAnswers, setQuestionAnswers] = useState([]);
  const [lines, setLines] = useState([]);
  const [answersSelected, setAnswersSelected] = useState([]);
  const [answerDisplay, setAnswerDisplay] = useState(false);
  const [textDisplay, setTextDisplay] = useState("text");
  const [buttonDisplay, setButtonDisplay] = useState(true);

  console.log(
    filterAPI.map((q) => {
      return q.correctAnswer;
    })
  );

  useEffect(() => {
    getQuestion();
  }, []);

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

  function startQuiz() {
    setNewGame((prevState) => !prevState);
    createLines();
  }

  function createLines() {
    const displayQuestions = questionAnswers.map((item) => {
      return (
        <Line
          key={nanoid()}
          question={item.quest}
          answers={item.answers}
          handleClick={getAnswer}
        />
      );
    });
    setLines(displayQuestions);
  }

  function getAnswer(answer) {
    setAnswersSelected((prevState) => [...prevState, answer]);
  }

  function checkAnswers() {
    let count = 0;
    const correctAnswers = filterAPI.map((q) => {
      return q.correctAnswer;
    });

    answersSelected.map((answer) => {
      for (let i = 0; i < correctAnswers.length; i++) {
        if (answer === correctAnswers[i]) {
          count++;
        }
      }
    });

    if (count === 5) {
      setButtonDisplay((prevState) => !prevState);
    }
    setAnswerDisplay((prevState) => !prevState);
    setTextDisplay(`${count}/5 good answers`);
  }

  const checkAnswersBtn = (
    <button className="check-answers" onClick={checkAnswers}>
      Check Answers
    </button>
  );
  const playAgainBtn = (
    <button className="check-answers" onClick={checkAnswers}>
      Play Again
    </button>
  );

  return (
    <div className="container">
      {newGame ? (
        <Start handleClick={startQuiz} />
      ) : (
        <div className="question-container">
          {lines}
          <div className="answer-container">
            {answerDisplay ? <p>{textDisplay}</p> : ""}
            {buttonDisplay ? checkAnswersBtn : playAgainBtn}
          </div>
        </div>
      )}
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
