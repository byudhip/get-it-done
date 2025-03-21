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
  taskMain.classList.add(priority === "High" ? "high" : priority === "Medium" ? "medium" : "low");
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

function newProjectModal() {
  const body = document.querySelector("body");
  const modal = createEl("dialog", "project-modal");
  const form = createEl("form", "project-form");
  form.setAttribute("action", "");

  const nameLabel = createEl("label", null, null, "Name");
  nameLabel.setAttribute("for", "project-name");

  const nameInput = createEl("input", "project-name");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("name", "project-name");
  nameInput.setAttribute("max-length", "25");
  nameInput.setAttribute("placeholder", "Unicorn");
  nameInput.required = true;

  nameLabel.appendChild(nameInput);
  nameLabel.classList.add("agdasima-regular");

  const saveProjectBtn = createEl(
    "button",
    "save-project-button",
    null,
    "Save"
  );
  saveProjectBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!nameInput.value.trim()) {
      nameInput.reportValidity();
      return;
    }
    PM().addNewProject(nameInput.value);
    ui.renderProjects();
    ui.renderTasks();
    modal.close();
  });

  const closeModalBtn = createEl("button", null, "close-modal-button", "✖");

  form.appendChild(nameLabel);
  form.appendChild(saveProjectBtn);
  form.appendChild(closeModalBtn);
  modal.appendChild(form);
  body.appendChild(modal);

  return modal;
}

function captureProjectDetails(projectDiv) {
  return {
    projectDiv,
    currentName: taskDiv.querySelector(".project-name-div").textContent
  };
}

function editProjectModal() {

}

function newTaskModal() {
  const body = document.querySelector("body");
  const modal = createEl("dialog", "task-modal");
  const form = createEl("form", "task-form");
  form.setAttribute("action", "");

  const titleLabel = createEl("label", null, null, "Title (required)");
  titleLabel.setAttribute("for", "task-title");

  const titleInput = createEl("input", "task-title");
  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("name", "task-title");
  titleInput.setAttribute("max-length", "25");
  titleInput.setAttribute("placeholder", "Get Groceries");
  titleInput.required = true;

  titleLabel.appendChild(titleInput);

  const descriptionLabel = createEl("label", null, null, "Description (required)");
  descriptionLabel.setAttribute("for", "task-description");

  const descriptionInput = createEl("textarea", "task-description");
  descriptionInput.setAttribute("max-length", "250");
  descriptionInput.setAttribute(
    "placeholder",
    "Buy 3 dozen eggs, 14 liters of milk, 4 lbs of ham..."
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

    if (!titleInput.value.trim() || !descriptionInput.value.trim() || 
    !dueDateInput.value || !selectPriority.value || !selectStatus) {
      titleInput.reportValidity();
      return;
    }

    PM().newTask(ui.getActiveProject(), {
      title: titleInput.value,
      description: descriptionInput.value,
      dueDate: dueDateInput.value,
      priority: selectPriority.value,
      status: selectStatus.value,
    });
    ui.renderTasks();
    modal.close();
  });

  const closeModalBtn = createEl("button", null, "close-modal-button", "✖");

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
  console.log(regexedDate);
  const parsedDate = parse(regexedDate, "d MMMM yyyy", new Date()); //convert the string back to Date object
  const formattedDate = format(parsedDate, "yyyy-MM-dd"); //format the Date into readable format for native date picker
  console.log(formattedDate);
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

  modal.showModal();
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
      ui.getActiveProject(),
      modal.dataset.currentTitle,
      titleInput.value
    );
    PM().changeTaskDescription(
      ui.getActiveProject(),
      modal.dataset.currentTitle,
      descriptionInput.value
    );
    PM().changeTaskDueDate(
      ui.getActiveProject(),
      modal.dataset.currentTitle,
      dueDateInput.value
    );
    PM().changeTaskPriority(
      ui.getActiveProject(),
      modal.dataset.currentTitle,
      selectPriority.value
    );
    PM().changeTaskStatus(
      ui.getActiveProject(),
      modal.dataset.currentTitle,
      selectStatus.value
    );
    ui.renderTasks();
  });
  return modal;
}

function confirmRemoveTaskModal({ taskDiv, currentTitle }) {
  const body = document.querySelector("body");
  const modal = createEl("dialog", "confirm-remove-task-modal");
  const form = createEl("form", "confirm-form");
  modal.appendChild(form);
  body.appendChild(modal);

  const confirmText = createEl(
    "p",
    null,
    "confirm-text",
    `Remove [${currentTitle}] task?`
  );

  const confirmRemoveBtn = createEl(
    "button",
    "confirm-remove-button",
    null,
    "Yes"
  );

  confirmRemoveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    taskDiv.remove();
    PM().removeTask(ui.getActiveProject(), currentTitle);
    ui.renderTasks();
    modal.close();
  });

  const closeModalBtn = createEl("button", null, "close-modal-button", "✖");

  form.appendChild(confirmText);
  form.appendChild(confirmRemoveBtn);
  modal.appendChild(closeModalBtn);

  return modal;
}

function reapplyListeners() {
  const newTaskBtn = document.querySelector(".add-new-task-button");
  const newProjectBtn = document.querySelector(".add-new-project-button");
  const taskModal = document.querySelector("#task-modal");
  const projectModal = document.querySelector("#project-modal");

  const tasksDiv = document.querySelectorAll(".task-main");
  const projectDivs = document.querySelectorAll(".project-div");

  newTaskBtn.addEventListener("click", () => {
    const tentativeDueDate = addDays(new Date(), 1);
    const formattedDate = format(tentativeDueDate, "yyyy-MM-dd");
    document.querySelector("#task-title").value = "";
    document.querySelector("#task-description").value = "";
    document.querySelector("#task-due-date").value = formattedDate;
    document.querySelector("#task-priority").value = "Low";
    document.querySelector("#task-status").value = "Not started";
    taskModal.showModal();
  });

  tasksDiv.forEach((task) => {
    task.addEventListener("click", (e) => {
      const taskDiv = e.target.closest(".task-main");
      const taskDetails = captureTaskDetails(taskDiv);
      console.log("Task div:", taskDiv, ", Clicked element:", e.target);
      if (e.target.matches(".remove-task-button")) {
        confirmRemoveTaskModal(taskDetails).showModal();
      } else {
        openEditTaskModal(taskDetails);
      }
    });
  });

  newProjectBtn.addEventListener("click", () => {
    projectModal.showModal();
  });

  projectDivs.forEach((div) => {
    div.addEventListener("click", (e) => {
      const projectDiv = e.target.closest(".project-div");
      const newProject = projectDiv.dataset.project;
      if (newProject !== ui.getActiveProject()) {
        ui.setActiveProject(newProject);
        console.log("Active project: ", ui.getActiveProject());
        ui.renderTasks();
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (e.target.matches(".close-modal-button")) {
      const modal = e.target.closest("dialog");
      if (modal && modal.id === "confirm-remove-task-modal") {
        modal.close();
        modal.remove();
      } else {
        modal.close();
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
  newTaskModal,
  captureTaskDetails,
  openEditTaskModal,
  editTaskModal,
  confirmRemoveTaskModal,
  reapplyListeners,
};
