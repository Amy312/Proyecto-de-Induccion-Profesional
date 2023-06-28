import { useState } from "react";
import KanbanBoard from "./components/KanbanBoard";
import TableBoard from "./components/TableBoard";

const TasksPage = () => {
  const [sw, setSw] = useState(true);

  const swView = (value) => {
    setSw(value);
  };

  return (
    <div className="bottom-0 top-0 left-0 right-0 w-full h-full flex flex-col">
      <div className="flex flex-row align-middle mx-24 w-fit">
        <button
          onClick={() => swView(true)}
          className={`rounded-b-xl p-3 text-lg hover:font-medium hover:bg-red-100 ${sw ? 'font-medium bg-red-50' : 'font-normal bg-white'}`}
        >
          Kanban Board
        </button>
        <button
          onClick={() => swView(false)}
          className={`rounded-b-xl p-3 text-lg hover:font-medium hover:bg-red-100 ${!sw ? 'font-medium bg-red-50' : 'font-normal bg-white'}`}
        >
          List Board
        </button>
      </div>
      <div>
        {sw ? <KanbanBoard className="flex justify-center items-center flex-col h-full w-full"/> : <TableBoard />}
      </div>
    </div>
  );
};
export default TasksPage;
