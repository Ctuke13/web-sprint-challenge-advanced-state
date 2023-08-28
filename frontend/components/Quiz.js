import React from "react";
import {
  fetchQuiz,
  selectAnswer,
  setMessage,
  postAnswer,
} from "../state/action-creators";
import { connect } from "react-redux";
import { useEffect } from "react";

function Quiz(props) {
  const {
    activeQuiz,
    fetchQuiz,
    selectedAnswer,
    selectAnswer: selectAnswerAction,
    setMessage,
  } = props;
  console.log(activeQuiz);
  useEffect(() => {
    fetchQuiz();
  }, []);

  const submit = () => {
    fetchQuiz();

    if (selectedAnswer) {
      const correctAnswer = activeQuiz.answers[0].answer_id;
      if (correctAnswer == selectedAnswer) {
        setMessage("Nice Job! That was the correct answer");
      } else {
        setMessage("What a shame! That was the incorrect answer");
      }
    }
  };

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        activeQuiz ? (
          <>
            <h2>{activeQuiz.question}</h2>

            <div id="quizAnswers">
              {console.log("Current Answer:", selectedAnswer)}
              {activeQuiz.answers.map((answer, idx) => (
                <div
                  key={idx}
                  className={`answer ${
                    selectedAnswer === answer.answer_id ? "selected" : ""
                  }`}
                >
                  {activeQuiz.answers[idx].text}
                  <button onClick={() => selectAnswerAction(answer.answer_id)}>
                    {selectedAnswer === answer.answer_id
                      ? "SELECTED"
                      : "Select"}
                  </button>
                </div>
              ))}
            </div>
            {/* <div className="answer selected">
                {activeQuiz.answers[0].text}
                <button onClick={selectAnswer}>SELECTED</button>
              </div>

              <div className="answer">
                {activeQuiz.answers[1].text}
                <button onClick={selectAnswer}>Select</button>
              </div>
            </div> */}

            <button
              onClick={() => submit()}
              disabled={selectedAnswer ? false : true}
              id="submitAnswerBtn"
            >
              Submit answer
            </button>
          </>
        ) : (
          "Loading next quiz..."
        )
      }
    </div>
  );
}

const mapStateToProps = ({ quiz, selectedAnswer }) => ({
  activeQuiz: quiz,
  selectedAnswer,
});

export default connect(mapStateToProps, {
  fetchQuiz,
  selectAnswer,
  postAnswer,
  setMessage,
})(Quiz);
