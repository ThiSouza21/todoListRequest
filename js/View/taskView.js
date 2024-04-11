function createLiTask(obj) {
  const liTask = document.createElement("li");
  const divNotCheckTask = document.createElement("div");
  const inputNotCheckTask = document.createElement("input");
  const pNameTask = document.createElement("p");
  const imgTrashTask = document.createElement("img");

  liTask.setAttribute("class", "containerLiTask");
  liTask.setAttribute("data-action", "taskLiSelect");
  liTask.setAttribute("data-id", `${obj.id}`);

  divNotCheckTask.setAttribute("class", "divNotCheckedtask");

  inputNotCheckTask.setAttribute("class", "inputNotCheckedtask");
  inputNotCheckTask.setAttribute("type", "checkbox");
  inputNotCheckTask.setAttribute("id", "inputTaskChecked");
  inputNotCheckTask.setAttribute("data-action", "inputCheckCompleted");

  pNameTask.setAttribute("class", "textNameTask");

  imgTrashTask.setAttribute("class", "imageTrash");
  imgTrashTask.setAttribute("data-action", "deleteLi");
  imgTrashTask.setAttribute("src", "./assets/trash-icon.svg");

  pNameTask.textContent = obj.title;

  divNotCheckTask.appendChild(inputNotCheckTask);
  liTask.appendChild(divNotCheckTask);
  liTask.appendChild(pNameTask);
  liTask.appendChild(imgTrashTask);

  liTask.firstChild.firstChild.checked = obj.completed;

  return liTask;
}

export class TaskView {
  constructor(container, divNotTasks, pCreated, pConcluid) {
    this.container = container;
    this.divNotTasks = divNotTasks;
    this.divNotTasks = divNotTasks;
    this.pCreated = pCreated;
    this.pConcluid = pConcluid;
  }

  render(task) {
    if (task.length > 0) {
      this.divNotTasks.style.display = "none";
      this.container.style.display = "flex";
    } else {
      this.divNotTasks.style.display = "flex";
      this.container.style.display = "none";
    }
    this.container.innerHTML = "";
    let index = 0;
    task.forEach((taskObj) => {
      if (taskObj.completed == true) index++;
      this.container.appendChild(createLiTask(taskObj));
    });
    this.checkQuantityTasks(task, index);
  }

  checkQuantityTasks(task, i) {
    this.pConcluid.textContent = `${i} de ${task.length}`;
    this.pCreated.textContent = `${task.length}`;
  }
}
