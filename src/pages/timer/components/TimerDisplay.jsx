const TimerDisplay = ({ timerType, timer, formatTime }) => {
    return (
      <div className="flex flex-col items-center ">
        <h1 className="text-3xl font-medium m-2 text-gray-900">{timerType}</h1>
        <h2 className="text-6xl font-medium m-2">{formatTime(timer)}</h2>
      </div>
    );
  };
export default TimerDisplay;