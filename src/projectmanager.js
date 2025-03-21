import Project from "./project.js";
import { saveToStorage, loadFromStorage } from "./storage.js";
import { addDays } from "date-fns";

function ProjectManager() {
  const storageKey = "projects";

  const projects = loadFromStorage(storageKey).map((p) => p.name ? Project(p.name, p.tasks) : p);
  console.log("Projects after loading:", projects);

  const saveProjects = () => {
    const plainProjects = projects.map(p => ({
      name: p.getName(),
      tasks: p.getTasks(),
    }));
    saveToStorage(storageKey, plainProjects)};
  

  const addNewProject = (name) => {
    for (let project of projects) {
      if (project.getName() === name) {
        console.log("project name exists!");
        return;
      }
    }
    const newProject = Project(name);
    projects.push(newProject);
    saveProjects();
  };

  const renameProject = (name, newName) => {
    const project = getProject(name);
    if (!project) {
      console.log("No such project!");
      return;
    }
    project.setName(newName);
    saveProjects();
  };

  const getAllProjects = () => projects;

  const getProject = (name) => {
    const project = projects.find((project) => project.getName() === name);
    if (!project) {
      console.log("No such project!");
      return;
    }
    return project;
  };

  const deleteProject = (name) => {
    const index = projects.findIndex((project) => project.getName() === name);
    if (index === -1) {
      console.log("No such project!");
      return;
    }
    projects.splice(index, 1);
    saveProjects();
  };

  const allProjectsStr = () => {
    return projects.map((project) => project.toStr()).join("\n");
  };

  const newTask = (projectName, ...taskDetails) => {
    const project = getProject(projectName);
    project.addTask(...taskDetails);
    saveProjects();
  };

  const removeTask = (projectName, taskTitle) => {
    const project = getProject(projectName);
    project.removeTask(taskTitle);
    saveProjects();
  };

  const changeTaskTitle = (projectName, taskTitle, newTitle) => {
    const project = getProject(projectName);
    project.setTitle(taskTitle, newTitle);
    saveProjects();
  };

  const changeTaskDescription = (projectName, taskTitle, newDesc) => {
    const project = getProject(projectName);
    project.setDescription(taskTitle, newDesc);
  };

  const changeTaskDueDate = (projectName, taskTitle, newDate) => {
    const project = getProject(projectName);
    project.setDueDate(taskTitle, newDate);
  };

  const changeTaskPriority = (projectName, taskTitle, newPriority) => {
    const project = getProject(projectName);
    project.setPriority(taskTitle, newPriority);
    saveProjects();
  };

  const changeTaskStatus = (projectName, taskTitle, newPriority) => {
    const project = getProject(projectName);
    project.setPriority(taskTitle, newPriority);
  }
  if (projects.length === 0) {
    addNewProject("Home");
    const dueDate = addDays(new Date(), 7);
    newTask("Home", {
      title: "Welcome to Get it Done!",
      description: "We will help you manage your projects and their tasks!",
      dueDate: dueDate,
      priority: "High",
      status: "Ongoing",
    });
  }
  return {
    saveProjects,
    addNewProject,
    renameProject,
    getAllProjects,
    getProject,
    deleteProject,
    newTask,
    removeTask,
    changeTaskTitle,
    changeTaskDescription,
    changeTaskDueDate,
    changeTaskPriority,
    changeTaskStatus,
    allProjectsStr,
  };
}

export default ProjectManager;
