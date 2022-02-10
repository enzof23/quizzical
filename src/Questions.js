import { decode } from "html-entities";

function Questions({
  ID,
  question,
  answers,
  holdAnswer,
  gameEnd,
  correctAnswer,
}) {
  const buttons = answers.map((btn) => {
    const styles = btn.isHeld ? "answer-button held" : "answer-button";
    return (
      <button
        className={
          gameEnd && btn.answer === correctAnswer
            ? "answer-button correct"
            : gameEnd && btn.answer !== correctAnswer && btn.isHeld
            ? "answer-button wrong"
            : gameEnd
            ? "answer-button end"
            : styles
        }
        key={btn.id}
        onClick={() => holdAnswer(ID, btn.id)}
      >
        {decode(btn.answer)}
      </button>
    );
  });

  return (
    <div className="question-line">
      <h4 className="question-title">{decode(question)}</h4>
      {buttons}
      <hr className="h-line"></hr>
    </div>
  );
}

export default Questions;
