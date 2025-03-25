function Project(initialName, initialTasks = {}) {
  let name = initialName;
  const tasks = { ...initialTasks };

  const getName = () => name;
  const getTasks = () => tasks;

  const setName = (newName) => {
    name = newName;
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
    } else if (tasks[taskTitle].toLowerCase() === newTitle.toLowerCase()) {
      console.log("Duplicate task title!");
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
    getTasks,
    setName,
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
