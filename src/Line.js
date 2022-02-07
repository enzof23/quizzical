import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import Button from "./Button";

function Line(props) {
  const buttonArr = [...props.incorrectAnswer, props.correctAnswer].sort(
    () => Math.random() - 0.5
  );

  const btn = buttonArr.map((answer) => {
    return {
      answer,
      id: nanoid(),
      isHeld: false,
    };
  });

  const [buttons, setButtons] = useState(btn);

  const answers = buttons.map((btn) => {
    return (
      <Button
        key={btn.id}
        answer={btn.answer}
        onClick={() => holdAnswer(btn.id)}
        isHeld={btn.isHeld}
      />
    );
  });

  function holdAnswer(id) {
    setButtons((oldButtons) =>
      oldButtons.map((btn) => {
        return btn.id === id ? { ...btn, isHeld: !btn.isHeld } : btn;
      })
    );
  }

  const [btnHeld, setBtnHeld] = useState([]);

  useEffect(() => {
    const held = buttons.map((e) => {
      return e.isHeld ? e : null;
    });
    setBtnHeld((prevState) => ({
      ...prevState,
      held,
    }));
  }, [buttons]);

  return (
    <div className="question-line">
      <h4 className="question-title">{props.question}</h4>
      {answers}
      <hr className="h-line"></hr>
    </div>
  );
}

export default Line;
