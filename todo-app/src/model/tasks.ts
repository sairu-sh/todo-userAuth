import { getRandomId } from "../utils";

let ids: string[] = [];

interface ITask {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;

  toggleCompleted: () => boolean;
}

export class Task implements ITask {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;

  constructor(title: string, description: string = "") {
    while (true) {
      const randomId = getRandomId();

      if (!ids.includes(randomId)) {
        this.id = randomId;
        break;
      }
    }

    ids.push(this.id);
    this.title = title;
    this.description = description;
    this.isCompleted = false;
  }

  toggleCompleted() {
    this.isCompleted = !this.isCompleted;
    return this.isCompleted;
  }
}

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

const taskList = new TaskList();
const task1 = new Task("title");
taskList.addToList(task1);

type CreateTaskParams = {
  title: string;
  description?: string;
};

export function createTask({ title, description }: CreateTaskParams) {
  const task = new Task(title, description);
  taskList.addToList(task);
  return "success";
}

export function getAll() {
  return taskList.list;
}

export function getCompleted() {
  return taskList.list.filter((task) => task.isCompleted);
}

export function getRemaining() {
  return taskList.list.filter((task) => !task.isCompleted);
}

export function toggleCompleted(id: string) {
  const task = taskList.list.find((task) => task.id === id);
  task?.toggleCompleted();
  return task;
}

export function deleteTask(id: string) {
  const task = taskList.list.find((task) => task.id === id);
  if (task) {
    taskList.removeFromList(id);
    return true;
  } else return false;
}
