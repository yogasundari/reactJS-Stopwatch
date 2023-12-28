import React, { useState, useRef } from "react";
import "./App.css";
import DisplayComponents from "./stopwatch/DisplayComponent";
import DisplayButton from "./stopwatch/DisplayButton";

function App() {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [intervalID, setIntervalID] = useState(null);
  const [status, setStatus] = useState(0);
  const intervalRef = useRef();

  const start = () => {
    setStatus(1);
    run();
    intervalRef.current = setInterval(run, 10);
    setIntervalID(intervalRef.current);
  };
  var updatedMS = time.ms,
    updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const run = () => {
    if (updatedMS === 100) {
      updatedS++;
      updatedMS = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    updatedMS++;
    setTime({ ms: updatedMS + 1, s: updatedS, m: updatedM, h: updatedH });
  };
  const stop = () => {
    clearInterval(intervalRef.current);
    setStatus(2);
  };
  const reset = () => {
    clearInterval(intervalRef.current);
    setStatus(0);
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
  };
  const resume = () => start();

  return (
    <div className="main-section">
      <div className="clock-holder">
        <div className="stopwatch">
          <DisplayComponents time={time} />
          <DisplayButton
            status={status}
            stop={stop}
            reset={reset}
            resume={resume}
            start={start}
          />
        </div>
      </div>
    </div>
  );
}
export default App;
