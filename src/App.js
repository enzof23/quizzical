import "./App.css";
import Start from "./Start";
import Line from "./Line";
// import Question from "./Questions";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

function App() {
  const [newGame, setNewGame] = useState(true);
  const [questions, setQuestions] = useState([]);

  function getQuestion() {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=23&difficulty=medium&type=multiple"
    )
      .then((response) => response.json())
      .then((data) =>
        setQuestions(
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

  const elements = questions.map((q) => {
    return (
      <Line
        key={nanoid()}
        question={q.question}
        correctAnswer={q.correctAnswer}
        incorrectAnswer={q.incorrectAnswer}
      />
    );
  });
  const questionsDisplay = (
    <div className="question-container">
      {elements}
      <button className="check-answers" onClick={checkAnswers}>
        Check Answers
      </button>
    </div>
  );

  function startQuiz() {
    setNewGame((prevState) => !prevState);
  }

  function checkAnswers() {
    console.log("check");
  }

  return (
    <div className="container">
      {newGame ? (
        <Start handleClick={startQuiz} />
      ) : (
        // <Question questions={questions} />
        questionsDisplay
      )}
    </div>
  );
}
export default App;
