import React from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from '@mui/material/IconButton';
import TomatoSVG from './TomatoSVG';

export const TomatoTimer = ({ 
    min, 
    sec, 
    isActive, 
    onUp, 
    onDown, 
    fillPercentage 
}) => {
    const formattedSec = sec < 10 ? `0${sec}` : sec;
    
    return (
        <div className='flex relative flex-col justify-center items-center w-full h-full'>
            {/* Container for buttons and tomato with proper spacing */}
            <div className='flex relative flex-col justify-center items-center w-full h-full'>
                {/* Up button - positioned with proper spacing above tomato */}
                <IconButton
                    className={`absolute z-30 transition-all duration-300 ease-in-out text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 hover:scale-110 active:scale-95 ${isActive || min >= 60 ? 'opacity-0 invisible pointer-events-none h-0 scale-90' : 'opacity-100 visible h-auto scale-100'}`}
                    onClick={onUp}
                    disabled={isActive || min >= 60}
                    style={{ 
                        top: '8px'
                    }}
                    aria-label="Increase time"
                >
                    <ArrowDropUpIcon sx={{ fontSize: { xs: 36, sm: 42, md: 48 }, transition: 'all 0.3s ease-in-out' }} />
                </IconButton>
                
                {/* Tomato with timer - centered container */}
                <div className='flex relative z-10 justify-center items-center w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 transition-all duration-300 ease-in-out'>
                    <div className='transition-all duration-300 ease-in-out transform hover:scale-105'>
                        <TomatoSVG 
                            fillPercentage={fillPercentage} 
                            size={null}
                            showOutline={true}
                            className="w-full h-full transition-all duration-300 ease-in-out"
                        />
                    </div>
                    {/* Timer text overlay */}
                    <div className="flex absolute inset-0 z-20 justify-center items-center pointer-events-none transition-all duration-300 ease-in-out" style={{ transform: 'translateY(30px)' }}>
                        <div className='flex flex-col items-center'>
                            <div className='flex font-mono text-2xl font-bold tracking-wider text-white sm:text-3xl md:text-4xl lg:text-5xl transition-all duration-200 ease-in-out' style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 12px rgba(0,0,0,0.3)' }}>
                                {min}:{formattedSec}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Down button - positioned with proper spacing below tomato */}
                <IconButton
                    className={`absolute z-30 transition-all duration-300 ease-in-out text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 hover:scale-110 active:scale-95 ${isActive || min <= 0 ? 'opacity-0 invisible pointer-events-none h-0 scale-90' : 'opacity-100 visible h-auto scale-100'}`}
                    onClick={onDown}
                    disabled={isActive || min <= 0}
                    style={{ 
                        bottom: '8px'
                    }}
                    aria-label="Decrease time"
                >
                    <ArrowDropDownIcon sx={{ fontSize: { xs: 36, sm: 42, md: 48 }, transition: 'all 0.3s ease-in-out' }} />
                </IconButton>
            </div>
        </div>
    );
};

export default TomatoTimer;
