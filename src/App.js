import { useState } from 'react';
import Pomodoro from './Components/Pomodoro';
import Tasks from './Components/Tasks';
import Header from './Components/Header';


function App() {
  const [isGamificationOn, setIsGamificationOn] = useState(() => {
    const saved = localStorage.getItem('gamificationMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return false;
  });

  const handleGamificationToggle = (value) => {
    setIsGamificationOn(value);
    localStorage.setItem('gamificationMode', JSON.stringify(value));
  };

  return (
    <div className="flex relative flex-col w-full min-h-screen overflow-x-hidden">
      <Header isGamificationOn={isGamificationOn} onGamificationToggle={handleGamificationToggle} />
      <div className="flex flex-col flex-grow pt-16 sm:pt-20 lg:flex-row">
        <div className="flex flex-col justify-center items-center px-4 pt-4 pb-4 sm:px-6 lg:px-8 lg:w-3/5 lg:py-12">
          <h1 className="mb-4 text-3xl font-semibold tracking-tight text-center sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-slate-800 dark:text-slate-100">
            Pomodoro Timer
          </h1>
          <Pomodoro isGamificationOn={isGamificationOn} />
        </div>
        <Tasks isGamificationOn={isGamificationOn} />
      </div>
      <footer className="py-4 mt-auto text-center">
        <a 
          href="https://www.flaticon.com/free-icons/pomodoro" 
          title="pomodoro icons" 
          className="text-sm transition-colors duration-200 text-slate-600 dark:text-slate-800 hover:text-slate-800 dark:hover:text-slate-200"
        >
          Pomodoro icons created by Freepik - Flaticon
        </a>
      </footer>
    </div>
  );
}
export default App;