import ProjectManager from "./projectmanager.js";
import UI from "./ui.js";

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

function buttonHandler(e) {
  if (e.target.classList.contains("")||e.target.classList.contains("")) {
    
  } else if (e.target.classList.contains("")) {
    
  } else if (e.target.classList.contains("")) {
    
  }
}

export { getImages, createEl, buttonHandler };
