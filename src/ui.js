import PM from "./projectmanager.js";
import * as utils from "./utils.js";
import { format, parseISO, set } from "date-fns";

const assets = utils.getImages(
  require.context("./assets", false, /\.(png|jpe?g|svg)$/)
);

const UI = () => {
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
    console.log("renderProjects() is running...");
    const projectsDiv = document.querySelector("#projects");
    if (!projectsDiv) {
      console.error("Error: #projects div not found!");
      return;
    }
    projectsDiv.innerHTML = "";

    const projects = PM().getAllProjects();
    console.log("Projects received from PM():", projects);

    projects.forEach((project) => {
      console.log("Rendering project:", project.getName());
      const projectDiv = utils.createEl("div", null, "project-div");
      projectDiv.classList.remove("active");
      projectDiv.classList.add("agdasima-regular");
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
    console.log("Active project BEFORE exiting renderProjects():", PM().getActiveProject());
    
  };

  const renderTasks = () => {
    console.trace("renderTasks() is running...");
    const tasksDiv = document.querySelector("#tasks");
    tasksDiv.style.opacity = "0";
    tasksDiv.style.transition = "opacity 0.3s ease-in-out";

    setTimeout(() => {
      tasksDiv.innerHTML = "";
      const activeProj = PM().getActiveProject();
      console.log("Expected active project:", activeProj);
      if (!activeProj) {
        console.warn("No active project set! Tasks will not render");
        return;
      }
      const project = PM().getProject(activeProj);
      console.log("Project found for tasks:", project);

      const tasks = project.getTasks();
      console.log("Tasks received:", tasks);

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
    `[data-project="${PM().getActiveProject()}"]`
  );
  activeProjectDiv.classList.add("active");
  return {
    renderProjects,
    renderTasks,
  };
};

export { UI };
