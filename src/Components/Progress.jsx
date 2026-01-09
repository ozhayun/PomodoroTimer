import React from 'react';

export const Progress = ({
    counts,
    currentIteration,
    totalIterations,
    iterations,
    mode,
    onIterationChange,
    onModeChange,
    isActive
}) => {
    return (
        <div className="flex flex-col items-center mt-4 sm:mt-6 md:mt-8">
            <div className="flex flex-row pb-2 mb-4 space-x-2 overflow-x-auto sm:space-x-3">
                <button
                    className={`flex-shrink-0 glass-button px-4 py-2 rounded-xl text-xs sm:text-sm md:text-base text-slate-800 dark:text-slate-100 font-medium transition-all duration-200 ${mode === 'pomodoro' ? 'ring-2 ring-slate-400 dark:ring-slate-300 ring-opacity-50' : ''}`}
                    onClick={() => onModeChange('pomodoro')}
                >
                    Pomodoro {counts.pomodoro}
                </button>
                <button
                    className={`flex-shrink-0 glass-button px-4 py-2 rounded-xl text-xs sm:text-sm md:text-base text-slate-800 dark:text-slate-100 font-medium transition-all duration-200 ${mode === 'shortBreak' ? 'ring-2 ring-slate-400 dark:ring-slate-300 ring-opacity-50' : ''}`}
                    onClick={() => onModeChange('shortBreak')}
                >
                    Short Rest {counts.shortBreak}
                </button>
                <button
                    className={`flex-shrink-0 glass-button px-4 py-2 rounded-xl text-xs sm:text-sm md:text-base text-slate-800 dark:text-slate-100 font-medium transition-all duration-200 ${mode === 'longBreak' ? 'ring-2 ring-slate-400 dark:ring-slate-300 ring-opacity-50' : ''}`}
                    onClick={() => onModeChange('longBreak')}
                >
                    Long Rest {counts.longBreak}
                </button>
            </div>
            <div className="flex items-center glass-card px-4 py-2 rounded-xl">
                {isActive ?
                    <div className="text-slate-800 dark:text-slate-100 text-sm sm:text-base md:text-lg font-medium"
                    >
                        Iteration: {currentIteration} / {iterations}
                    </div>
                    :
                    <>
                        <label htmlFor="iterations" className="mr-2 text-slate-700 dark:text-slate-300 text-sm sm:text-base">Iterations:</label>
                        <select
                            id="iterations"
                            value={totalIterations}
                            onChange={onIterationChange}
                            className="glass-button px-3 py-1 text-slate-800 dark:text-slate-100 text-sm sm:text-base rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-300 focus:ring-opacity-50 cursor-pointer"
                        >
                            {[...Array(10)].map((_, i) => (
                                <option key={i + 1} value={i + 1} className="bg-white dark:bg-slate-800">{i + 1}</option>
                            ))}
                        </select>
                    </>
                }

            </div>
        </div>
    );
};

export default Progress;
