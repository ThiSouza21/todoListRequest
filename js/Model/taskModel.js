export class TaskModel {
  constructor(title, createdAt, completed, updateAt, id) {
    this.title = title;
    this.userId = 1;
    this.id = id;
    this.createdAt = createdAt || Date.now();
    this.completed = completed || false;
    this.updateAt = updateAt || null;
  }
}
