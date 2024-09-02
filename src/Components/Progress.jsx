export const Progress = ({ pomodoroCount, shortRestCount, longRestCount, selectedTimer, onSelectTimer }) => {
    return (
        <div className="flex flex-row space-x-2 sm:space-x-4 mt-4 sm:mt-6 md:mt-8 overflow-x-auto pb-2">
            <button
                className={`flex-shrink-0 border-2 p-2 sm:p-3 md:p-4 rounded-lg text-xs sm:text-sm md:text-base text-white hover:bg-sky-900 hover:border-sky-900 ${selectedTimer === 'pomodoro' ? 'bg-sky-900' : ''}`}
                onClick={() => onSelectTimer('pomodoro')}
            >
                Pomodoro {pomodoroCount}
            </button>
            <button
                className={`flex-shrink-0 border-2 p-2 sm:p-3 md:p-4 rounded-lg text-xs sm:text-sm md:text-base text-white hover:bg-sky-900 hover:border-sky-900 ${selectedTimer === 'shortRest' ? 'bg-sky-900' : ''}`}
                onClick={() => onSelectTimer('shortRest')}
            >
                Short Rest {shortRestCount}
            </button>
            <button
                className={`flex-shrink-0 border-2 p-2 sm:p-3 md:p-4 rounded-lg text-xs sm:text-sm md:text-base text-white hover:bg-sky-900 hover:border-sky-900 ${selectedTimer === 'longRest' ? 'bg-sky-900' : ''}`}
                onClick={() => onSelectTimer('longRest')}
            >
                Long Rest {longRestCount}
            </button>
        </div>
    );
};

export default Progress;