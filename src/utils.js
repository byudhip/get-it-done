import PM from "./projectmanager.js";
import { UIColor, UI } from "./ui.js";

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
  const statusOptions = ["Not started", "Ongoing", "Roadblocked"];

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
    
  })

  const closeModalBtn = createEl("button", "close-modal-button", null, "X");
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

function buttonHandler(e) {
  if (e.target.classList.contains("") || e.target.classList.contains("")) {
  } else if (e.target.classList.contains("")) {
  } else if (e.target.classList.contains("")) {
  }
}

export {
  getImages,
  createEl,
  addBtn,
  taskMaker,
  taskDetailsDivider,
  newTaskModal,
  addRightBorder,
  buttonHandler,
};
