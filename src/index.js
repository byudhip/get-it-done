import "./styles.css";
import ProjectManager from "./projectmanager.js";
import * as utils from "./utils.js";
import UI from "./ui.js";

const pm = ProjectManager();

const newTask = document.querySelector(".add-new-task");
const taskModal = utils.newTaskModal();

newTask.addEventListener("click", () => taskModal.showModal());