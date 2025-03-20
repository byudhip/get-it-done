import PM from "./projectmanager.js";
import { UIColor, UI } from "./ui.js";
import { format, parse, parseISO } from "date-fns";

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

function addBtn(element, className, fontColor) {
  const button = createEl(
    "button",
    null,
    className,
    `${className === "add-new-task" ? "New Task" : " New Project"}`
  );
  button.style.width = "100%";
  button.style.padding = "5px";
  button.style.marginTop = "5px";
  button.style.backgroundColor = "transparent";
  button.style.color = fontColor;
  element.appendChild(button);
}

function addRightBorder(element, gradient1, gradient2) {
  element.style.position = "relative";

  let border = createEl("div");
  border.style.position = "absolute";
  border.style.top = "0%";
  border.style.bottom = "1%";
  border.style.right = "0";
  border.style.width = "1px";
  border.style.background = `linear-gradient(to bottom, ${gradient1}, ${gradient2})`;

  element.appendChild(border);
}

function taskMaker(element) {
  const taskMain = createEl("div", null, "task-main");
  taskMain.style.position = "relative";
  taskMain.style.zIndex = "0";

  element.appendChild(taskMain);

  return taskMain;
}

function taskDetailsDivider(element, gradient1, gradient2) {
  element.style.position = "relative";

  let border = createEl("div");
  border.style.position = "absolute";
  border.style.left = "0";
  border.style.bottom = "0";
  border.style.right = "0";
  border.style.height = "1px";
  border.style.background = `linear-gradient(to right, ${gradient1}, ${gradient2}`;

  element.appendChild(border);
}

function newTaskModal() {
  const body = document.querySelector("body");
  const modal = createEl("dialog", "task-modal");
  const form = createEl("form", "task-form");
  form.setAttribute("action", "");

  const titleLabel = createEl("label", null, null, "Title");
  titleLabel.setAttribute("for", "title");

  const titleInput = createEl("input", "title");
  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("max-length", "25");
  titleInput.setAttribute("placeholder", "Get Groceries");
  titleInput.required = true;

  titleLabel.appendChild(titleInput);

  const descriptionLabel = createEl("label", null, null, "Description");
  descriptionLabel.setAttribute("for", "description");

  const descriptionInput = createEl("textarea", "description");
  descriptionInput.setAttribute("max-length", "250");
  descriptionInput.setAttribute(
    "placeholder",
    "Buy 3 dozen eggs, 14 liters of milk, 4 lbs of ham..."
  );
  descriptionInput.required = true;

  descriptionLabel.appendChild(descriptionInput);

  const dueDateLabel = createEl("label", null, null, "Due Date");
  dueDateLabel.setAttribute("for", "due-date");

  const dueDateInput = createEl("input", "due-date"); //Can't use flatpickr if no input element
  dueDateInput.setAttribute("type", "date");

  dueDateInput.required = true;
  dueDateLabel.appendChild(dueDateInput);

  const priorityLabel = createEl("label", null, null, "Priority");
  priorityLabel.setAttribute("for", "priority");

  const selectPriority = createEl("select", "priority");
  const priorityOptions = ["High", "Medium", "Low"];

  for (let option of priorityOptions) {
    const choice = createEl("option");
    choice.value = option;
    choice.textContent = option;
    selectPriority.appendChild(choice);
  }

  priorityLabel.appendChild(selectPriority);

  const statusLabel = createEl("label", null, null, "Status");
  statusLabel.setAttribute("for", "status");

  const selectStatus = createEl("select", "status");
  const statusOptions = ["Not started", "Ongoing", "Roadblocked", "Finished"];

  for (let option of statusOptions) {
    const choice = createEl("option");
    choice.value = option;
    choice.textContent = option;
    selectStatus.appendChild(choice);
  }

  statusLabel.appendChild(selectStatus);

  const saveTaskBtn = createEl("button", "save-task-button", null, "Save");
  saveTaskBtn.style.color = UIColor().getBlackUIFontColor();
  saveTaskBtn.addEventListener("click", () => {
    PM().newTask(UI.getActiveProject(), {
      title: titleInput.value,
      description: descriptionInput.value,
      dueDate: dueDateInput.value,
      priority: selectPriority.value,
      status: selectStatus.value,
    });
    UI.renderDefaultTasks();
  });

  const closeModalBtn = createEl("button", "close-modal-button", null, "✖");
  closeModalBtn.style.color = UIColor().getBlackUIFontColor();
  closeModalBtn.addEventListener("click", () => {
    document.querySelector("#task-modal").close();
  });

  form.appendChild(titleLabel);
  form.appendChild(descriptionLabel);
  form.appendChild(dueDateLabel);
  form.appendChild(priorityLabel);
  form.appendChild(statusLabel);
  form.appendChild(saveTaskBtn);

  form.appendChild(closeModalBtn);

  modal.appendChild(form);
  body.appendChild(modal);

  const labels = document.querySelectorAll("label");
  for (let label of labels) {
    label.style.color = UIColor().getBlackUIFontColor();
  }
  return modal;
}

function captureDetails(taskDiv) {
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

  modal.querySelector("#title").value = currentTitle;
  modal.querySelector("#description").value = currentDescription;
  modal.querySelector("#due-date").value = currentDueDate;
  modal.querySelector("#priority").value = currentPriority;
  modal.querySelector("#status").value = currentStatus;

  modal.dataset.currentTitle = currentTitle;

  modal.style.display = "block";
}

function editTaskModal() {
  const modal = document.querySelector("#task-modal");
  const titleInput = document.querySelector("#title");
  const descriptionInput = document.querySelector("#description");
  const dueDateInput = document.querySelector("#due-date");
  const selectPriority = document.querySelector("#priority");
  const selectStatus = document.querySelector("#status");
  const saveTaskBtn = document.querySelector("#save-task-button");
  saveTaskBtn.addEventListener("click", () => {
    PM().changeTaskTitle(
      UI.getActiveProject(),
      modal.dataset.currentTitle,
      titleInput.value
    );
    PM().changeTaskDescription(
      UI.getActiveProject(),
      modal.dataset.currentTitle,
      descriptionInput.value
    );
    PM().changeTaskDueDate(
      UI.getActiveProject(),
      modal.dataset.currentTitle,
      dueDateInput.value
    );
    PM().changeTaskPriority(
      UI.getActiveProject(),
      modal.dataset.currentTitle,
      selectPriority.value
    );
    PM().changeTaskStatus(
      UI.getActiveProject(),
      modal.dataset.currentTitle,
      selectStatus.value
    );
    UI.renderDefaultTasks();
  });

  const closeModalBtn = document.querySelector("#close-modal-button");
  closeModalBtn.style.color = UIColor().getBlackUIFontColor();
  closeModalBtn.addEventListener("click", () => {
    document.querySelector("#task-modal").close();
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
  confirmText.style.color = UIColor().getBlackUIFontColor();
  const confirmRemoveBtn = createEl(
    "button",
    "confirm-remove-button",
    null,
    "Yes"
  );
  confirmRemoveBtn.style.color = UIColor().getBlackUIFontColor();
  confirmRemoveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    taskDiv.remove();
    PM().removeTask(UI.getActiveProject(), currentTitle);
    UI.renderDefaultTasks();
    reapplyListeners(); 
    modal.close();
  });

  const closeModalBtn = createEl("button", "close-modal-button", null, "✖");
  closeModalBtn.style.color = UIColor().getBlackUIFontColor();
  closeModalBtn.addEventListener("click", () => {
    modal.close();
  });

  form.appendChild(confirmText);
  form.appendChild(confirmRemoveBtn);
  form.appendChild(closeModalBtn);

  return modal;
}

function reapplyListeners() {
  const newTaskBtn = document.querySelector(".add-new-task");
  const newProjectBtn = document.querySelector(".add-new-project");
  const taskModal = document.querySelector("#task-modal");
  const taskForm = document.querySelector("#task-form");
  // const projectModal = newProjectModal();

  const tasksDiv = document.querySelectorAll(".task-main");

  newTaskBtn.addEventListener("click", () => {
    taskModal.showModal();
  });

  tasksDiv.forEach((task) => {
    task.addEventListener("click", (e) => {
      const taskDiv = e.target.closest(".task-main");
      const taskDetails = captureDetails(taskDiv);
      console.log("Task div:", taskDiv, ", Clicked element:", e.target);
      if (e.target.matches(".remove-task-button")) {
        confirmRemoveTaskModal(taskDetails).showModal();
      } else {
        openEditTaskModal(taskDetails);
      }
    });
  });

  // newProjectBtn.addEventListener("click", () => {
  //   projectModal.showModal();
  // })
}

export {
  getImages,
  createEl,
  addBtn,
  taskMaker,
  taskDetailsDivider,
  addRightBorder,
  newTaskModal,
  captureDetails,
  openEditTaskModal,
  editTaskModal,
  confirmRemoveTaskModal,
};
