import "./styles.css";

function Project() {
  const projects = [{ name: "Home", color: "black" }];
  const addNewProject = (name, color) => {
    projects.push({ name, color });
  };
  const getProject = (name) => projects.find(project => project.name === name) || console.log("no such project!");
  const getAllProjects = () => projects;

  const deleteProject = (name) => {
    const projectToDelete = name;
    const index = projects.findIndex((project) => project.name === projectToDelete);
    return projects.splice(index, 1);
  }
  return { addNewProject, getProject, getAllProjects, deleteProject };
}

console.log("Welcome to get it done!");

const testProj = Project();
testProj.addNewProject("not-home", "yellow");
testProj.addNewProject("need-whaat", "blue");
testProj.addNewProject("do-shi", "purple");

console.log(testProj.getAllProjects());
console.log(testProj.getProject("do-shi"));
console.log(testProj.deleteProject("Home"));
console.log(testProj.getAllProjects());
