import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useTask } from "../../../context/ContextProvider";
import { deleteTask, getTasks, updateTask } from "../../../services/tasksService";
import CardTask from "./CardTask";
import { columns } from "../../../data/dates";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const { id } = useTask();
  const getClient = async () => {
    const { data } = await getTasks();
    const tasksUser = data.filter((task) => task.idUser == id);
    if (tasks.length !== tasksUser.length) {
      setTasks(tasksUser);
    }
  };

  const f = async () => {
    await getClient();
  };

  useEffect(() => {
    f();
  });

  useEffect(() => {
    f();
  }, []);

  const onDelete = (id) => {

    setTasks(
      tasks.filter((note) => {
        return note.id !== id;
      })
    );
    deleteTask(id);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const updatedTasks = [...tasks];
    const draggedTask = updatedTasks.find(
      (task) => task.id == result.draggableId
    );

    if (source.droppableId == destination.droppableId) {
      draggedTask.type = destination.droppableId;
    } else {
      const sourceColumn = source.droppableId;
      draggedTask.type = destination.droppableId;

      updatedTasks.forEach((task) => {
        if (task.type == sourceColumn && task.id != draggedTask.id) {
          task.type = sourceColumn;
        }
      });
    }
    updateTask(draggedTask);
    setTasks(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} className="w-full h-full">
      <div className="grid grid-cols-3 gap-4 px-24 pt-10   w-full h-96">
        {columns.map((column) => (
          <Droppable key={column.id} droppableId={column.id}>
            {(provided) => (
              <div className={` p-4  shadow-lg h-full rounded-r-lg rounded-bl-lg ${column.title==='To Do' ? 'bg-zinc-100 shadow-zinc-500': (column.id=='Done' ? ' bg-emerald-100 shadow-emerald-900' : 'bg-amber-100 shadow-amber-900') }`}>
                <h2 className="text-lg font-semibold mb-4">{column.title}</h2>
                <div className="w-full h-full"
                {...provided.droppableProps}
                ref={provided.innerRef}
                >
                  {tasks.map((task, index) => {
                    if (task.type === column.title) {
                      return (
                        <Draggable
                          key={String(task.id)}
                          draggableId={String(task.id)}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <CardTask task={task} onDelete ={onDelete} />
                            </div>
                          )}
                        </Draggable>
                      );
                    }
                    return null;
                  })}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
