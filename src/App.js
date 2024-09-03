import React, { useState, useCallback } from 'react';
import Pomodoro from './Components/Pomodoro';
import Tasks from './Components/Tasks';
import Navbar from './Components/Navbar';

function App() {
  const [settings, setSettings] = useState({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 3
  });

  const handleCustomize = useCallback(() => {
    // Implement your customize logic here
    console.log("Customize clicked");
  }, []);

  const handleReset = useCallback(() => {
    // Implement your reset logic here
    console.log("Reset clicked");
    setSettings({
      pomodoro: 25,
      shortBreak: 5,
      longBreak: 15,
      longBreakInterval: 3
    })
  }, []);

  const updateSettings = useCallback((newSettings) => {
    setSettings(newSettings);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onCustomize={handleCustomize} onReset={handleReset} />
      <div className="flex flex-col flex-grow md:flex-row">
        <div className="flex flex-col items-center px-4 bg-gradient-to-b from-cyan-500 to-blue-500 sm:px-6 lg:px-8 md:w-3/4">
          <h1 className="mt-2 lg:mt-10 text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-[#9c27b0] drop-shadow-lg text-center">
            Pomodoro Timer
          </h1>
          <Pomodoro settings={settings} updateSettings={updateSettings} onReset={handleReset} />
        </div>
        <Tasks />
      </div>
      <footer className="py-4 mt-auto text-center bg-gradient-to-b from-cyan-500 to-[#bde9ff]">
        <a href="https://www.flaticon.com/free-icons/pomodoro" title="pomodoro icons" className="text-blue-500 hover:text-blue-700">
          Pomodoro icons created by Freepik - Flaticon
        </a>
      </footer>
    </div>
  );
}

export default App;