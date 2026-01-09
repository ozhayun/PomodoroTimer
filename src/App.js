import Pomodoro from './Components/Pomodoro';
import Tasks from './Components/Tasks';
import DarkModeToggle from './Components/DarkModeToggle';


function App() {
  return (
    <div className="flex relative flex-col w-full min-h-screen">
      <DarkModeToggle />
      <div className="flex flex-col flex-grow lg:flex-row">
        <div className="flex flex-col justify-center items-center px-4 pt-16 pb-8 sm:px-6 lg:px-8 lg:w-3/4 lg:py-12">
          <h1 className="mb-8 text-5xl font-semibold tracking-tight text-center sm:mb-10 sm:text-6xl md:text-7xl lg:text-8xl text-slate-800 dark:text-slate-100">
            Pomodoro Timer
          </h1>
          <Pomodoro />
        </div>
        <Tasks />
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