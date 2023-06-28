import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { format, parseISO } from "date-fns";
import { Fragment, useState } from "react";
import { useDispatch } from "../../../context/ContextProvider";
import { types } from "../../../context/taskReducer";

const Task = ({ task, classNames, onDelete, onEdit, setViewForm }) => {
  const startDateTime = parseISO(task.date);
  const [color, setColor] = useState(
    task.type === "To Do"
      ? "bg-slate-200 border-slate-400"
      : task.type === "Done"
      ? "bg-emerald-300"
      : "bg-yellow-400 border-yellow-600"
  );
  const dispatch = useDispatch();

  const changeColor = () => {
    if (color === "bg-slate-200 border-slate-400") {
      task.type = "In Progress";
      setColor("bg-yellow-400 border-yellow-600");
    } else if (color === "bg-yellow-400 border-yellow-600") {
      setColor("bg-green-300 border-green-500");
      task.type = "Done";
    } else {
      setColor("bg-slate-200 border-slate-400");
      task.type = "To Do";
    }

    onEdit(task);
  };

  const editTask = () => {
    dispatch({ type: types.edit, taskEdit: task });
    setViewForm(true);
  };

  return (
    <>
      <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
        <button
          onClick={() => changeColor()}
          className={`flex-none w-5 h-5 rounded-full border-2 ${color}`}
        />
        <div className="flex-auto flex-col ">
          <p className="text-gray-900">{task.title} </p>

          <p className="text-gray-500 ms-2">
            <time dateTime={task.date}>{format(startDateTime, "h:mm a")}</time>
          </p>
          <p className="text-gray-500 ms-2">{task.category}</p>
        </div>
        <Menu
          as="div"
          className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
        >
          <div>
            <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
              <span className="sr-only">Open options</span>
              <EllipsisVerticalIcon className="w-6 h-6" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      onClick={() => editTask()}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Editar
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      onClick={() => onDelete(task.id)}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Eliminar
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </li>
    </>
  );
};
export default Task;
