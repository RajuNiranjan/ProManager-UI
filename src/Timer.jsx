import React, { useState, useRef } from "react";
// import "./styles.css";
// import beepSound from "./beep.mp3";

const Timer = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const beepRef = useRef(null);

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    beepRef.current.pause();
    beepRef.current.currentTime = 0;
    setBreakLength(5);
    setSessionLength(25);
    setTimerLabel("Session");
    setTimeLeft(sessionLength * 60);
    setIsRunning(false);
  };

  const startStopTimer = () => {
    setIsRunning((prevState) => {
      if (!prevState) {
        intervalRef.current = setInterval(() => {
          setTimeLeft((prevTimeLeft) => {
            if (prevTimeLeft === 0) {
              beepRef.current.play();
              if (timerLabel === "Session") {
                setTimerLabel("Break");
                setTimeLeft(breakLength * 60);
              } else {
                setTimerLabel("Session");
                setTimeLeft(sessionLength * 60);
              }
            }
            return prevTimeLeft > 0 ? prevTimeLeft - 1 : 0;
          });
        }, 1000);
      } else {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return !prevState;
    });
  };

  // Functions to handle incrementing/decrementing break and session lengths

  return (
    <div id="timer">
      {/* Elements for break and session lengths, labels, time-left, start/stop, reset */}
      {/* <audio id="beep" ref={beepRef} src={beepSound} /> */}
    </div>
  );
};

export default Timer;
