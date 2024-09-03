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
            <div className="flex flex-row pb-2 mb-4 space-x-2 overflow-x-auto sm:space-x-4">
                <button
                    className={`flex-shrink-0 border-2 p-2 md:p-4 rounded-lg text-xs sm:text-sm md:text-base text-white hover:bg-sky-900 hover:border-sky-900 ${mode === 'pomodoro' ? 'bg-sky-900' : ''}`}
                    onClick={() => onModeChange('pomodoro')}
                >
                    Pomodoro {counts.pomodoro}
                </button>
                <button
                    className={`flex-shrink-0 border-2 p-2 md:p-4 rounded-lg text-xs sm:text-sm md:text-base text-white hover:bg-sky-900 hover:border-sky-900 ${mode === 'shortBreak' ? 'bg-sky-900' : ''}`}
                    onClick={() => onModeChange('shortBreak')}
                >
                    Short Rest {counts.shortBreak}
                </button>
                <button
                    className={`flex-shrink-0 border-2 p-2 md:p-4 rounded-lg text-xs sm:text-sm md:text-base text-white hover:bg-sky-900 hover:border-sky-900 ${mode === 'longBreak' ? 'bg-sky-900' : ''}`}
                    onClick={() => onModeChange('longBreak')}
                >
                    Long Rest {counts.longBreak}
                </button>
            </div>
            <div className="flex items-center">
                {isActive ?
                    <div className="p-1 text-white text-md sm:text-sm md:text-base"
                    >
                        Iteration: {currentIteration} / {iterations}
                    </div>
                    :
                    <>
                        <label htmlFor="iterations" className="mr-2 text-white">Iterations:</label>
                        <select
                            id="iterations"
                            value={totalIterations}
                            onChange={onIterationChange}
                            className="p-1 text-xs border-2 rounded-lg sm:text-sm md:text-base"
                        >
                            {[...Array(10)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                    </>
                }

            </div>
        </div>
    );
};

export default Progress;
