import { Task } from "./TASK.ts";

interface ITaskList {
  list: Task[];

  addToList: (task: Task) => void;
  removeFromList: (id: "string") => void;
  getTaskById: (id: string) => Task | null;
}

export class TaskList implements ITaskList {
  list: Task[];

  constructor(tasks?: Task[]) {
    this.list = tasks || [];
  }

  addToList(task: Task) {
    this.list.push(task);
  }

  removeFromList(id: string) {
    const indexToRemove = this.list.findIndex((task) => task.id === id);

    if (indexToRemove !== -1) {
      this.list.splice(indexToRemove, 1);
    }
  }

  getTaskById(id: string) {
    return this.list.find((task) => task.id === id) || null;
  }
}
