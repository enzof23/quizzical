import { IoIosArrowBack } from "react-icons/io";

function Difficulty({ getDifficulty, goBack }) {
  return (
    <>
      <h3 className="category-header">Set Difficulty</h3>
      <div className="difficulty-container">
        <button className="diff-btn" onClick={() => getDifficulty("easy")}>
          Easy
        </button>
        <button className="diff-btn" onClick={() => getDifficulty("medium")}>
          Medium
        </button>
        <button className="diff-btn" onClick={() => getDifficulty("hard")}>
          Hard
        </button>
        <button className="diff-btn" onClick={() => getDifficulty(0)}>
          Mixed
        </button>
      </div>
      <button className="go-back-btn" onClick={goBack}>
        <IoIosArrowBack />
        Go Back
      </button>
    </>
  );
}

export default Difficulty;
