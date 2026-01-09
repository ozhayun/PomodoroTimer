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
            className="fixed top-4 left-4 z-50 p-2 bg-transparent border-0 transition-opacity duration-200 cursor-pointer text-slate-800 dark:text-slate-100 hover:opacity-70"
            aria-label="Toggle dark mode"
            style={{ position: 'fixed', top: '1rem', left: '1rem' }}
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
