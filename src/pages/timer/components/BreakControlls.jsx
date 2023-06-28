import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

const BreakControls = ({ breakLength, handleBreakLengthChange, isRunning }) => {
  return (
    <div className="p-4 m-4 w-fit h-fit  flex-col items-center content-center">
      <h1 className="text-xl font-bold p-4  self-center">Tiempo de Descanso</h1>

      <div className="flex justify-center">
        <button
          onClick={() =>
            handleBreakLengthChange({ target: { value: breakLength - 1 } })
          }
          disabled={isRunning || breakLength <= 1}
        >
          <MinusCircleIcon className="w-8 h-8 text-emerald-500  hover:text-emerald-700" aria-hidden="true" />
        </button>
        <span className="m-2 p-2 text-2xl font-medium text-lime-950 ">{breakLength}</span>
        <button
          onClick={() =>
            handleBreakLengthChange({ target: { value: breakLength + 1 } })
          }
          disabled={isRunning || breakLength >= 60}
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
export default BreakControls;
