import { TaskModel } from "../Model/taskModel.js";
import { userId } from "../config.js";

export class TaskController {
  constructor(service, view) {
    this.service = service;
    this.view = view;
  }

  async addTask(title) {
    await this.service.add(new TaskModel(title), userId, () =>
      this.view.render(this.service.tasks)
    );
  }

  getTask() {
    this.service.getTasks(userId, () => this.view.render(this.service.tasks));
  }

  deleteTask(idTask) {
    this.service.deleteTasks(idTask, () =>
      this.view.render(this.service.tasks)
    );
  }

  completedTask(idTask, status) {
    this.service.completedTasks(idTask, status, () =>
      this.view.render(this.service.tasks)
    );
  }
}
