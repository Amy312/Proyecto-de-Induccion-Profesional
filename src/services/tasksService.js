import { organizerAPI } from "./organizerInstance";

export const getTasks = async () => {
  return await organizerAPI.get("/tasks");
};

export const addTask = async (task) => {
  return await organizerAPI.post("/tasks", task);
};

export const deleteTask = async (id) => {
  return await organizerAPI.delete(`/tasks/${id}`);
};

export const updateTask = async (task) => {
  return await organizerAPI.put(`/tasks/${task.id}`, task);
};
