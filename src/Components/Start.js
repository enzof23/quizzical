function Start({ onClick }) {
  return (
    <div className="start-page">
      <p>Your quiz is ready, start the game now !</p>
      <button onClick={onClick}>Start Quiz</button>
    </div>
  );
}

export default Start;
