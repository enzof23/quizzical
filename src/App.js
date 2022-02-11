import "./App.css";
import Categories from "./Components/Categories";
import Amount from "./Components/Amount";
import Difficulty from "./Components/Difficulty";
import Start from "./Components/Start";
import Questions from "./Components/Questions";
import { useState, useEffect } from "react";

function App() {
  const defaultCat = {
    category: 0,
    amount: 5,
    difficulty: "",
  };
  const [data, setData] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [gameSetUp, setGameSetUp] = useState(0);
  const [createGameCat, setCreatGameCat] = useState(defaultCat);
  const [newGame, setNewGame] = useState(true);
  const [displayMsg, setDisplayMsg] = useState("");
  const [displayAnswer, setDisplayAnswer] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);

  useEffect(() => {
    getQuestion();
  }, [createGameCat]);

  function getQuestion() {
    fetch(
      `https://opentdb.com/api.php?amount=${createGameCat.amount}&category=${createGameCat.category}&difficulty=${createGameCat.difficulty}&type=multiple`
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

  console.log(data);

  function getCategory(cat) {
    setCreatGameCat((prevCat) => ({
      ...prevCat,
      category: cat.code,
    }));
    setGameSetUp(1);
  }

  function getAmount(amt) {
    setCreatGameCat((prevCat) => ({
      ...prevCat,
      amount: amt,
    }));
    setGameSetUp(2);
  }

  function getDifficulty(diff) {
    setCreatGameCat((prevCat) => ({
      ...prevCat,
      difficulty: diff,
    }));
    setGameSetUp(3);
  }

  console.log(createGameCat);

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
      for (let j = 0; j < selectedAnswers.length; j++) {
        if (selectedAnswers[j] === correctAnswers[i]) {
          count = count + 1;
        }
      }
    }

    setDisplayMsg(`You scored ${count}/${correctAnswers.length} good answers`);
    setDisplayAnswer(!displayAnswer);
    setGameEnd(!gameEnd);
  }

  function playAgain() {
    setDisplayMsg("");
    setDisplayAnswer(!displayAnswer);
    setGameEnd(!gameEnd);
    getQuestion();
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

  return newGame ? (
    <div className="container">
      <h1>Quizical</h1>
      {gameSetUp === 0 ? (
        <Categories getCategory={getCategory} />
      ) : gameSetUp === 1 ? (
        <Amount getAmount={getAmount} />
      ) : gameSetUp === 2 ? (
        <Difficulty getDifficulty={getDifficulty} />
      ) : (
        <Start onClick={startQuiz} />
      )}
    </div>
  ) : (
    <div className="container">
      <div className="question-container">
        {elements}
        <div className="answer-container">
          {!displayAnswer ? checkAnswerBtn : playAgainBtn}
        </div>
      </div>
    </div>
  );
}

export default App;
