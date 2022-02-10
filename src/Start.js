function Start({ onClick }) {
  return (
    <div className="start-page">
      <h1>Quizzical</h1>
      <p>Click the button to start a new quiz</p>
      <button onClick={onClick}>Start Quiz</button>
    </div>
  );
}

export default Start;
