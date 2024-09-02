import React, { useState, useEffect, useCallback } from 'react';
import Pomodoro from './Components/Pomodoro';
import Progress from './Components/Progress';
import Tasks from './Components/Tasks';

const bellSounds = new Audio('/sounds/bell-ring.mp3')

function App() {
  const [min, setMin] = useState(25);
  const [sec, setSec] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [shortRestCount, setShortRestCount] = useState(0);
  const [longRestCount, setLongRestCount] = useState(0);
  const [selectedTimer, setSelectedTimer] = useState('pomodoro');
  const [shouldTransition, setShouldTransition] = useState(false);

  const handleTimerEnd = useCallback(() => {
    bellSounds.play();
    setIsActive(false);
    if (selectedTimer === 'pomodoro') {
      setPomodoroCount(prevCount => prevCount + 1);
      setSelectedTimer('shortRest');
    } else if (selectedTimer === 'shortRest') {
      setShortRestCount(prevCount => prevCount + 1);
      setSelectedTimer('pomodoro');
    } else if (selectedTimer === 'longRest') {
      setLongRestCount(prevCount => prevCount + 1);
      setSelectedTimer('pomodoro');
    }
    setShouldTransition(true);
  }, [selectedTimer]);

  useEffect(() => {
    let timer;
    if (isActive) {
      timer = setInterval(() => {
        if (sec > 0) {
          setSec(sec - 1);
        } else if (min > 0) {
          setMin(min - 1);
          setSec(59);
        } else {
          clearInterval(timer);
          handleTimerEnd();
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, sec, min, handleTimerEnd]);

  useEffect(() => {
    if (shouldTransition) {
      setTimerDuration(selectedTimer);
      setShouldTransition(false);
      setIsActive(true);
    }
  }, [shouldTransition, selectedTimer]);

  const setTimerDuration = (timerType) => {
    if (timerType === 'pomodoro') {
      setMin(25);
    } else if (timerType === 'shortRest') {
      setMin(5);
    } else if (timerType === 'longRest') {
      setMin(15);
    }
    setSec(0);
  };

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleRestart = () => {
    setIsActive(false);
    setTimerDuration(selectedTimer);
  };

  const handleSelectTimer = (timerType) => {
    setSelectedTimer(timerType);
    setIsActive(false);
    setTimerDuration(timerType);
  };

  const onUp = () => {
    let newMin = min;
    if (sec !== 0) newMin++
    newMin++
    setMin(newMin);
    setSec(0);
  }

  const onDown = () => {
    let newMin = min;
    if (sec === 0) {
      newMin--;
      setMin(newMin);
    } else {
      setSec(0);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col flex-grow md:flex-row">
        <div className="flex flex-col items-center px-4 bg-gradient-to-b from-cyan-500 to-blue-500 sm:px-6 lg:px-8 md:w-3/4">
          <h1 className="mt-8 sm:mt-10 lg:mt-12 text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-[#9c27b0] drop-shadow-lg text-center">
            Pomodoro Timer
          </h1>
          <Progress
            pomodoroCount={pomodoroCount}
            shortRestCount={shortRestCount}
            longRestCount={longRestCount}
            selectedTimer={selectedTimer}
            onSelectTimer={handleSelectTimer}
          />
          <Pomodoro
            min={min}
            sec={sec}
            isActive={isActive}
            onStart={handleStart}
            onStop={handleStop}
            onRestart={handleRestart}
            onUp={onUp}
            onDown={onDown}
          />
        </div>
        <Tasks />
      </div>
      <footer className="py-4 mt-auto text-center bg-gradient-to-b from-cyan-500 to-[#bde9ff]">
        <a href="https://www.flaticon.com/free-icons/pomodoro" title="pomodoro icons" className="text-blue-500 hover:text-blue-700">
          Pomodoro icons created by Freepik - Flaticon
        </a>
      </footer>
    </div>
  );
}
export default App;