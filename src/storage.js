const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const loadFromStorage = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

export { saveToStorage, loadFromStorage };
