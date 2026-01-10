import React, { useState, useEffect, useRef } from 'react'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from '@mui/material/IconButton';
import TomatoTimer from './TomatoTimer';

export const Timer = ({ min, sec, isActive, onStart, onStop, onRestart, onUp, onDown, isGamificationOn, initialMinutes = 25, totalTomatoes = 0 }) => {
    const formattedSec = sec < 10 ? `0${sec}` : sec;
    
    // Track the starting time when timer becomes active
    const [startingMinutes, setStartingMinutes] = useState(min);
    const wasActiveRef = useRef(isActive);
    
    // Update starting time when timer becomes active
    useEffect(() => {
        if (isActive && !wasActiveRef.current) {
            // Timer just started - capture current time as starting point
            setStartingMinutes(min);
            wasActiveRef.current = true;
        } else if (!isActive && wasActiveRef.current) {
            // Timer just stopped - reset the ref and update for preview
            wasActiveRef.current = false;
            setStartingMinutes(min);
        } else if (!isActive && !wasActiveRef.current) {
            // Timer is not active and wasn't active - update preview when user changes time
            setStartingMinutes(min);
        }
    }, [isActive, min]);
    
    // Calculate fill percentage for tomato animation (filling as time progresses)
    // At start (startingMinutes:00), fill is 0%. At completion (0:00), fill is 100%
    // When timer is not active, use current min as starting point (fill will be 0% - preview)
    // When timer is active, use startingMinutes captured when timer started
    const startMinutes = isActive ? startingMinutes : min;
    const totalSeconds = startMinutes * 60;
    const remainingSeconds = min * 60 + sec;
    const elapsedSeconds = Math.max(0, totalSeconds - remainingSeconds);
    // Calculate fill percentage: 0% when full time remaining, 100% when time is up
    const fillPercentage = totalSeconds > 0 ? Math.max(0, Math.min(100, (elapsedSeconds / totalSeconds) * 100)) : 0;

    return (
        <div id='Timer' className="flex relative z-10 flex-col items-center">
            {/* Container for both timer modes - smooth crossfade with fixed height */}
            <div className="flex relative justify-center items-center w-full" style={{ minHeight: '420px', height: '420px' }}>
                {/* Gamification mode timer - centered fade */}
                <div className={`absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center transition-opacity duration-600 ease-in-out ${isGamificationOn ? 'z-10 opacity-100 pointer-events-auto' : 'z-0 opacity-0 pointer-events-none'}`}>
                    <div className="flex justify-center items-center w-full h-full">
                        <TomatoTimer 
                            min={min}
                            sec={sec}
                            isActive={isActive}
                            onUp={onUp}
                            onDown={onDown}
                            fillPercentage={fillPercentage}
                        />
                    </div>
                </div>
                
                {/* Non-gamification mode timer - centered fade */}
                <div className={`absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center transition-opacity duration-600 ease-in-out ${!isGamificationOn ? 'z-10 opacity-100 pointer-events-auto' : 'z-0 opacity-0 pointer-events-none'}`}>
                    <div className="flex justify-center items-center w-full h-full">
                        <div className='w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full flex items-center justify-center glass p-[2px] transition-all duration-300 ease-in-out'>
                            <div className='flex justify-center items-center w-full h-full text-3xl font-medium rounded-full transition-all duration-300 ease-in-out text-slate-800 dark:text-slate-100 sm:text-4xl md:text-6xl lg:text-7xl'>
                                <div className='flex flex-col items-center'>
                                    <IconButton
                                        className={`transition-all duration-300 ease-in-out text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 hover:scale-110 active:scale-95 ${isActive || min >= 60 ? 'opacity-0 invisible h-0 pointer-events-none' : 'opacity-100 visible h-auto'}`}
                                        onClick={onUp}
                                        disabled={isActive || min >= 60}
                                    >
                                        <ArrowDropUpIcon sx={{ fontSize: { xs: 40, sm: 45, md: 50 }, transition: 'all 0.3s ease-in-out' }} />
                                    </IconButton>
                                    <div className='flex font-mono tracking-wider transition-all duration-200 ease-in-out'>
                                        {min}:{formattedSec}
                                    </div>
                                    <IconButton
                                        className={`transition-all duration-300 ease-in-out text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 hover:scale-110 active:scale-95 ${isActive || min <= 0 ? 'opacity-0 invisible h-0 pointer-events-none' : 'opacity-100 visible h-auto'}`}
                                        onClick={onDown}
                                        disabled={isActive || min <= 0}
                                    >
                                        <ArrowDropDownIcon sx={{ fontSize: { xs: 40, sm: 45, md: 50 }, transition: 'all 0.3s ease-in-out' }} />
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='flex relative z-20 flex-col items-center mt-8 w-full sm:mt-10'>
                <div className='flex flex-row space-x-3 w-full max-w-xs transition-all duration-300 ease-in-out sm:max-w-sm'>
                    <button
                        className='flex-1 h-11 text-sm font-medium rounded-xl shadow-lg transition-all duration-300 ease-in-out glass-button text-slate-800 dark:text-slate-100 sm:text-base md:text-lg sm:h-12 hover:scale-105 active:scale-95 will-change-transform'
                        onClick={isActive ? onStop : onStart}
                    >
                        {isActive ? "Stop" : "Start"}
                    </button>
                    <button
                        className='flex-1 h-11 text-sm font-medium rounded-xl shadow-lg transition-all duration-300 ease-in-out glass-button text-slate-800 dark:text-slate-100 sm:text-base md:text-lg sm:h-12 hover:scale-105 active:scale-95 will-change-transform'
                        onClick={onRestart}
                    >
                        Restart
                    </button>
                </div>
                <div className={`transition-all duration-500 ease-in-out overflow-hidden will-change-transform ${isGamificationOn ? 'mt-4 mb-2 max-h-20 opacity-100' : 'mt-0 mb-0 max-h-0 opacity-0'}`}>
                    <div className="flex justify-center items-center px-4 py-2 rounded-xl shadow-lg transition-all duration-300 ease-in-out glass-card">
                        <span className="text-base font-medium transition-all duration-300 ease-in-out text-slate-800 dark:text-slate-100 sm:text-lg md:text-xl">
                            🍅 Total Tomatoes: {totalTomatoes}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Timer;