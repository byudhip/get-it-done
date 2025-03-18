import PM from "./projectmanager.js";
import * as utils from "./utils.js";

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
  };
}

const UI = (function () {
  let activeProject = "Home";
  const uic = UIColor();
  const initUI = () => {
    const body = document.querySelector("body");
    const container = utils.createEl("div", "container");
    container.style.background = uic.getBlackUI();
    body.appendChild(container);

    const headerDiv = utils.createEl("div", "header");
    const logo = utils.createEl("img", "logo");

    logo.src = assets["getitdone-logo.svg"];
    logo.setAttribute("style",uic.getBlackUILogo());
    headerDiv.appendChild(logo);
    container.appendChild(headerDiv);

    const leftSidebarDiv = utils.createEl("div", "left-sidebar");
    leftSidebarDiv.style.borderRight = `1px solid ${uic.getBlackUIFontColor()}`;
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
    middleDiv.style.borderRight = `1px solid ${uic.getBlackUIFontColor()}`;
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
    const dueDiv = utils.createEl("div", "due-dates", null, "due date here");
    rightSidebarDiv.appendChild(dueHeadline);
    rightSidebarDiv.appendChild(dueDiv);
  };

  const renderDefaultProject = () => {
    const projectDiv = document.querySelector("#projects");
    projectDiv.innerHTML = "";

    const project = PM().getProject(activeProject);
    console.log("Projects: ", project);

    console.log("Project data:", project);
    const projectEl = utils.createEl("button", null, "project-button");
    projectEl.classList.add("active-project");
    projectEl.style.backgroundColor = "transparent";
    projectEl.style.color = uic.getBlackUIFontColor();
    projectEl.textContent = project.getName();
    projectDiv.appendChild(projectEl);

    const addProjectBtn = utils.createEl(
      "button",
      null,
      "add-project-button",
      "+"
    );
    addProjectBtn.style.backgroundColor = "transparent";
    addProjectBtn.style.color = uic.getBlackUIFontColor();
    projectDiv.appendChild(addProjectBtn);
  };

  const renderTasks = () => {
    const tasksDiv = document.querySelector("#tasks");
    tasksDiv.innerHTML = "";

    const project = PM().getProject(activeProject);

    const tasks = project.getTasks();

    Object.values(tasks).forEach((task) => {
      const taskElement = utils.createEl("div", null, "task");
      const taskTitle = utils.createEl("h3", null, "task-headline", task.title);
      const taskDesc = utils.createEl(
        "p",
        null,
        "task-description",
        task.description
      );
      taskTitle.style.color = uic.getBlackUIFontColor();
      taskDesc.style.color = uic.getBlackUIFontColor();
      taskElement.appendChild(taskTitle);
      taskElement.appendChild(taskDesc);
      tasksDiv.appendChild(taskElement);
    });
  };
  initUI();
  renderDefaultProject();
  renderTasks();
  return {};
})();

export { UI, UIColor };
