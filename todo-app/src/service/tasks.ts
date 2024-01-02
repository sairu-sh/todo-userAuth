import * as taskModel from "../model/tasks";

type CreateTaskParams = {
  title: string;
  description?: string;
};

export const createTask = ({ title, description }: CreateTaskParams) => {
  const status = taskModel.createTask({ title, description });
  return status;
};

export const getAll = () => {
  const data = taskModel.getAll();

  return data;
};

export const getCompleted = () => {
  const data = taskModel.getCompleted();

  return data;
};

export const getRemaining = () => {
  const data = taskModel.getRemaining();

  return data;
};

export const toggleCompleted = (id: string) => {
  const data = taskModel.toggleCompleted(id);

  return data;
};

export const deleteTask = (id: string) => {
  const status = taskModel.deleteTask(id);

  return status;
};
