import { useEffect, useState } from "react";
import { useDispatch, useTask } from "../../../context/ContextProvider";
import { addTask, deleteTask, getTasks, updateTask } from "../../../services/tasksService";
import { format, parseISO } from "date-fns";
import {
  PencilSquareIcon,
  TrashIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { v4 as uuid } from "uuid";
import { types } from "../../../context/taskReducer";
import { useForm } from "react-hook-form";

const Table = ({ category }) => {
  const { register, handleSubmit, setValue } = useForm();
  const { id, edit, taskEdit } = useTask();
  const [tasks, setTasks] = useState([]);
  const [change, setChange] = useState(false);
  const dispatch = useDispatch();

  const getClient = async () => {
    const { data } = await getTasks();
    const tasksUser = data.filter((task) => task.idUser == id);
    console.log(id);
    if (tasks.length !== tasksUser.length) {
      console.log(tasks.length, "--- ", tasksUser);
      setTasks(tasksUser);
    }
  };

  const f = async () => {
    await getClient();
  };

  useEffect(() => {
    f();
  }, []);

  const onCheckSubmit = async (data) => {
    console.log(data, "desde listas");
    if (!edit) {
      addTask({
        id: Number(uuid()),
        idUser: id,
        title: data.title,
        date: data.date,
        category: category,
        type: "To Do",
      });
    } else {
      taskEdit.title = data.title;
      taskEdit.date = data.date;
      updateTask(taskEdit);
      dispatch({ type: types.offEdit });
    }
    setChange(!change);
  };

  useEffect(() => {
    f();


    if (edit) {
      setValue("title", taskEdit?.title);
      setValue("date", taskEdit?.date);
    } else{
      setValue("title", "");
      setValue("date", "");
    }
  });

  useEffect(() => {
    f();
  }, [change])

  const editTask = (task) => {
    dispatch({ type: types.edit, taskEdit: task });
  };

  const onDelete = (id) => {
    console.log(tasks);

    setTasks(
      tasks.filter((note) => {
        return note.id !== id;
      })
    );
    deleteTask(id);
    console.log(tasks);
  };

  return (
    <>
      <table className="w-full text-base text-center text-gray-500 shadow-xl ">
        <thead className="text-base text-gray-700 uppercase bg-amber-200 border-2 border-amber-200 ">
          <tr>
            <th scope="col" className="w-96  py-3 h-3">
              Título
            </th>
            <th scope="col" className="px-20 py-3">
              Fecha Limite
            </th>
            <th scope="col" className="px-20 py-3">
              Estado
            </th>
            <th scope="col" className="px-20 py-3">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(
            (task) =>
              task.category === category && (
                <tr key={task.id} className="bg-white border-b ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-normal text-gray-900 break-words text-center "
                  >
                    {task.title}
                  </th>
                  <td className="px-6 py-4 text-center">
                    {" "}
                    <time dateTime={task.date}>
                      {format(parseISO(task.date), "PPp")}
                    </time>
                  </td>
                  <td className="px-6 py-4 text-center">{task.type}</td>

                  <td className="px-6 py-4 flex justify-center">
                    <button onClick={() => editTask(task)}>
                      <PencilSquareIcon
                        className=" h-8 w-8 "
                        aria-hidden="true"
                      />
                    </button>

                    <button onClick={() => onDelete(task.id)}>
                      <TrashIcon
                        className="w-8 h-8 text-red-500 hover:text-red-700"
                        aria-hidden="true"
                      />
                    </button>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
      <form
        onSubmit={handleSubmit(onCheckSubmit)}
        className="bg-white border-b flex justify-around"
      >
        <div
          scope="row"
          className="px-6 py-4 font-normal text-gray-900 break-words text-center "
        >
          <input
            type="text"
            placeholder="Ingresa tu tarea"
            className="w-full"
            {...register("title", { required: true })}
          />
        </div>
        <div className="px-6 py-4 text-center font-normal text-gray-900">
          <input
            type="datetime-local"
            {...register("date", { required: true })}
          />
        </div>
        <div className="px-6 py-4 text-center">To Do</div>

        <button
          className=" px-6 py-4 flex justify-center align-middle hover:text-zinc-800"
          type="submit"
        >
          <PlusCircleIcon className=" h-8 w-8 " aria-hidden="true" />
          <h1 className=" mx-2 ">{edit ? 'Editar tarea' : 'Añadir Tarea'}</h1>
        </button>
      </form>
    </>
  );
};
export default Table;
