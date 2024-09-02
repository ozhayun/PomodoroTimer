export const Progress = ({
    pomodoroCount,
    shortRestCount,
    longRestCount,
    selectedTimer,
    onSelectTimer,
    iterations,
    currentIteration,
    onIterationChange
}) => {
    return (
        <div className="flex flex-col items-center mt-4 sm:mt-6 md:mt-8">
            <div className="flex flex-row pb-2 mb-4 space-x-2 overflow-x-auto sm:space-x-4">
                <button
                    className={`flex-shrink-0 border-2 p-2 md:p-4 rounded-lg text-xs sm:text-sm md:text-base text-white hover:bg-sky-900 hover:border-sky-900 ${selectedTimer === 'pomodoro' ? 'bg-sky-900' : ''}`}
                    onClick={() => onSelectTimer('pomodoro')}
                >
                    Pomodoro {pomodoroCount}
                </button>
                <button
                    className={`flex-shrink-0 border-2 p-2 md:p-4 rounded-lg text-xs sm:text-sm md:text-base text-white hover:bg-sky-900 hover:border-sky-900 ${selectedTimer === 'shortRest' ? 'bg-sky-900' : ''}`}
                    onClick={() => onSelectTimer('shortRest')}
                >
                    Short Rest {shortRestCount}
                </button>
                <button
                    className={`flex-shrink-0 border-2 p-2 md:p-4 rounded-lg text-xs sm:text-sm md:text-base text-white hover:bg-sky-900 hover:border-sky-900 ${selectedTimer === 'longRest' ? 'bg-sky-900' : ''}`}
                    onClick={() => onSelectTimer('longRest')}
                >
                    Long Rest {longRestCount}
                </button>
            </div>
            <div className="flex items-center">
                <label htmlFor="iterations" className="mr-2 text-white">Iterations:</label>
                <select
                    id="iterations"
                    value={iterations}
                    onChange={(e) => onIterationChange(Number(e.target.value))}
                    className="p-1 text-xs border-2 rounded-lg sm:text-sm md:text-base"
                >
                    {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Progress;