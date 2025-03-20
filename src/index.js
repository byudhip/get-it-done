import "./styles.css";
import ProjectManager from "./projectmanager.js";
import * as utils from "./utils.js";
import UI from "./ui.js";

const pm = ProjectManager();

utils.newTaskModal();
utils.newProjectModal();
utils.reapplyListeners();

