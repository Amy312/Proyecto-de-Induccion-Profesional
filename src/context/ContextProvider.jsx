import { createContext, useContext, useReducer } from "react";
import taskReducer, { initialValues } from "./taskReducer";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  return (
    <TaskContext.Provider value={useReducer(taskReducer, initialValues)}>
      {children}
    </TaskContext.Provider>
  );
};

const useTask = () => {
 // console.log(useContext(TaskContext));
  return useContext(TaskContext)[0];
};
const useDispatch = () => useContext(TaskContext)[1];

export { TaskContext, useTask, useDispatch };
export default TaskProvider;