import PM from "./projectmanager.js";
import { UI } from "./ui.js";
import { addDays, format, parse, parseISO } from "date-fns";

const ui = UI();

function getImages(r) {
  let images = {};
  r.keys().forEach((key) => {
    images[key.replace("./", "")] = r(key);
  });
  return images;
}

function createEl(tag, id = null, className = null, textContent = null) {
  const element = document.createElement(tag);
  if (id) element.id = id;
  if (className) element.classList.add(className);
  if (textContent) element.textContent = textContent;
  return element;
}

function addBtn(element, className) {
  const button = createEl(
    "button",
    null,
    className,
    `${className === "add-new-task-button" ? "New Task" : " New Project"}`
  );
  button.classList.add("agdasima-regular");
  button.style.width = "100%";
  button.style.marginTop = "5px";
  element.appendChild(button);
}

function addRightBorder(element) {
  element.style.position = "relative";

  let border = createEl("div");
  border.style.position = "absolute";
  border.classList.add("right-border");
  border.style.top = "0%";
  border.style.bottom = "1%";
  border.style.right = "0";
  border.style.width = "1px";
  border.style.background = `linear-gradient(to bottom,  rgba(245, 240, 230, 0.9), transparent)`;

  element.appendChild(border);
}

function taskMaker(element, priority, status) {
  const taskMain = createEl("div", null, "task-main");
  taskMain.classList.add(
    priority === "High" ? "high" : priority === "Medium" ? "medium" : "low"
  );
  if (status === "Finished") {
    taskMain.classList.remove("high");
    taskMain.classList.remove("medium");
    taskMain.classList.remove("low");
    taskMain.classList.add("finished");
  }
  taskMain.style.position = "relative";
  taskMain.style.zIndex = "0";

  element.appendChild(taskMain);

  return taskMain;
}

function taskDetailsDivider(element) {
  element.style.position = "relative";

  let border = createEl("div");
  border.classList.add("divider");
  border.style.position = "absolute";
  border.style.left = "0";
  border.style.bottom = "0";
  border.style.right = "0";
  border.style.height = "1px";
  border.style.background = `linear-gradient(to right, rgba(245, 240, 230, 0.9), transparent)`;

  element.appendChild(border);
}

function inputClean(input, maxlength = 25) {
  const trimmed = input.trim();
  const escaped = trimmed.replace(
    /[&<>"']/g,
    (match) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[match])
  );
  const limited = escaped.slice(0, maxlength);
  const limitedLong = escaped.slice(0, 250);
  return { trimmed, escaped, limited, limitedLong };
}

function captureProjectDetails(projectDiv) {
  const currentName = projectDiv.querySelector(".project-name-div").textContent;
  const project = PM().getProject(currentName);
  const currentAbout = project.getAbout();
  const originalDate = project.getProjectDueDate();
  const currentDate = format(parseISO(originalDate), "yyyy-MM-dd");

  return {
    projectDiv,
    currentName,
    currentAbout,
    currentDate,
  };
}

function openEditProjectModal({ currentName, currentAbout, currentDate }) {
  const modal = newProjectModal();
  modal.querySelector("#project-name-input").value = currentName;
  modal.querySelector("#project-about-input").value = currentAbout;
  modal.querySelector("#project-due-date-input").value = currentDate;

  modal.dataset.currentName = currentName; // important, rename function will not work without this.
  // console.trace("Send current project name: ", currentName);
  modal.dataset.isNew = false;
  modal.style.opacity = "0";
  modal.showModal();
  setTimeout(() => {
    setTimeout(() => {
      modal.style.opacity = "1";
    }, 10);
  }, 100);
}

function newProjectModal() {
  let modal = document.querySelector("#project-modal");

  if (!modal) {
    const body = document.querySelector("body");
    modal = createEl("dialog", "project-modal");
    const form = createEl("form", "project-form");
    form.setAttribute("action", "");

    const modalHeadline = createEl(
      "h3",
      "project-modal-headline",
      null,
      "Project Editor"
    );
    modalHeadline.classList.add("agdasima-bold");
    const nameLabel = createEl("label", null, null, "Name");
    nameLabel.setAttribute("for", "project-name-input");

    const nameInput = createEl("input", "project-name-input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("name", "project-name");
    nameInput.setAttribute("max-length", "25");
    nameInput.setAttribute("min-length", "5");
    nameInput.setAttribute("placeholder", "Min 5 characters, max 25");
    nameInput.required = true;

    nameLabel.appendChild(nameInput);
    nameLabel.classList.add("agdasima-regular");

    const aboutLabel = createEl(
      "label",
      null,
      null,
      "About Project (required)"
    );
    aboutLabel.setAttribute("for", "project-about-input");

    const aboutInput = createEl("textarea", "project-about-input");
    aboutInput.setAttribute("max-length", "250");
    aboutInput.setAttribute("min-length", "20");
    aboutInput.setAttribute(
      "placeholder",
      "Min 20 characters, max 250"
    );
    aboutInput.required = true;

    aboutLabel.appendChild(aboutInput);
    aboutLabel.classList.add("agdasima-regular");

    const projectDueDateLabel = createEl(
      "label",
      null,
      null,
      "Project Due (required)"
    );
    projectDueDateLabel.setAttribute("for", "project-due-date-input");

    const projectDueDateInput = createEl("input", "project-due-date-input");
    projectDueDateInput.setAttribute("type", "date");
    projectDueDateInput.setAttribute("name", "project-due-date");

    projectDueDateLabel.appendChild(projectDueDateInput);
    projectDueDateLabel.classList.add("agdasima-regular");

    const saveProjectBtn = createEl(
      "button",
      "save-project-button",
      null,
      "Save"
    );

    saveProjectBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const cleanedName = inputClean(nameInput.value);
      const cleanedAbout = inputClean(aboutInput.value);
      // console.log(modal.dataset.isNew);
      if (cleanedName.limited.length < 5) {
        nameInput.reportValidity();
        return;
      }
      if (cleanedAbout.limitedLong.length < 100) {
        aboutInput.reportValidity();
        return;
      }
      if (modal.dataset.isNew === "true") {
        // console.log("isNew variant started!");
        PM().addNewProject(
          cleanedName.limited,
          cleanedAbout.limitedLong,
          projectDueDateInput.value
        );
        ui.renderProjects();
        setTimeout(() => {
          PM().setActiveProject(cleanedName.limited);
          ui.renderTasks();
          ui.renderProjectDetails();
        }, 50);
        // console.log("isNew variant executed!");
        modal.close();
      } else if (modal.dataset.isNew === "false") {
        // console.log("!isNew variant started!");
        // console.log("Current project name is: ", modal.dataset.currentName);
        PM().renameProject(modal.dataset.currentName, cleanedName.limited);
        PM().changeProjectAbout(cleanedName.limited, cleanedAbout.limitedLong);
        PM().changeProjectDueDate(
          cleanedName.limited,
          projectDueDateInput.value
        );
        ui.renderProjects();
        setTimeout(() => {
          PM().setActiveProject(cleanedName.limited);
          ui.renderTasks();
          ui.renderProjectDetails();
        }, 50);
        // console.log("!isNew variant executed!");
        modal.close();
      }
    });

    const closeModalBtn = createEl("button", null, "close-modal-button", "X");
    closeModalBtn.setAttribute("type", "button");

    form.appendChild(modalHeadline);
    form.appendChild(nameLabel);
    form.appendChild(aboutLabel);
    form.appendChild(projectDueDateLabel);
    form.appendChild(saveProjectBtn);

    modal.appendChild(form);
    modal.appendChild(closeModalBtn);
    body.appendChild(modal);
  }
  return modal;
}

function newTaskModal() {
  const body = document.querySelector("body");
  const modal = createEl("dialog", "task-modal");
  const form = createEl("form", "task-form");
  form.setAttribute("action", "");

  const modalHeadline = createEl(
    "h3",
    "task-modal-headline",
    null,
    "Task Editor"
  );
  modalHeadline.classList.add("agdasima-bold");
  const titleLabel = createEl("label", null, null, "Title (required)");
  titleLabel.setAttribute("for", "task-title");

  const titleInput = createEl("input", "task-title");
  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("name", "task-title");
  titleInput.setAttribute("max-length", "25");
  titleInput.setAttribute("min-length", "5");
  titleInput.setAttribute("placeholder", "Min 5 characters, max 25");
  titleInput.required = true;

  titleLabel.appendChild(titleInput);

  const descriptionLabel = createEl(
    "label",
    null,
    null,
    "Description (required)"
  );
  descriptionLabel.setAttribute("for", "task-description");

  const descriptionInput = createEl("textarea", "task-description");
  descriptionInput.setAttribute("max-length", "250");
  descriptionInput.setAttribute("min-length", "20");
  descriptionInput.setAttribute(
    "placeholder",
    "Min 20 characters, max 250"
  );
  descriptionInput.required = true;

  descriptionLabel.appendChild(descriptionInput);

  const dueDateLabel = createEl("label", null, null, "Due Date");
  dueDateLabel.setAttribute("for", "task-due-date");

  const dueDateInput = createEl("input", "task-due-date");
  dueDateInput.setAttribute("type", "date");
  dueDateInput.setAttribute("name", "task-due-date");

  dueDateInput.required = true;
  dueDateLabel.appendChild(dueDateInput);

  const priorityLabel = createEl("label", null, null, "Priority");
  priorityLabel.setAttribute("for", "task-priority");

  const selectPriority = createEl("select", "task-priority");
  const priorityOptions = ["High", "Medium", "Low"];

  for (let option of priorityOptions) {
    const choice = createEl("option");
    choice.value = option;
    choice.textContent = option;
    selectPriority.appendChild(choice);
  }

  priorityLabel.appendChild(selectPriority);

  const statusLabel = createEl("label", null, null, "Status");
  statusLabel.setAttribute("for", "task-status");

  const selectStatus = createEl("select", "task-status");
  const statusOptions = ["Not started", "Ongoing", "Roadblocked", "Finished"];

  for (let option of statusOptions) {
    const choice = createEl("option");
    choice.value = option;
    choice.textContent = option;
    selectStatus.appendChild(choice);
  }

  statusLabel.appendChild(selectStatus);

  const saveTaskBtn = createEl("button", "save-task-button", null, "Save");
  saveTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const cleanTitle = inputClean(titleInput.value);
    const cleanTitleFinal = cleanTitle.limited;
    const cleanDescription = inputClean(descriptionInput.value);
    const cleanDescFinal = cleanDescription.limitedLong;

    if (cleanTitleFinal.length < 5) {
      titleInput.reportValidity();
      return;
    }
    if (cleanDescFinal.length < 100) {
      descriptionInput.reportValidity();
      return;
    }

    PM().newTask(PM().getActiveProject(), {
      title: cleanTitleFinal,
      description: cleanDescFinal,
      dueDate: dueDateInput.value,
      priority: selectPriority.value,
      status: selectStatus.value,
    });
    ui.renderTasks();
    ui.renderProjectDetails();
    modal.close();
  });

  const closeModalBtn = createEl("button", null, "close-modal-button", "X");

  form.appendChild(modalHeadline);
  form.appendChild(titleLabel);
  form.appendChild(descriptionLabel);
  form.appendChild(dueDateLabel);
  form.appendChild(priorityLabel);
  form.appendChild(statusLabel);
  form.appendChild(saveTaskBtn);

  modal.appendChild(form);
  modal.appendChild(closeModalBtn);
  body.appendChild(modal);

  const labels = document.querySelectorAll("label");
  for (let label of labels) {
    label.classList.add("agdasima-regular");
  }
  return modal;
}

function captureTaskDetails(taskDiv) {
  const originalDate = taskDiv
    .querySelector(".task-due-date")
    .textContent.slice(5); //Original String eg "12th May 2024"
  const regexedDate = originalDate.replace(/(\d+)(st|nd|rd|th)/, "$1"); //remove the ordinal suffix eg st nd rd from 1st 2nd 3rd
  // console.log(regexedDate);
  const parsedDate = parse(regexedDate, "d MMMM yyyy", new Date()); //convert the string back to Date object
  const formattedDate = format(parsedDate, "yyyy-MM-dd"); //format the Date into readable format for native date picker
  // console.log(formattedDate);
  return {
    taskDiv,
    currentTitle: taskDiv.querySelector(".task-headline").textContent,
    currentDescription: taskDiv.querySelector(".task-description").textContent,
    currentDueDate: formattedDate,
    currentPriority: taskDiv
      .querySelector(".task-priority")
      .textContent.slice(10),
    currentStatus: taskDiv.querySelector(".task-status").textContent.slice(8),
  };
}

function openEditTaskModal({
  currentTitle = "",
  currentDescription,
  currentDueDate,
  currentPriority,
  currentStatus,
}) {
  const modal = document.querySelector("#task-modal");

  modal.querySelector("#task-title").value = currentTitle;
  modal.querySelector("#task-description").value = currentDescription;
  modal.querySelector("#task-due-date").value = currentDueDate;
  modal.querySelector("#task-priority").value = currentPriority;
  modal.querySelector("#task-status").value = currentStatus;

  modal.dataset.currentTitle = currentTitle;
  modal.style.opacity = "0";
  setTimeout(() => {
    modal.showModal();
    setTimeout(() => {
      modal.style.opacity = "1";
    }, 10);
  }, 100);
}

function editTaskModal() {
  const modal = document.querySelector("#task-modal");
  const titleInput = document.querySelector("#task-title");
  const descriptionInput = document.querySelector("#task-description");
  const dueDateInput = document.querySelector("#task-due-date");
  const selectPriority = document.querySelector("#task-priority");
  const selectStatus = document.querySelector("#task-status");
  const saveTaskBtn = document.querySelector("#save-task-button");
  saveTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    PM().changeTaskTitle(
      PM().getActiveProject(),
      modal.dataset.currentTitle,
      inputClean(titleInput.value).limited
    );
    PM().changeTaskDescription(
      PM().getActiveProject(),
      modal.dataset.currentTitle,
      inputClean(descriptionInput.value).limitedLong
    );
    PM().changeTaskDueDate(
      PM().getActiveProject(),
      modal.dataset.currentTitle,
      dueDateInput.value
    );
    PM().changeTaskPriority(
      PM().getActiveProject(),
      modal.dataset.currentTitle,
      selectPriority.value
    );
    PM().changeTaskStatus(
      PM().getActiveProject(),
      modal.dataset.currentTitle,
      selectStatus.value
    );
    ui.renderTasks();
    ui.renderProjectDetails();
  });
  return modal;
}

function confirmRemoveProjectModal({ projectDiv, currentName }) {
  const body = document.querySelector("body");
  let modal = document.querySelector("#confirm-remove-project-modal");
  if (!modal) {
    modal = createEl("dialog", "confirm-remove-project-modal");
    body.appendChild(modal);
  }
  modal.innerHTML = "";
  const form = createEl("form", "confirm-remove-project-form");
  modal.appendChild(form);
  body.appendChild(modal);

  const confirmText = createEl("p", null, "confirm-text");
  confirmText.classList.add("agdasima-regular");
  confirmText.innerHTML = `Remove Project <span class="to-bold">[${currentName}]</span>?`;
  const confirmRemoveBtn = createEl(
    "button",
    "confirm-remove-project-button",
    null,
    "Yes"
  );

  confirmRemoveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    projectDiv.remove();
    PM().deleteProject(currentName);
    ui.renderProjects();
    PM().setActiveProjectToDefault();
    ui.renderTasks();
    ui.renderProjectDetails();
    modal.close();
  });

  const closeModalBtn = createEl("button", null, "close-modal-button", "X");

  form.appendChild(confirmText);
  form.appendChild(confirmRemoveBtn);
  modal.appendChild(closeModalBtn);

  if (!modal.open) {
    modal.style.opacity = "0";
    setTimeout(() => {
      modal.showModal();
      setTimeout(() => {
        modal.style.opacity = "1";
      }, 10);
    }, 100);
  } else {
    // console.warn("Modal is already open!");
  }
}

function confirmRemoveTaskModal({ taskDiv, currentTitle }) {
  const body = document.querySelector("body");
  const modal = createEl("dialog", "confirm-remove-task-modal");
  const form = createEl("form", "confirm-remove-task-form");
  modal.appendChild(form);
  body.appendChild(modal);

  const confirmText = createEl("p", null, "confirm-text");
  confirmText.classList.add("agdasima-regular");
  confirmText.innerHTML = `Remove <span class="to-bold">[${currentTitle}]</span> task from Project <span class="to-bold">[${PM().getActiveProject()}]</span>?`;

  const confirmRemoveBtn = createEl(
    "button",
    "confirm-remove-task-button",
    null,
    "Yes"
  );

  confirmRemoveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    taskDiv.remove();
    PM().removeTask(PM().getActiveProject(), currentTitle);
    ui.renderTasks();
    ui.renderProjectDetails();
    modal.close();
  });

  const closeModalBtn = createEl("button", null, "close-modal-button", "X");

  form.appendChild(confirmText);
  form.appendChild(confirmRemoveBtn);
  modal.appendChild(closeModalBtn);

  if (!modal.open) {
    modal.style.opacity = "0";
    setTimeout(() => {
      modal.showModal();
      setTimeout(() => {
        modal.style.opacity = "1";
      }, 10);
    }, 100);
  } else {
    // console.warn("Modal is already open!");
  }
}

function reapplyListeners() {
  const newTaskBtn = document.querySelector(".add-new-task-button");
  const taskModal = document.querySelector("#task-modal");
  const projects = document.querySelector("#projects");
  const tasksDiv = document.querySelectorAll(".task-main");

  newTaskBtn.addEventListener("click", () => {
    const tentativeDueDate = addDays(new Date(), 1);
    const formattedDate = format(tentativeDueDate, "yyyy-MM-dd");
    document.querySelector("#task-title").value = "";
    document.querySelector("#task-description").value = "";
    document.querySelector("#task-due-date").value = formattedDate;
    document.querySelector("#task-priority").value = "Low";
    document.querySelector("#task-status").value = "Not started";
    taskModal.style.opacity = "0";
    setTimeout(() => {
      taskModal.showModal();
      setTimeout(() => {
        taskModal.style.opacity = "1";
      }, 10);
    }, 100);
  });

  tasksDiv.forEach((task) => {
    task.addEventListener("click", (e) => {
      const taskDiv = e.target.closest(".task-main");
      const taskDetails = captureTaskDetails(taskDiv);
      // console.log("Task div:", taskDiv, ", Clicked element:", e.target);
      if (e.target.matches(".remove-task-button")) {
        confirmRemoveTaskModal(taskDetails);
      } else {
        openEditTaskModal(taskDetails);
      }
    });
  });

  projects.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.matches(".add-new-project-button")) {
      const projectModal = document.querySelector("#project-modal");
      document.querySelector("#project-name-input").value = "New project";
      document.querySelector("#project-about-input").value = "";
      document.querySelector("#project-due-date-input").value = format(
        addDays(new Date(), 14),
        "yyyy-MM-dd"
      ); //set default due date to 2 weeks from today
      projectModal.style.opacity = "0";
      projectModal.dataset.isNew = true;
      setTimeout(() => {
        projectModal.showModal();
        setTimeout(() => {
          projectModal.style.opacity = "1";
        }, 10);
      }, 100);
      return;
    }
    const projectDiv = e.target.closest(".project-div");
    if (!projectDiv) return;
    const newProject = captureProjectDetails(projectDiv);
    const projectName = projectDiv.dataset.project;
    if (e.target.matches(".edit-project-button")) {
      openEditProjectModal(newProject);
    } else if (e.target.matches(".remove-project-button")) {
      confirmRemoveProjectModal(newProject);
    } else if (e.target.matches(".project-name-div")) {
      PM().setActiveProject(projectName);
      if (!window.renderTasksRunning) {
        // Prevent multiple executions
        window.renderTasksRunning = true;
        // console.log("Calling renderTasks() from utils.js...");
        ui.renderTasks();
        ui.renderProjectDetails();
        setTimeout(() => {
          window.renderTasksRunning = false;
        }, 100); // Reset flag
      }
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.matches(".close-modal-button")) {
      const modal = e.target.closest("dialog");
      if (
        (modal && modal.id === "confirm-remove-task-modal") ||
        modal.id === "confirm-remove-project-modal"
      ) {
        modal.style.opacity = "0";
        setTimeout(() => {
          modal.close();
          modal.remove();
        }, 100);
      } else {
        modal.style.opacity = "0";
        setTimeout(() => {
          modal.close();
        }, 300);
      }
    }
  });
}

export {
  getImages,
  createEl,
  addBtn,
  taskMaker,
  taskDetailsDivider,
  addRightBorder,
  newProjectModal,
  captureProjectDetails,
  newTaskModal,
  captureTaskDetails,
  openEditTaskModal,
  editTaskModal,
  confirmRemoveTaskModal,
  reapplyListeners,
};
