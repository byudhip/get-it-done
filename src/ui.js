import PM from "./projectmanager.js";
import * as utils from "./utils.js";
import { format, parseISO, set } from "date-fns";

const assets = utils.getImages(
  require.context("./assets", false, /\.(png|jpe?g|svg)$/)
);

const UI = () => {
  const projects = PM().getAllProjects();
  let activeProject = projects.length > 0 ? projects[0].getName() : null;
  const setActiveProject = (newProject) => {
    if (newProject === activeProject) return;
    const projectDivs = document.querySelectorAll(".project-div");
    projectDivs.forEach((project) => {
      project.classList.remove("active");
    });

    const projectNames = projects.map((p) => p.getName());
    if (projectNames.includes(newProject)) {
      activeProject = newProject;
    } else {
      activeProject = projects.length > 0 ? projects[0].getName() : null;
    }

    const newActiveProject = document.querySelector(
      `[data-project="${activeProject}"]`
    );
    if (newActiveProject) {
      newActiveProject.classList.add("active");
    }
  };
  const getActiveProject = () => {
    const projectNames = projects.map((p) => p.getName());
    return projectNames.includes(activeProject)
      ? activeProject
      : projects.length > 0
      ? projects[0].getName()
      : null;
  };

  const initUI = () => {
    const body = document.querySelector("body");
    const container = utils.createEl("div", "container");
    body.appendChild(container);

    const headerDiv = utils.createEl("div", "header");
    const logo = utils.createEl("img", "logo");

    logo.src = assets["getitdone-logo.svg"];
    headerDiv.appendChild(logo);
    container.appendChild(headerDiv);

    const leftSidebarDiv = utils.createEl("div", "left-sidebar");
    utils.addRightBorder(leftSidebarDiv);
    container.appendChild(leftSidebarDiv);

    const projectsDiv = utils.createEl("div", "projects");
    const projectsHeadline = utils.createEl(
      "h2",
      null,
      "section-headline",
      "Projects"
    );
    projectsHeadline.classList.add("agdasima-bold");
    leftSidebarDiv.appendChild(projectsHeadline);
    leftSidebarDiv.appendChild(projectsDiv);

    const middleDiv = utils.createEl("div", "middle");
    utils.addRightBorder(middleDiv);
    container.appendChild(middleDiv);

    const tasksHeadline = utils.createEl(
      "h2",
      null,
      "section-headline",
      "Tasks"
    );
    tasksHeadline.classList.add("agdasima-bold");
    const tasksDiv = utils.createEl("div", "tasks", null, "task here");
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
    dueHeadline.classList.add("agdasima-bold");
    const dueDiv = utils.createEl("div", "due-dates", null);
    rightSidebarDiv.appendChild(dueHeadline);
    rightSidebarDiv.appendChild(dueDiv);
  };

  const renderProjects = () => {
    const projectsDiv = document.querySelector("#projects");
    projectsDiv.innerHTML = "";

    const projects = PM().getAllProjects();

    projects.forEach((project) => {
      const projectDiv = utils.createEl("div", null, "project-div");
      const projectNameDiv = utils.createEl("div", null, "project-name-div");
      const editProjectBtn = utils.createEl(
        "button",
        null,
        "edit-project-button",
        "Edit"
      );
      const removeProjectBtn = utils.createEl(
        "button",
        null,
        "remove-project-button",
        "✖"
      );

      projectNameDiv.textContent = project.getName();
      projectDiv.setAttribute("data-project", project.getName());

      projectDiv.appendChild(projectNameDiv);
      projectDiv.appendChild(editProjectBtn);
      projectDiv.appendChild(removeProjectBtn);
      projectsDiv.appendChild(projectDiv);
    });
    utils.addBtn(projectsDiv, "add-new-project-button");
    
  };

  const renderTasks = () => {
    const tasksDiv = document.querySelector("#tasks");

    tasksDiv.style.opacity = "0";
    tasksDiv.style.transition = "opacity 0.3s ease-in-out";

    setTimeout(() => {
      tasksDiv.innerHTML = "";

      const activeProj = getActiveProject();
      if (!activeProj) return;
      const project = PM().getProject(activeProj);

      const tasks = project.getTasks();

      Object.values(tasks).forEach((task) => {
        const taskMain = utils.taskMaker(tasksDiv, task.priority, task.status);
        const taskTitle = utils.createEl(
          "h3",
          null,
          "task-headline",
          task.title
        );
        taskTitle.classList.add("agdasima-regular");
        const taskDescription = utils.createEl(
          "p",
          null,
          "task-description",
          task.description
        );
        taskDescription.classList.add("agdasima-regular");
        taskDescription.style.position = "relative";

        utils.taskDetailsDivider(taskDescription);
        const taskSub = utils.createEl("div", null, "task-sub");
        const formattedDate = format(parseISO(task.dueDate), "do MMMM yyyy");
        const taskDate = utils.createEl(
          "p",
          null,
          "task-due-date",
          `Due: ${formattedDate}`
        );
        taskDate.classList.add("agdasima-regular");
        const taskPriority = utils.createEl(
          "p",
          null,
          "task-priority",
          `Priority: ${task.priority}`
        );
        taskPriority.classList.add("agdasima-regular");
        const taskStatus = utils.createEl(
          "p",
          null,
          "task-status",
          `Status: ${task.status}`
        );
        taskStatus.classList.add("agdasima-regular");
        const removeTaskBtn = utils.createEl(
          "button",
          null,
          "remove-task-button",
          "✖"
        );

        taskMain.appendChild(removeTaskBtn);
        taskMain.appendChild(taskTitle);
        taskMain.appendChild(taskDescription);
        taskSub.appendChild(taskDate);
        taskSub.appendChild(taskPriority);
        taskSub.appendChild(taskStatus);
        taskMain.appendChild(taskSub);
        tasksDiv.appendChild(taskMain);
      });
      utils.addBtn(tasksDiv, "add-new-task-button");
      setTimeout(() => {
        tasksDiv.style.opacity = "1";
        utils.reapplyListeners();
      }, 10);
    }, 300);
  };
  initUI();
  renderProjects();
  renderTasks();
  const activeProjectDiv = document.querySelector(
    `[data-project="${activeProject}"]`
  );
  activeProjectDiv.classList.add("active");
  return {
    getActiveProject,
    setActiveProject,
    renderProjects,
    renderTasks,
  };
};

export { UI };
