import Project from "./project.js";
import { saveToStorage, loadFromStorage } from "./storage.js";
import { addDays } from "date-fns";

function ProjectManager() {
  const storageKey = "projects";
  const activeProjectKey = "activeProject";
  let activeProject = loadFromStorage(activeProjectKey) || projects[0].getName(); // to prevent activeProject from resetting
  const projects = loadFromStorage(storageKey).map((p) =>
    Project(p.name, p.tasks)
  );

  const saveProjects = () => {
    const plainProjects = projects.map((p) => ({
      name: p.getName(),
      tasks: p.getTasks(),
    }));
    saveToStorage(activeProjectKey, activeProject);
    saveToStorage(storageKey, plainProjects);
  };

  const addNewProject = (name) => {
    for (let project of projects) {
      if (project.getName() === name) {
        console.log("project name exists!");
        return;
      }
    }
    const newProject = Project(name, {});
    projects.push(newProject);
    saveProjects();
  };

  const renameProject = (name, newName) => {
    console.log(
      "current projects: ",
      projects.map((p) => p.getName())
    );
    console.log("Looking for project: ", name);
    const projectIndex = projects.findIndex((p) => p.getName() === name);

    if (projectIndex === -1) {
      console.log("No such project!");
      return;
    }
    if (
      projects.some((p) => {
        p.getName() === newName;
      })
    ) {
      console.warn(`Project name [${newName}] already exists!`);
      return;
    }
    projects.push(Project(newName, projects[projectIndex].getTasks()));
    console.log(`Renamed project: ${name} => ${newName}`);
    console.log(
      "After renaming:",
      projects.map((p) => p.getName())
    );
    saveProjects();
  };

  const getAllProjects = () => projects;

  const getProject = (name) => {
    const project = projects.find((project) => project.getName() === name);
    if (!project) {
      console.log("No such project!");
      return null;
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
  };
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

  const setActiveProject = (newProject) => {
    console.trace(`Switching active project to ${newProject}`);
    console.log(
      "Current projects: ",
      projects.map((p) => p.getName())
    );
    const projectDivs = document.querySelectorAll(".project-div");
    projectDivs.forEach((project) => {
      project.classList.remove("active");
    });

    const projectNames = projects.map((p) => p.getName());
    if (projectNames.includes(newProject)) {
      activeProject = newProject;
      saveProjects(); // save activeProject value to localStorage for later use
    } else {
      console.warn(
        `Project "${newProject}" does not exist! Keeping current project.`
      );
      return;
    }

    const newActiveProject = document.querySelector(
      `[data-project="${activeProject}"]`
    );
    if (newActiveProject) {
      newActiveProject.classList.add("active");
    } else {
      console.warn(`Project ${activeProject} not found in UI!`);
    }
  };
  const getActiveProject = () => {
    
    console.trace("getActiveProject() called. Current:", activeProject);
    const projectNames = projects.map((p) => p.getName());
    console.log("Available projects:", projectNames);
    if (!projectNames.includes(activeProject)) {
      console.log(`Active project [${activeProject}] not found`)
    }
    return projectNames.includes(activeProject)
      ? activeProject
      : projects[0].getName();
  };

  const setActiveProjectToDefault = () => {
    activeProject = projects.length > 0 ? projects[0].getName() : null;
    const newActiveProject = document.querySelector(
      `[data-project="${activeProject}"]`
    );
    newActiveProject.classList.add("active");
  };
  const setActiveProjectToNew = () => {
    activeProject =
      projects.length > 0 ? projects[projects.length - 1].getName() : null;
    const newActiveProject = document.querySelector(
      `[data-project="${activeProject}"]`
    );
    newActiveProject.classList.add("active");
  };
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
    setActiveProject,
    getActiveProject,
    setActiveProjectToDefault,
    setActiveProjectToNew,
    allProjectsStr,
  };
}

export default ProjectManager;
