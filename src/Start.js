function Start(props) {
  return (
    <div className="start-page">
      <h1>Quizzical</h1>
      <p>Click the button to start a new quiz</p>
      <button onClick={props.handleClick}>Start Quiz</button>
    </div>
  );
}

export default Start;
