function Button(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#D6DBF5" : "transparent",
  };
  return (
    <button className="answer-button" style={styles} onClick={props.onClick}>
      {props.answer}
    </button>
  );
}

export default Button;
