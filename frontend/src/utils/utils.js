export const selectHandler = (e, set) => {
  set(e.target.value);
  if (e.target.value.length === 0) {
    e.target.classList.add("error");
  } else {
    e.target.classList.remove("error");
  }
};

export const createYearArray = () => {
  const yearArray = [];
  for (let i = 1980; i <= 2023; i++) {
    yearArray.push(i);
  }
  return yearArray;
};
