import React, { useState, useEffect, useCallback } from 'react';
import Progress from './Progress';
import Timer from './Timer';

const bellSounds = new Audio('/sounds/bell-ring.mp3')

export const Pomodoro = () => {
    const [min, setMin] = useState(25);
    const [sec, setSec] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [pomodoroCount, setPomodoroCount] = useState(0);
    const [shortRestCount, setShortRestCount] = useState(0);
    const [longRestCount, setLongRestCount] = useState(0);
    const [selectedTimer, setSelectedTimer] = useState('pomodoro');
    const [shouldTransition, setShouldTransition] = useState(false);
    const [iterations, setIterations] = useState(1);
    const [currentIteration, setCurrentIteration] = useState(0);

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
        <div>
            <Progress
                pomodoroCount={pomodoroCount}
                shortRestCount={shortRestCount}
                longRestCount={longRestCount}
                selectedTimer={selectedTimer}
                onSelectTimer={handleSelectTimer}
            />
            <Timer
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
    );
};

export default Pomodoro;