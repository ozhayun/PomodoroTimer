import Pomodoro from './Components/Pomodoro';
import Tasks from './Components/Tasks';


function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col flex-grow md:flex-row">
        <div className="flex flex-col items-center px-4 bg-gradient-to-b from-cyan-500 to-blue-500 sm:px-6 lg:px-8 md:w-3/4">
          <h1 className="mt-8 sm:mt-10 lg:mt-12 text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-[#9c27b0] drop-shadow-lg text-center">
            Pomodoro Timer
          </h1>
          <Pomodoro />
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