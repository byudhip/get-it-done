import PM from "./projectmanager.js";
import * as utils from "./utils.js";
import { format, parseISO, set } from "date-fns";

const assets = utils.getImages(
  require.context("./assets", false, /\.(png|jpe?g|svg)$/)
);

function UIColor() {
  const defaultBlackUI =
    "linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(40, 40, 40, 0.9))";
  const blackUIFontColor = "rgba(245, 240, 230, 0.9)";
  const blackUILogo =
    "filter: invert(92%) sepia(8%) saturate(142%) hue-rotate(18deg) brightness(97%) contrast(91%)"; // add as argument for logo.setAttribute()
  const deepBlueUI =
    "linear-gradient(135deg, rgba(0, 51, 102, 0.9), rgba(30, 80, 140, 0.9))";
  const deepBlueUIFontColor = "rgba(245, 240, 230, 0.9)";
  const deepBlueUILogo =
    "filter: invert(90%) sepia(10%) saturate(160%) hue-rotate(190deg) brightness(105%) contrast(90%)";
  const darkGreenUI =
    "linear-gradient(135deg, rgba(0, 80, 0, 0.9), rgba(40, 120, 40, 0.9))";
  const darkGreenUIFontColor = "rgba(235, 225, 200, 0.9)";
  const darkGreenUILogo =
    "filter: invert(90%) sepia(8%) saturate(150%) hue-rotate(90deg) brightness(105%) contrast(90%)";
  const burgundyUI =
    "linear-gradient(135deg, rgba(102, 0, 51, 0.9), rgba(140, 40, 80, 0.9))";
  const burgundyUILogo =
    "filter: invert(94%) sepia(5%) saturate(150%) hue-rotate(320deg) brightness(105%) contrast(90%)";
  const burgundyUIFontColor = "rgba(250, 220, 220, 0.9)";
  const burntOrangeUI =
    "linear-gradient(135deg,rgba(153, 51, 0, 0.9), rgba(200, 100, 40, 0.9))";
  const burntOrangeUILogo =
    "filter: invert(95%) sepia(7%) saturate(140%) hue-rotate(30deg) brightness(107%) contrast(88%)";
  const burntOrangeUIFontColor = "rgba(230, 225, 220, 0.9)";
  const getBlackUI = () => defaultBlackUI;
  const getBlackUILogo = () => blackUILogo;
  const getBlackUIFontColor = () => blackUIFontColor;
  const getDeepBlueUI = () => deepBlueUI;
  const getDeepBlueUILogo = () => deepBlueUILogo;
  const getDeepBlueUIFontColor = () => deepBlueUIFontColor;
  const getDarkGreenUI = () => darkGreenUI;
  const getDarkGreenUILogo = () => darkGreenUILogo;
  const getDarkGreenUIFontColor = () => darkGreenUIFontColor;
  const getBurgundyUI = () => burgundyUI;
  const getBurgundyUILogo = () => burgundyUILogo;
  const getBurgundyUIFontColor = () => burgundyUIFontColor;
  const getBurntOrangeUI = () => burntOrangeUI;
  const getBurntOrangeUILogo = () => burntOrangeUILogo;
  const getBurntOrangeUIFontColor = () => burntOrangeUIFontColor;
  const tp = () => "transparent";
  return {
    getBlackUI,
    getBlackUIFontColor,
    getBlackUILogo,
    getDeepBlueUI,
    getDeepBlueUIFontColor,
    getDeepBlueUILogo,
    getDarkGreenUI,
    getDarkGreenUIFontColor,
    getDarkGreenUILogo,
    getBurgundyUI,
    getBurgundyUIFontColor,
    getBurgundyUILogo,
    getBurntOrangeUI,
    getBurntOrangeUIFontColor,
    getBurntOrangeUILogo,
    tp,
  };
}

const Theme = () => {
  const container = document.querySelector("#container");
  const logo = document.querySelector("#logo");
  const sectionHeadlines = document.querySelectorAll(".section-headline");


};

const UI = (function () {
  let activeProject = "Home";
  const getActiveProject = () => activeProject;
  const setActiveProject = (project) => {
    activeProject = project;
  }
  const uic = UIColor();
  const initUI = () => {
    const body = document.querySelector("body");
    const container = utils.createEl("div", "container");
    container.style.background = uic.getBlackUI();
    body.appendChild(container);

    const headerDiv = utils.createEl("div", "header");
    const logo = utils.createEl("img", "logo");

    logo.src = assets["getitdone-logo.svg"];
    logo.setAttribute("style", uic.getBlackUILogo());
    headerDiv.appendChild(logo);
    container.appendChild(headerDiv);

    const leftSidebarDiv = utils.createEl("div", "left-sidebar");
    utils.addRightBorder(leftSidebarDiv, uic.getBlackUIFontColor(), uic.tp());
    container.appendChild(leftSidebarDiv);

    const projectsDiv = utils.createEl("div", "projects");
    const projectsHeadline = utils.createEl(
      "h2",
      null,
      "section-headline",
      "Projects"
    );
    projectsHeadline.style.color = uic.getBlackUIFontColor();
    leftSidebarDiv.appendChild(projectsHeadline);
    leftSidebarDiv.appendChild(projectsDiv);

    const middleDiv = utils.createEl("div", "middle");
    utils.addRightBorder(middleDiv, uic.getBlackUIFontColor(), uic.tp());
    container.appendChild(middleDiv);

    const tasksHeadline = utils.createEl(
      "h2",
      null,
      "section-headline",
      "Tasks"
    );
    const tasksDiv = utils.createEl("div", "tasks", null, "task here");
    tasksHeadline.style.color = uic.getBlackUIFontColor();
    middleDiv.appendChild(tasksHeadline);
    middleDiv.appendChild(tasksDiv);

    const rightSidebarDiv = utils.createEl("div", "right-sidebar");
    container.appendChild(rightSidebarDiv);

    const dueHeadline = utils.createEl(
      "h2",
      null,
      "section-headline",
      "Upcoming Due"
    );
    const dueDiv = utils.createEl("div", "due-dates", null);
    dueHeadline.style.color = uic.getBlackUIFontColor();
    rightSidebarDiv.appendChild(dueHeadline);
    rightSidebarDiv.appendChild(dueDiv);
  };

  const renderProjects = () => {
    const projectsDiv = document.querySelector("#projects");
    projectsDiv.innerHTML = "";

    const projects = PM().getAllProjects();

    projects.forEach((project) => {
      const projectBtn = utils.createEl("button", null, "project-button");
      projectBtn.style.backgroundColor = uic.tp();
      projectBtn.style.color = uic.getBlackUIFontColor();
      projectBtn.textContent = project.getName();
      projectBtn.setAttribute("data-project", project.getName());
      projectsDiv.appendChild(projectBtn);
    });
    utils.addBtn(projectsDiv, "add-new-project", uic.getBlackUIFontColor());
  };

  const renderDefaultTasks = () => {
    const tasksDiv = document.querySelector("#tasks");
    tasksDiv.innerHTML = "";

    const project = PM().getProject(getActiveProject());

    const tasks = project.getTasks();

    Object.values(tasks).forEach((task) => {
      const taskMain = utils.taskMaker(tasksDiv);
      const taskTitle = utils.createEl("h3", null, "task-headline", task.title);
      const taskDesc = utils.createEl(
        "p",
        null,
        "task-description",
        task.description
      );
      taskTitle.style.color = uic.getBlackUIFontColor();
      taskDesc.style.color = uic.getBlackUIFontColor();

      utils.taskDetailsDivider(taskDesc, uic.getBlackUIFontColor(), uic.tp());
      const taskSub = utils.createEl("div", null, "task-sub");
      const formattedDate = format(parseISO(task.dueDate), "do MMMM yyyy");
      const taskDate = utils.createEl(
        "p",
        null,
        "task-due-date",
        `Due: ${formattedDate}`
      );
      taskDate.style.color = uic.getBlackUIFontColor();
      const taskPriority = utils.createEl(
        "p",
        null,
        "task-priority",
        `Priority: ${task.priority}`
      );
      taskPriority.style.color = uic.getBlackUIFontColor();

      const taskStatus = utils.createEl(
        "p",
        null,
        "task-status",
        `Status: ${task.status}`
      );
      taskStatus.style.color = uic.getBlackUIFontColor();

      const removeTaskBtn = utils.createEl(
        "button",
        null,
        "remove-task-button",
        "✖"
      );
      removeTaskBtn.style.color = uic.getBlackUIFontColor();

      taskMain.appendChild(removeTaskBtn);
      taskMain.appendChild(taskTitle);
      taskMain.appendChild(taskDesc);
      taskSub.appendChild(taskDate);
      taskSub.appendChild(taskPriority);
      taskSub.appendChild(taskStatus);
      taskMain.appendChild(taskSub);
      tasksDiv.appendChild(taskMain);
    });
    utils.addBtn(tasksDiv, "add-new-task", uic.getBlackUIFontColor());
  };
  initUI();
  renderProjects();
  renderDefaultTasks();
  return {
    getActiveProject,
    setActiveProject,
    renderProjects,
    renderDefaultTasks,
  };
})();

export { UI, UIColor };
