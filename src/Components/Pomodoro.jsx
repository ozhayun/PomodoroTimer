import Timer from './Timer';

export const Pomodoro = ({ min, sec, isActive, onStart, onStop, onRestart, onUp, onDown }) => {
    return (
        <div>
            <Timer
                min={min}
                sec={sec}
                isActive={isActive}
                onStart={onStart}
                onStop={onStop}
                onRestart={onRestart}
                onUp={onUp}
                onDown={onDown}
            />
        </div>
    );
};

export default Pomodoro;