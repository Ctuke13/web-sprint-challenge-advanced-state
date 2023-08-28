// ❗ You don't need to add extra action creators to achieve MVP
import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_INFO_MESSAGE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  INPUT_CHANGE,
  RESET_FORM,
} from "./action-types";
import axios from "axios";
import reducer from "./reducer";

export function moveClockwise() {
  return {
    type: MOVE_CLOCKWISE,
  };
}

export function moveCounterClockwise() {
  return {
    type: MOVE_COUNTERCLOCKWISE,
  };
}

export function selectAnswer(id) {
  return {
    type: SET_SELECTED_ANSWER,
    payload: id,
  };
}

export function setMessage(message) {
  return {
    type: SET_INFO_MESSAGE,
    payload: message,
  };
}

export function setQuiz() {}

export function inputChange() {}

export function resetForm() {}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    dispatch({
      type: SET_QUIZ_INTO_STATE,
      payload: null,
    });
    axios
      .get("http://localhost:9000/api/quiz/next")
      .then((res) => {
        const quizData = res.data;
        console.log(res);
        dispatch({
          type: SET_QUIZ_INTO_STATE,
          payload: quizData,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function postAnswer(answer) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    axios
      .post("http://localhost:3000/api/quiz/answer", answer)
      .then(({ data }) =>
        dispatch({ type: SET_INFO_MESSAGE, payload: data.message })
          .then((res) => dispatch({ type: SET_QUIZ_INTO_STATE }))
          .catch((err) => dispatch({ type: SET_INFO_MESSAGE, payload: err }))
      );
  };
}

export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
