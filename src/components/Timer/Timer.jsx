import React, { useState, useEffect, useRef } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setSeconds(0);
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "space-around",
        width: "100%",
      }}
    >
      <button onClick={toggleTimer}>{isRunning ? "Pause" : "Start"}</button>
      <div style={{ fontSize: "2rem", fontFamily: "monospace" }}>
        {formatTime(seconds)}
      </div>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}
