import "./styles.css";
import ProjectManager from "./projectmanager.js";

console.log("Welcome to get it done!");

const gidPM = ProjectManager();

gidPM.addNewProject("not-home", "yellow");

const notHome = gidPM.getProject("not-home");
console.log(notHome.toString());
notHome.addTask({
  title: "This must be done",
  description: "You have to do this",
  date: "2025-03-15",
  priority: "High",
  status: "pending"
})
console.log(notHome.toString());
console.log(gidPM.getProject("not-home"));

gidPM.addNewProject("taskify", "orangered");
const taskify = gidPM.getProject("taskify");
taskify.addTask({
  title: "this is the title",
  description: "this is the verb to be done",
  date: "2025-03-27",
  priority: "Medium",
  status: "pending"
});

console.log(gidPM.allProjectString());