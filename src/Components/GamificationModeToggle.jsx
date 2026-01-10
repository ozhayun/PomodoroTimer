import React from 'react';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

export const GamificationModeToggle = ({ isGamificationOn, onToggle }) => {
    const handleToggle = () => {
        if (onToggle) {
            onToggle(!isGamificationOn);
        }
    };

    return (
        <div className="glass-card backdrop-blur-xl px-4 py-2 rounded-xl flex items-center space-x-2 shadow-lg">
            <label 
                htmlFor="gamification-toggle"
                className="text-sm font-medium text-slate-800 dark:text-slate-100 cursor-pointer whitespace-nowrap"
            >
                Gamification Mode
            </label>
            <button
                id="gamification-toggle"
                onClick={handleToggle}
                className="p-0 bg-transparent border-0 cursor-pointer transition-opacity duration-200 hover:opacity-70 text-slate-800 dark:text-slate-100"
                aria-label="Toggle gamification mode"
            >
                {isGamificationOn ? (
                    <ToggleOnIcon sx={{ fontSize: 32 }} className="text-red-500" />
                ) : (
                    <ToggleOffIcon sx={{ fontSize: 32 }} className="text-slate-400" />
                )}
            </button>
        </div>
    );
};

export default GamificationModeToggle;
