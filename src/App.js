import React, { useState, useEffect } from "react";

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let countdownInterval;

    if (isRunning) {
      countdownInterval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    } else {
      clearInterval(countdownInterval);
    }

    return () => clearInterval(countdownInterval);
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft === 0) {
      document.getElementById("beep").play();

      if (timerLabel === "Session") {
        setTimerLabel("Break");
        setTimeLeft(breakLength * 60);
      } else {
        setTimerLabel("Session");
        setTimeLeft(sessionLength * 60);
      }
    }
  }, [timeLeft, timerLabel, breakLength, sessionLength]);

  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleReset = () => {
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;

    setBreakLength(5);
    setSessionLength(25);
    setTimerLabel("Session");
    setTimeLeft(25 * 60);
    setIsRunning(false);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleBreakDecrement = () => {
    if (breakLength > 1) {
      setBreakLength((prevBreakLength) => prevBreakLength - 1);
    }
  };

  const handleBreakIncrement = () => {
    if (breakLength < 60) {
      setBreakLength((prevBreakLength) => prevBreakLength + 1);
    }
  };

  const handleSessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength((prevSessionLength) => prevSessionLength - 1);
      setTimeLeft((prevTimeLeft) =>
        prevTimeLeft - 60 >= 0 ? prevTimeLeft - 60 : 0
      );
    }
  };

  const handleSessionIncrement = () => {
    if (sessionLength < 60) {
      setSessionLength((prevSessionLength) => prevSessionLength + 1);
      setTimeLeft((prevTimeLeft) => prevTimeLeft + 60);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-200 p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-4"> 25 + 5 Clock</h1>
        <div>
          <div id="break-label">Break Length</div>
          <div>
            <button id="break-decrement" onClick={handleBreakDecrement}>
              -
            </button>
            <span id="break-length">{breakLength}</span>
            <button id="break-increment" onClick={handleBreakIncrement}>
              +
            </button>
          </div>
        </div>
        <div>
          <div id="session-label">Session Length</div>
          <div>
            <button id="session-decrement" onClick={handleSessionDecrement}>
              -
            </button>
            <span id="session-length">{sessionLength}</span>
            <button id="session-increment" onClick={handleSessionIncrement}>
              +
            </button>
          </div>
        </div>
        <div id="timer-label">{timerLabel}</div>
        <div id="time-left">{formatTime(timeLeft)}</div>
        <button
          id="start_stop"
          className="bg-green-400 p-1 text-white rounded mr-5"
          onClick={handleStartStop}>
          Start/Stop
        </button>
        <button
          id="reset"
          onClick={handleReset}
          className="hover:bg-red-500 p-1 rounded hover:text-white">
          Reset
        </button>
        <audio
          id="beep"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
    </div>
  );
};

export default App;
