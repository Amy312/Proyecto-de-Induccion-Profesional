import React, { useState, useEffect, useRef } from "react";
import sound from "../../assets/alarm.mp3";
import TimerButtons from "./components/TimerButtons";
import TimerDisplay from "./components/TimerDisplay";
import BreakControls from "./components/BreakControlls";
import SessionControls from "./components/SessionControls";

const TimerPage = () => {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timerType, setTimerType] = useState("Sesión");
  const [timer, setTimer] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    let countdown;

    if (isRunning) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0) {
      audioRef.current.play();

      if (timerType === "Sesión") {
        setTimerType("Descanso");
        setTimer(breakLength * 60);
      } else {
        setTimerType("Sesión");
        setTimer(sessionLength * 60);
      }
    }

    return () => clearInterval(countdown);
  }, [isRunning, timer, sessionLength, breakLength, timerType]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimerType("Sesión");
    setSessionLength(25);
    setBreakLength(5);
    setTimer(1500);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const handleSessionLengthChange = (e) => {
    if (!isRunning) {
      const newLength = parseInt(e.target.value);
      if (newLength > 0 && newLength <= 60) {
        setSessionLength(newLength);
        if (timerType === "Sesión") {
          setTimer(newLength * 60);
        }
      }
    }
  };

  const handleBreakLengthChange = (e) => {
    if (!isRunning) {
      const newLength = parseInt(e.target.value);
      if (newLength > 0 && newLength <= 60) {
        setBreakLength(newLength);
        if (timerType === "Descanso") {
          setTimer(newLength * 60);
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold text-black  m-8">Temporizador</h1>
      <TimerDisplay
        timerType={timerType}
        timer={timer}
        formatTime={formatTime}
      />
      <TimerButtons
        isRunning={isRunning}
        handleStartStop={handleStartStop}
        handleReset={handleReset}
      />
      <div className="md:grid md:grid-cols-2 md:divide-x md:divide-red-800 p-5 shadow-2xl shadow-red-200 rounded-3xl">
        <SessionControls
          sessionLength={sessionLength}
          handleSessionLengthChange={handleSessionLengthChange}
          isRunning={isRunning}
        />
        <BreakControls
          breakLength={breakLength}
          handleBreakLengthChange={handleBreakLengthChange}
          isRunning={isRunning}
        />
      </div>

      <audio ref={audioRef} src={sound} preload="auto" />
    </div>
  );
};

export default TimerPage;
