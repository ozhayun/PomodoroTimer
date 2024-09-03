import React, { useState, useEffect, useCallback } from 'react';
import Progress from './Progress';
import Timer from './Timer';

const bellSounds = new Audio('/sounds/bell-ring.mp3');

export const Pomodoro = ({ settings, updateSettings, onReset }) => {
    const [timer, setTimer] = useState({ min: 25, sec: 0 });
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('pomodoro');
    const [iterations, setIterations] = useState(1);
    const [currentIteration, setCurrentIteration] = useState(0);
    // const [settings, setSettings] = useState({
    //     pomodoro: 25,
    //     shortBreak: 5,
    //     longBreak: 15,
    //     longBreakInterval: 3
    // });
    const [counts, setCounts] = useState({
        pomodoro: 0,
        shortBreak: 0,
        longBreak: 0
    });

    const resetTimer = useCallback(() => {
        setTimer({ min: settings[mode], sec: 0 });
    }, [mode, settings]);

    useEffect(() => {
        resetTimer();
    }, [mode, resetTimer]);

    const handleTimerEnd = useCallback(() => {
        bellSounds.play();

        if (mode === 'pomodoro') {
            setCounts(prev => ({ ...prev, pomodoro: prev.pomodoro + 1 }));

            // Determine next break type
            const nextBreak = (counts.pomodoro + 1) % settings.longBreakInterval === 0 ? 'longBreak' : 'shortBreak';
            setMode(nextBreak);

            // Check if this is the last pomodoro
            if (counts.pomodoro + 1 === iterations) {
                setCurrentIteration(iterations - 1); // Ensure we don't exceed total iterations
            }
        } else {
            // Finished a break
            setCounts(prev => ({ ...prev, [mode]: prev[mode] + 1 }));

            // Increment iteration count after completing a break
            setCurrentIteration(prev => {
                const next = prev + 1;
                if (next >= iterations) {
                    setIsActive(false);
                    setMode('pomodoro'); // Reset to pomodoro for the next potential start
                    return iterations; // Cap at total iterations
                }
                setMode('pomodoro');
                return next;
            });
        }

        resetTimer();

        // Start the timer for the next session, unless we've completed all iterations
        if (!(mode !== 'pomodoro' && currentIteration + 1 >= iterations)) {
            setIsActive(true);
        }
    }, [mode, iterations, counts, currentIteration, settings.longBreakInterval, resetTimer]);


    useEffect(() => {
        let interval;
        if (isActive) {
            interval = setInterval(() => {
                setTimer(prev => {
                    if (prev.sec > 0) {
                        return { ...prev, sec: prev.sec - 1 };
                    } else if (prev.min > 0) {
                        return { min: prev.min - 1, sec: 59 };
                    } else {
                        clearInterval(interval);
                        handleTimerEnd();
                        return prev;
                    }
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, handleTimerEnd]);

    const handleStart = () => setIsActive(true);
    const handleStop = () => setIsActive(false);
    const handleRestart = () => {
        resetTimer();
        resetSettings();
    };


    const resetSettings = () => {
        setTimer({ min: 25, sec: 0 });
        setIsActive(false);
        setMode('pomodoro')
        setIterations(1)
        setCurrentIteration(0)
        onReset()
        setCounts({
            pomodoro: 0,
            shortBreak: 0,
            longBreak: 0
        })
    }

    const handleIterationChange = (e) => {
        setIterations(Number(e.target.value));
        setCurrentIteration(0);
        setCounts({ pomodoro: 0, shortBreak: 0, longBreak: 0 });
    };

    const handleModeChange = (newMode) => {
        setMode(newMode);
        setIsActive(false);
    };

    const onUp = () => {
        setTimer(prev => ({ min: prev.min + 1, sec: 0 }));
    };

    const onDown = () => {
        setTimer(prev => {
            if (prev.min > 0) {
                return { min: prev.min - 1, sec: 0 };
            } else {
                return prev;
            }
        });
    };

    return (
        <div>
            <Progress
                counts={counts}
                currentIteration={currentIteration}
                totalIterations={iterations}
                iterations={iterations}
                mode={mode}
                onIterationChange={handleIterationChange}
                onModeChange={handleModeChange}
                isActive={isActive}
            />
            <Timer
                min={timer.min}
                sec={timer.sec}
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