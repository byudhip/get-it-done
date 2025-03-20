function Project(name, color, initialTasks = {}) {
  const tasks = { ...initialTasks };

  const getName = () => name;
  const getColor = () => color;
  const getTasks = () => tasks;

  const setName = (newName) => {
    name = newName;
  };
  const setColor = (newColor) => {
    color = newColor;
  };

  const addTask = (taskDetails) => {
    console.log("Adding task: ", taskDetails);

    tasks[taskDetails.title] = { ...taskDetails };
    console.log("Current task: ", tasks);
  };

  const setTitle = (taskTitle, newTitle) => {
    console.log(`Changing [${taskTitle}] task title to [${newTitle}]`);
    if (!tasks[taskTitle]) {
      console.log("No such task!");
      return;
    }
    const task = tasks[taskTitle];
    delete tasks[taskTitle];
    task.title = newTitle;
    tasks[newTitle] = task;
  };

  const setDescription = (taskTitle, newDesc) => {
    if (!tasks[taskTitle]) {
      console.log("No such task!");
      return;
    }
    tasks[taskTitle].description = newDesc;
    console.log(`Task [${taskTitle}]'s description updated`);
  };

  const setDueDate = (taskTitle, newDate) => {
    if (!tasks[taskTitle]) {
      console.log("No such task!");
      return;
    }
    tasks[taskTitle].dueDate = newDate;
  };

  const setPriority = (taskTitle, newPriority) => {
    console.log(`Changing "${taskTitle}" priority to "${newPriority}"`);
    if (!tasks[taskTitle]) {
      console.log("No such task!");
      return;
    }
    tasks[taskTitle].priority = newPriority;
  };

  const setStatus = (taskTitle, newStatus) => {
    if (!tasks[taskTitle]) {
      console.log("No such task!");
      return;
    }
    tasks[title].status = newStatus;
  };

  const removeTask = (taskTitle) => {
    if (!tasks[taskTitle]) {
      console.log("No such task!");
      return;
    }
    delete tasks[taskTitle];
    console.log(`Task "${taskTitle}" removed`);
  };

  const toStr = () =>
    `Project: ${name}, Color: ${color}, Tasks:${JSON.stringify(tasks)}`;

  return {
    getName,
    getColor,
    getTasks,
    setName,
    setColor,
    setTitle,
    setDescription,
    setPriority,
    setDueDate,
    setStatus,
    addTask,
    removeTask,
    toStr,
  };
}

export default Project;
