import React, { useReducer } from "react";
import { moveClockwise, moveCounterClockwise } from "../state/action-creators";
import { connect } from "react-redux";
import reducer, { initialWheelState } from "../state/reducer";

function Wheel(props) {
  const { activeCog, moveClockwise, moveCounterClockwise } = props;

  return (
    <div id="wrapper">
      <div id="wheel">
        <div
          className={`cog ${activeCog == 0 ? "active" : ""} `}
          style={{ "--i": 0 }}
        >
          {activeCog === 0 ? "B" : ""}
        </div>
        <div
          className={`cog ${activeCog == 1 ? "active" : ""} `}
          style={{ "--i": 1 }}
        >
          {activeCog === 1 ? "B" : ""}
        </div>
        <div
          className={`cog ${activeCog == 2 ? "active" : ""} `}
          style={{ "--i": 2 }}
        >
          {activeCog === 2 ? "B" : ""}
        </div>
        <div
          className={`cog ${activeCog == 3 ? "active" : ""} `}
          style={{ "--i": 3 }}
        >
          {activeCog === 3 ? "B" : ""}
        </div>
        <div
          className={`cog ${activeCog == 4 ? "active" : ""} `}
          style={{ "--i": 4 }}
        >
          {activeCog === 4 ? "B" : ""}
        </div>
        <div
          className={`cog ${activeCog == 5 ? "active" : ""} `}
          style={{ "--i": 5 }}
        >
          {activeCog === 5 ? "B" : ""}
        </div>
        {/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button onClick={moveCounterClockwise} id="counterClockwiseBtn">
          Counter clockwise
        </button>
        <button onClick={moveClockwise} id="clockwiseBtn">
          Clockwise
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  activeCog: state.wheel,
});

const mapDispatchToProps = {
  moveClockwise,
  moveCounterClockwise,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wheel);
