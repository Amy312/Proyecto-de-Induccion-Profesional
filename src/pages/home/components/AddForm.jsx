import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";
import { useEffect } from "react";
import { useDispatch, useTask } from "../../../context/ContextProvider";
import { addTask, updateTask } from "../../../services/tasksService";
import { types } from "../../../context/taskReducer";

const AddForm = (props) => {
  const { register, handleSubmit, setValue } = useForm();
  const { selectedDay, setViewForm, change, setChange, f } = props;
  const { id, edit, taskEdit } = useTask();
  const dispatch = useDispatch();
  const onCheckSubmit = async (data) => {
    if (edit == false) {
      addTask({
        id: Number(uuid()),
        idUser: id,
        title: data.title,
        date: format(selectedDay, "yyyy-MM-dd'T'") + data.date,
        category: data.category,
        type: "To Do",
      });
    } else {
      taskEdit.title = data.title;
      taskEdit.date = format(selectedDay, "yyyy-MM-dd'T'") + data.date;
      taskEdit.category = data.category;
      taskEdit.type = "To Do";
      updateTask(taskEdit);
      dispatch({ type: types.offEdit });
    }

    setViewForm(false);
    setChange(!change);
  };

  useEffect(() => {
    if (edit) {
      setValue("title", taskEdit?.title);
      setValue("date", taskEdit?.date.substring(11,16));
      setValue("category", taskEdit?.category);
    } else {
      setValue("title", "");
      setValue("date", "");
      setValue("category", "Seleccione");
    }
  }, []);

  useEffect(() =>{
    f();
  },[change])
 

  return (
    <>
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <form
          onSubmit={handleSubmit(onCheckSubmit)}
          className="space-y-4 md:space-y-6"
        >
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Título
            </label>
            <input
              type="text"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 "
              {...register("title", { required: true })}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Horario
            </label>
            <input
              type="time"
              id="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
              {...register("date", { required: true })}
            />
          </div>
          <div className="campo">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Categoría
            </label>

            <select id="category" {...register("category", { required: true })}>
              <option value="Universidad">Universidad</option>
              <option value="Hogar">Hogar</option>
              <option value="Personal">Personal</option>
              <option value="Ocio">Ocio</option>
            </select>
          </div>

          <div className="flex items-center justify-between"></div>
          <button
            type="submit"
            className="w-full text-white bg-rose-600 hover:bg-rose-700  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-1 "
          >
            Guardar
          </button>
        </form>
      </div>
    </>
  );
};
export default AddForm;
