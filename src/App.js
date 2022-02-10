import "./App.css";
import Start from "./Start";
import Questions from "./Questions";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [newGame, setNewGame] = useState(true);
  const [displayMsg, setDisplayMsg] = useState("");
  const [displayAnswer, setDisplayAnswer] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);

  useEffect(() => {
    getQuestion();
  }, []);

  function getQuestion() {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=11&difficulty=medium&type=multiple"
    )
      .then((response) => response.json())
      .then((data) =>
        setData(
          data.results.map((item, index) => {
            // get all answers and sort them random
            const answers = [
              ...item.incorrect_answers,
              item.correct_answer,
            ].sort(() => Math.random() - 0.5);

            // create object for each answer and assign values
            const createAnswers = answers.map((answer, index) => {
              return {
                id: index,
                answer: answer,
                isHeld: false,
              };
            });

            // create object for each question
            return {
              id: index,
              question: item.question,
              correctAnswer: item.correct_answer,
              allAnswers: createAnswers,
            };
          })
        )
      );
  }

  useEffect(() => {
    setCorrectAnswers(
      data.map((item) => {
        return item.correctAnswer;
      })
    );
  }, [data]);

  function startQuiz() {
    setNewGame(!newGame);
  }

  const elements = data.map((item, index) => {
    return (
      <Questions
        key={item.id}
        ID={item.id}
        question={item.question}
        answers={item.allAnswers}
        correctAnswer={correctAnswers[index]}
        gameEnd={gameEnd}
        holdAnswer={holdAnswer}
      />
    );
  });

  function holdAnswer(questionID, buttonID) {
    // get the question in data, map over its answers and
    // update isHeld state to true on the one selected
    // if isHeld is true on a not selected answer, set it to false (toggle answers)
    const newAnswers = data[questionID].allAnswers.map((answer) => {
      return answer.id === buttonID
        ? { ...answer, isHeld: !answer.isHeld }
        : answer.isHeld
        ? { ...answer, isHeld: !answer.isHeld }
        : answer;
    });

    // map over the data and update the question with new answers state
    const newState = data.map((question) => {
      return question.id === questionID
        ? { ...question, allAnswers: newAnswers }
        : question;
    });
    setData(newState);
  }

  function checkAnswer() {
    // create array with all selected answers (isHeld = true)
    const selectedAnswers = [];
    data.map((question) => {
      return question.allAnswers.forEach((answer) => {
        if (answer.isHeld) {
          selectedAnswers.push(answer.answer);
        }
      });
    });

    // get good answers count to display in message
    let count = 0;
    for (let i = 0; i < correctAnswers.length; i++) {
      selectedAnswers.forEach((answer) => {
        if (answer === correctAnswers[i]) {
          count++;
        }
      });
    }

    setDisplayMsg(`You scored ${count}/5 good answers`);
    setDisplayAnswer(!displayAnswer);
    setGameEnd(!gameEnd);
  }

  function playAgain() {
    getQuestion();
    setDisplayMsg("");
    setDisplayAnswer(!displayAnswer);
    setGameEnd(!gameEnd);
  }

  const checkAnswerBtn = (
    <button className="check-answers" onClick={checkAnswer}>
      Check Answers
    </button>
  );

  const playAgainBtn = (
    <>
      <p>{displayMsg}</p>
      <button className="check-answers" onClick={playAgain}>
        Play Again
      </button>
    </>
  );

  return (
    <div className="container">
      {newGame ? (
        <Start onClick={startQuiz} />
      ) : (
        <div className="question-container">
          {elements}
          <div className="answer-container">
            {!displayAnswer ? checkAnswerBtn : playAgainBtn}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
