import { IoIosArrowBack } from "react-icons/io";

function Start({ onClick, goBack }) {
  return (
    <div className="start-page">
      <p>Your quiz is ready, start the game now !</p>
      <button className="start-btn" onClick={onClick}>
        Start Quiz
      </button>
      <button className="go-back-btn center" onClick={goBack}>
        <IoIosArrowBack />
        Go Back
      </button>
    </div>
  );
}

export default Start;
