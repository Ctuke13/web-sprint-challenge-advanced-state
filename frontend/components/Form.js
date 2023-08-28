import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../state/action-creators";

export function Form(props) {
  const onChange = (evt) => {
    props.inputChange(evt);
  };

  const checkInputs = () => {
    if (
      props.form.newQuestion.trim() &&
      props.form.newTrueAnswer.trim() &&
      props.form.newFalseAnswer.trim()
    ) {
      return false;
    } else {
      return true;
    }
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    props.resetForm();
    const newQuiz = {
      question_text: props.form.newQuestion,
      true_answer_text: props.form.newTrueAnswer,
      false_answer_text: props.form.newFalseAnswer,
    };
    props.postQuiz(newQuiz);
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        onChange={onChange}
        id="newQuestion"
        value={props.form.newQuestion}
        placeholder="Enter question"
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newTrueAnswer"
        value={props.form.newTrueAnswer}
        placeholder="Enter true answer"
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newFalseAnswer"
        value={props.form.newFalseAnswer}
        placeholder="Enter false answer"
      />
      <button id="submitNewQuizBtn" disabled={checkInputs()}>
        Submit new quiz
      </button>
    </form>
  );
}

export default connect((st) => st, actionCreators)(Form);
