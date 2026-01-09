import React from 'react'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from '@mui/material/IconButton';

export const Timer = ({ min, sec, isActive, onStart, onStop, onRestart, onUp, onDown }) => {
    const formattedSec = sec < 10 ? `0${sec}` : sec;

    return (
        <div id='Timer' className="flex flex-col items-center mt-8 sm:mt-10">
            <div className='w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full flex items-center justify-center glass p-[2px]'>
                <div className='w-full h-full glass-card rounded-full flex items-center justify-center text-slate-800 dark:text-slate-100 text-4xl sm:text-5xl md:text-7xl font-medium'>
                    <div className='flex flex-col items-center'>
                        <IconButton
                            className={`transition-all duration-300 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 ${isActive || min >= 60 ? 'opacity-0 invisible h-0' : 'opacity-100 visible h-auto'}`}
                            onClick={onUp}
                            disabled={isActive || min >= 60}
                        >
                            <ArrowDropUpIcon sx={{ fontSize: 50 }} />
                        </IconButton>
                        <div className='flex font-mono tracking-wider'>
                            {min}:{formattedSec}
                        </div>
                        <IconButton
                            className={`transition-all duration-300 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 ${isActive || min <= 0 ? 'opacity-0 invisible h-0' : 'opacity-100 visible h-auto'}`}
                            onClick={onDown}
                            disabled={isActive || min <= 0}
                        >
                            <ArrowDropDownIcon sx={{ fontSize: 50 }} />
                        </IconButton>
                    </div>
                </div>
            </div>
            <div className='flex flex-row w-full max-w-xs mt-8 space-x-3 sm:mt-10 md:mt-12 sm:max-w-sm'>
                <button
                    className='flex-1 glass-button text-slate-800 dark:text-slate-100 text-sm sm:text-base md:text-lg rounded-xl h-11 sm:h-12 font-medium'
                    onClick={isActive ? onStop : onStart}
                >
                    {isActive ? "Stop" : "Start"}
                </button>
                <button
                    className='flex-1 glass-button text-slate-800 dark:text-slate-100 text-sm sm:text-base md:text-lg rounded-xl h-11 sm:h-12 font-medium'
                    onClick={onRestart}
                >
                    Restart
                </button>
            </div>
        </div>
    );
};

export default Timer;