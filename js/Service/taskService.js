import { createFetch } from "../createFetch.js";
import { urlTasks, urlUsers, userId } from "../config.js";
import { TaskModel } from "../Model/taskModel.js";

export class TaskService {
  constructor() {
    this.tasks = [];
  }

  async add(task, userId, success) {
    if (!task instanceof TaskModel) {
      throw new Error("task must be an instance of TaskModel");
    }
    await createFetch(`${urlUsers}/${userId}/tasks`, "POST", task);
    await this.getTasks(userId, () => success(this.tasks));
    this.tasks.push(task);
  }

  async getTasks(userId, success) {
    const fn = (jsonArrayTask) => {
      this.tasks = jsonArrayTask.map((obj) => {
        const { title, createdAt, completed, updateAt, id } = obj;
        return new TaskModel(title, createdAt, completed, updateAt, id);
      });

      success(this.tasks);
    };

    createFetch(`${urlUsers}/${userId}/tasks`)
      .then((response) => {
        return fn(response);
      })
      .catch((e) => {
        alert(e.message);
      });
  }

  async deleteTasks(idTask, success) {
    await createFetch(`${urlTasks}/${idTask}`, "DELETE");
    this.getTasks(userId, () => success(this.tasks));
  }

  async completedTasks(idTask, status, success) {
    await createFetch(`${urlTasks}/${idTask}`, "PATCH", { completed: status });
    this.getTasks(userId, () => success(this.tasks));
  }
}
