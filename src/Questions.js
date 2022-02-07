import { nanoid } from "nanoid";
import Button from "./Button";

function Question(props) {
  const questProps = props.questions;

  const elements = questProps.map((q) => {
    const buttonArr = [...q.incorrectAnswer, q.correctAnswer].sort(
      () => Math.random() - 0.5
    );

    const btn = buttonArr.map((answer) => {
      return {
        answer,
        id: nanoid(),
        isHeld: false,
      };
    });

    const answers = btn.map((btn) => {
      return (
        <Button
          key={btn.id}
          answer={btn.answer}
          // onClick={() => holdAnswer(btn.id)}
          isHeld={btn.isHeld}
        />
      );
    });

    return (
      <div className="question-line">
        <h4 className="question-title">{q.question}</h4>
        {answers}
        <hr className="h-line"></hr>
      </div>
    );
  });

  return (
    <div className="question-container">
      {elements}
      <button className="check-answers">Check Answers</button>
    </div>
  );
}

export default Question;
