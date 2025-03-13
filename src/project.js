function Project(name, color) {
  const tasks = {};

  const getName = () => name;
  const getColor = () => color;
  const getTasks = () => tasks;

  const addTask = (taskDetails) => {
    tasks[taskDetails.title] = taskDetails;
  };

  const toString = () =>
    `Project: ${name}, Color: ${color}, Tasks:${JSON.stringify(tasks)}`;
  return { getName, getColor, getTasks, addTask, toString };
}

export default Project;
