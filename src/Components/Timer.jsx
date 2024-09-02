import React from 'react'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from '@mui/material/IconButton';

export const Timer = ({ min, sec, isActive, onStart, onStop, onRestart, onUp, onDown }) => {
    const formattedSec = sec < 10 ? `0${sec}` : sec;

    return (
        <div id='Timer' className="flex flex-col items-center mt-8 sm:mt-10 md:mt-12 ">
            <div className='w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full flex items-center justify-center bg-gradient-to-r from-[#9c27b0] to-yellow-400 p-1'>
                <div className='w-full h-full bg-white rounded-full flex items-center justify-center text-[#b01e6e] text-4xl sm:text-5xl md:text-7xl'>
                    <div className='flex flex-col items-center'>
                        <IconButton
                            className={`transition-opacity duration-600 ${isActive || min >= 60 ? 'opacity-0 invisible' : 'opacity-100 visible'}`}
                            onClick={onUp}
                            disabled={isActive || min >= 60}
                        >
                            <ArrowDropUpIcon sx={{ fontSize: 50 }} />
                        </IconButton>
                        <div className='flex'>
                            {min}:{formattedSec}
                        </div>
                        <IconButton
                            className={`transition-opacity duration-600 ${isActive || min <= 0 ? 'opacity-0 invisible' : 'opacity-100 visible'}`}
                            onClick={onDown}
                            disabled={isActive || min <= 0}
                        >
                            <ArrowDropDownIcon sx={{ fontSize: 50 }} />
                        </IconButton>
                    </div>
                </div>
            </div>
            <div className='flex flex-row w-full max-w-xs mt-8 space-x-4 sm:mt-10 md:mt-12 sm:max-w-sm'>
                <button
                    className='flex-1 text-white text-sm sm:text-base md:text-lg bg-[#e6b507] rounded-lg hover:bg-[#f5cb38] h-10 sm:h-12'
                    onClick={isActive ? onStop : onStart}
                >
                    {isActive ? "Stop" : "Start"}
                </button>
                <button
                    className='flex-1 text-white text-sm sm:text-base md:text-lg rounded-lg bg-[#9c27b0] hover:bg-purple-500 h-10 sm:h-12'
                    onClick={onRestart}
                >
                    Restart
                </button>
            </div>
        </div>
    );
};

export default Timer;