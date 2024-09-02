import Timer from './Timer';

export const Pomodoro = ({ min, sec, isActive, onStart, onStop, onRestart }) => {
    return (
        <div>
            <Timer min={min} sec={sec} isActive={isActive} onStart={onStart} onStop={onStop} onRestart={onRestart} />
        </div>
    );
};

export default Pomodoro;