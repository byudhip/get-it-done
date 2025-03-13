import Project from "./project.js";

function ProjectManager() {
  const projects = [];
  const addNewProject = (name, color) => {
    const newProject = Project(name, color);
    projects.push(newProject);
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
    return projects.splice(index, 1);
  };

  const allProjectString = () => {
    return projects.map((project) => project.toString()).join("\n");
  }
  return {
    addNewProject,
    getAllProjects,
    getProject,
    deleteProject,
    allProjectString,
  };
}

export default ProjectManager;
