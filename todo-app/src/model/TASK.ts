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
