import { format, isSameDay, parseISO } from "date-fns";
import Task from "./Task";
import { useEffect, useState } from "react";
import AddForm from "./AddForm";
import { useTask } from "../../../context/ContextProvider";
import { deleteTask, updateTask } from "./../../../services/tasksService";

const TableTask = (props) => {
  const { selectedDay, classNames, notes, setNotes, f } = props;
  const { id, edit } = useTask();

  const [change, setChange] = useState(false);
  console.log(edit);
  const [viewForm, setViewForm] = useState(edit);
  const addTask = () => {
    setViewForm(!viewForm);
  };
  console.log(viewForm);
  const selectedDayMeetings = notes.filter(
    (task) => id == task.idUser && isSameDay(parseISO(task.date), selectedDay)
  );

  useEffect(() => {
    console.log("cambio");
  }, [selectedDay]);

  useEffect(() => {
    f()
  }, [change]);
  return (
    <>
      <section className="mt-12 md:mt-0 md:pl-14 overflow-auto">
        <h2 className="font-semibold text-gray-900">
          Horario para{"  "}
          <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
            {format(selectedDay, "MMM dd, yyy")}
          </time>
        </h2>
        <button
          onClick={() => addTask()}
          className="mt-4 w-fit  text-white bg-red-500 hover:bg-rose-700 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"
        >
          Añadir tarea
        </button>

        {viewForm && (
          <AddForm
            selectedDay={selectedDay}
            setViewForm={setViewForm}
            change={change}
            setChange={setChange}
          />
        )}

        <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
          {selectedDayMeetings.length > 0 || !viewForm ? (
            selectedDayMeetings.map((task) => (
              <Task
                task={task}
                key={task.id}
                classNames={classNames}
                onDelete={(id) => {
                  setNotes(
                    notes.filter((note) => {
                      return note.id !== id;
                    })
                  );
                  deleteTask(id);
                }}
                onEdit={(task) => {
                  updateTask(task);
                }}
                setViewForm={setViewForm}
              />
            ))
          ) : (
            <p>No hay tareas para hoy :D </p>
          )}
        </ol>
      </section>
    </>
  );
};
export default TableTask;
