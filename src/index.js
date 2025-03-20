import "./styles.css";
import ProjectManager from "./projectmanager.js";
import * as utils from "./utils.js";
import UI from "./ui.js";

const pm = ProjectManager();

const newTaskBtn = document.querySelector(".add-new-task");
// const newProjectBtn = document.querySelector(".add-new-project");
const taskModal = utils.newTaskModal();
const taskForm = document.querySelector("#task-form");
// const projectModal = utils.newProjectModal();

const tasksDiv = document.querySelectorAll(".task-main");

newTaskBtn.addEventListener("click", () => {
  taskModal.showModal();
});

tasksDiv.forEach((task) => {
  task.addEventListener("click", (e) => {
    const taskDiv = e.target.closest(".task-main");
    const taskDetails = utils.captureDetails(taskDiv);
    if (e.target.matches(".remove-task-button")) {
      utils.confirmRemoveTaskModal(taskDetails).showModal();
    } else { 
      utils.openEditTaskModal(taskDetails);
    }
  });
});

// newProjectBtn.addEventListener("click", () => {
//   projectModal.showModal();
// })
