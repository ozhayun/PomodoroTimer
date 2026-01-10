import React, { useState, useEffect } from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export const DarkModeToggle = () => {
    const [isDark, setIsDark] = useState(() => {
        // Check if dark mode was previously set
        const saved = localStorage.getItem('darkMode');
        if (saved !== null) {
            return JSON.parse(saved);
        }
        // Check system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        // Apply dark mode to document
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        // Save preference
        localStorage.setItem('darkMode', JSON.stringify(isDark));
    }, [isDark]);

    const toggleDarkMode = () => {
        setIsDark(!isDark);
    };

    return (
        <button
            onClick={toggleDarkMode}
            className="p-2 glass-card backdrop-blur-xl rounded-xl transition-opacity duration-200 cursor-pointer text-slate-800 dark:text-slate-100 hover:opacity-70 shadow-lg"
            aria-label="Toggle dark mode"
        >
            {isDark ? (
                <Brightness7Icon sx={{ fontSize: 24 }} />
            ) : (
                <Brightness4Icon sx={{ fontSize: 24 }} />
            )}
        </button>
    );
};

export default DarkModeToggle;
