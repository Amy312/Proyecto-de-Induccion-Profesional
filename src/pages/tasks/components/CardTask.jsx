import { format, parseISO } from "date-fns";
import { TrashIcon } from "@heroicons/react/24/outline";
const CardTask = ({ task, onDelete }) => {
  const startDateTime = parseISO(task.date);

  
  return (
    <div className="flex flex-col content-start bg-slate-50 shadow-lg shadow-slate-400 m-2 rounded-2xl">
      <h2 className="text-sm font-thin px-3 pt-3">{task.category}</h2>
      <h2 className="text-lg font-normal p-3 flex-wrap">{task.title}</h2>
      <div className="flex justify-between">
        <h2 className="font-thin text-base p-3">
          <time dateTime={task.date}>{format(startDateTime, "PPp")}</time>
        </h2>
        {task.type === "Done" && (
          <button 
          onClick={() => onDelete(task.id)}
          className="px-5">
            <TrashIcon className="w-7 h-7 text-red-500" />
          </button>
        )}
      </div>
    </div>
  );
};
export default CardTask;
