import PM from "./projectmanager.js";
import * as utils from "./utils.js";

const assets = utils.getImages(
  require.context("./assets", false, /\.(png|jpe?g|svg)$/)
);

function UI() {
  const pm = PM();
  const defBlack = "rgba(0, 0, 0, 0.9)";
  const initUI = () => {
    const body = document.querySelector("body");
    const container = utils.createEl("div", "container");
    body.appendChild(container);

    const headerDiv = utils.createEl("div", "header");
    headerDiv.style.backgroundColor = defBlack;
    const logo = utils.createEl("img", "logo");
    
    logo.src = assets["getitdone-logo.svg"];
    logo.setAttribute("style", "filter: invert(1); opacity: 0.1;");
    headerDiv.appendChild(logo);
    container.appendChild(headerDiv);

    const projectsDiv = utils.createEl("div", "projects", null, "project here");
    projectsDiv.style.backgroundColor = defBlack;
    container.appendChild(projectsDiv);

    const tasksDiv = utils.createEl("div", "tasks", null, "task here");
    tasksDiv.style.backgroundColor = defBlack;
    container.appendChild(tasksDiv);

    const dueDiv = utils.createEl("div", "due-dates", null, "due date here");
    dueDiv.style.backgroundColor = defBlack;
    container.appendChild(dueDiv);
  }
  initUI();
  return {};
}

export default UI;