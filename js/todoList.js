import { TaskService } from "./Service/taskService.js";
import { TaskController } from "./Controller/taskController.js";
import { TaskView } from "./View/taskView.js";

const liNotCreated = document.getElementById("notCreatedTask");
const ulTaskAdd = document.getElementById("ulToTasks");
const pTaskCreatedCont = document.getElementById("contTasks");
const pTaskConcluidCont = document.getElementById("contConcluid");
const formAddTask = document.getElementById("formTask");
const inputAddTask = document.getElementById("inputTaskName");
const arrayInputsCheckedLi = Array.from(
  document.getElementsByClassName("inputNotCheckedtask")
);
const alertTextLimite = document.getElementById("alertLimitedText");
const trashAlertLimited = document.getElementById("trashAlertText");

const taskService = new TaskService();
const taskView = new TaskView(
  ulTaskAdd,
  liNotCreated,
  pTaskCreatedCont,
  pTaskConcluidCont
);
const taskController = new TaskController(taskService, taskView);

inputAddTask.value = "";
inputAddTask.focus();

trashAlertLimited.addEventListener("click", () => {
  alertTextLimite.classList.remove("displayFlexAlertLimite");
  inputAddTask.focus();
});

formAddTask.addEventListener("submit", function (e) {
  if (inputAddTask.value.length > 0) {
    alertTextLimite.classList.remove("displayFlexAlertLimite");
    e.preventDefault();
    taskController.addTask(inputAddTask.value);
    inputAddTask.value = "";
    inputAddTask.focus();
  } else {
    e.preventDefault();
    alertTextLimite.classList.add("displayFlexAlertLimite");
    inputAddTask.focus();
  }
});

ulTaskAdd.addEventListener("click", (e) => {
  let elementClickEvent = e.target;
  let dataActionElements = elementClickEvent.getAttribute("data-action");

  const elementFirstClick = elementClickEvent;
  while (elementClickEvent.nodeName !== "LI") {
    elementClickEvent = elementClickEvent.parentElement;
  }

  const actions = {
    inputCheckCompleted: function () {
      if (elementFirstClick.nodeName == "INPUT" && elementFirstClick.checked) {
        taskController.completedTask(
          elementClickEvent.getAttribute("data-id"),
          true
        );
      } else {
        taskController.completedTask(
          elementClickEvent.getAttribute("data-id"),
          false
        );
      }
    },
    deleteLi: function () {
      taskController.deleteTask(elementClickEvent.getAttribute("data-id"));
      console.log(elementClickEvent.getAttribute("data-id"));
    },
  };

  if (actions[dataActionElements]) {
    actions[dataActionElements]();
  } else if (!actions[dataActionElements]) {
    return;
  }
});

taskController.getTask();

arrayInputsCheckedLi.forEach((input) => {
  if (input.nodeName == "INPUT" && input.checked) {
    taskController.completedTask(
      elementClickEvent.getAttribute("data-id"),
      true
    );
  } else {
    taskController.completedTask(
      elementClickEvent.getAttribute("data-id"),
      false
    );
  }
});
