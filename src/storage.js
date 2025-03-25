const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const loadFromStorage = (key) => {
  const data = JSON.parse(localStorage.getItem(key)) || [];
  console.log(`Loading from storage (${key}):`, data);
  return data;
};

export { saveToStorage, loadFromStorage };
