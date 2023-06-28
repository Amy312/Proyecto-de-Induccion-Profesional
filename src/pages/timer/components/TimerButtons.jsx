const TimerButtons = ({ isRunning, handleStartStop, handleReset }) => {
  return (
    <div className="flex m-4">
      <button
        className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-700 text-white font-bold m-4"
        onClick={handleStartStop}
      >
        {isRunning ? "Pausa" : "Iniciar"}
      </button>
      <button
        className="px-4 py-2 rounded-lg bg-rose-500 hover:bg-rose-700 text-white font-bold m-4"
        onClick={handleReset}
      >
        Resetear
      </button>
    </div>
  );
};

export default TimerButtons;
