function Difficulty({ getDifficulty }) {
  return (
    <>
      <h3 className="category-header">Number of Questions</h3>
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
    </>
  );
}

export default Difficulty;
