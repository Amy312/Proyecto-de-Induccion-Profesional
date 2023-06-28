import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

const SessionControls = ({
  sessionLength,
  handleSessionLengthChange,
  isRunning,
}) => {
  return (
    <div className="p-4 m-4 w-fit h-fit flex-col items-center content-center">
      <h1 className="text-xl font-bold p-4  self-center">Tiempo de Sesión</h1>
      <div className="flex justify-center">
        <button
          onClick={() =>
            handleSessionLengthChange({ target: { value: sessionLength - 1 } })
          }
          disabled={isRunning || sessionLength <= 1}
        >
          <MinusCircleIcon className="w-8 h-8 text-emerald-500  hover:text-emerald-700" aria-hidden="true" />
        </button>
        <span className="m-2 p-2 text-2xl font-medium text-lime-950 ">{sessionLength}</span>
        <button
          onClick={() =>
            handleSessionLengthChange({ target: { value: sessionLength + 1 } })
          }
          disabled={isRunning || sessionLength >= 60}
        >
          <PlusCircleIcon
            className="w-8 h-8 text-rose-500 hover:text-rose-700 "
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
};
export default SessionControls;
