import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import Button from "./Button";

function Line({ question, answers, handleClick }) {
  console.log("Child element renders");
  const [btn, setBtn] = useState([]);
  const buttons = answers.map((answer) => {
    return {
      answer,
      id: nanoid(),
      isHeld: false,
    };
  });

  useEffect(() => {
    setBtn(buttons);
  }, []);

  const answer = btn.map((btn) => {
    return (
      <Button
        key={btn.id}
        answer={btn.answer}
        isHeld={btn.isHeld}
        changeStyle={() => holdAnswer(btn.id)}
        onClick={() => handleClick(btn.answer)}
      />
    );
  });

  function holdAnswer(id) {
    setBtn((prevState) =>
      prevState.map((btn) => {
        return btn.id === id ? { ...btn, isHeld: !btn.isHeld } : btn;
      })
    );
  }

  return (
    <div className="question-line">
      <h4 className="question-title">{question}</h4>
      {answer}
      <hr className="h-line"></hr>
    </div>
  );
}

export default Line;

/*


NOT USED, JUST FOR REFERENCE


*/

// const [buttons, setButtons] = useState([]);

// useEffect(() => {
//   const buttonArr = [...props.incorrectAnswer, props.correctAnswer].sort(
//     () => Math.random() - 0.5
//   );

//   const btn = buttonArr.map((answer) => {
//     return {
//       answer,
//       id: nanoid(),
//       isHeld: false,
//     };
//   });

//   setButtons(btn);
// }, []);

// const answers = buttons.map((btn) => {
//   return (
//     <Button
//       key={btn.id}
//       answer={btn.answer}
//       // getAnswer={() => props.updateHeld(btn.answer)}
//       changeStyle={() => holdAnswer(btn.id)}
//       isHeld={btn.isHeld}
//     />
//   );
// });

// function holdAnswer(id) {
//   setButtons((prevState) =>
//     prevState.map((btn) => {
//       return btn.id === id ? { ...btn, isHeld: !btn.isHeld } : btn;
//     })
//   );
// }
