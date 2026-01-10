import React from 'react';
import DarkModeToggle from './DarkModeToggle';
import GamificationModeToggle from './GamificationModeToggle';

export const Header = ({ isGamificationOn, onGamificationToggle }) => {
    return (
        <header className="flex fixed top-0 right-0 left-0 z-50 justify-between items-center p-4 backdrop-blur-sm pointer-events-none">
            <div className="pointer-events-auto">
                <DarkModeToggle />
            </div>
            <div className="pointer-events-auto">
                <GamificationModeToggle 
                    isGamificationOn={isGamificationOn} 
                    onToggle={onGamificationToggle} 
                />
            </div>
        </header>
    );
};

export default Header;
