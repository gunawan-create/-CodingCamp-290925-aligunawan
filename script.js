const taskInput = document.getElementById("taskInput");
const dueDateInput = document.getElementById("dueDateInput");
const addBtn = document.getElementById("addBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const filterBtn = document.getElementById("filterBtn");
const taskList = document.getElementById("taskList");

let tasks = [];

function renderTasks(filter = false) {
  taskList.innerHTML = "";

  let filteredTasks = filter ? tasks.filter(t => !t.completed) : tasks;

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `<tr><td colspan="4">No task found</td></tr>`;
    return;
  }

  filteredTasks.forEach((task, index) => {
    let row = document.createElement("tr");

    row.innerHTML = `
      <td>${task.name}</td>
      <td>${task.dueDate || "-"}</td>
      <td>${task.completed ? "Done" : "Pending"}</td>
      <td>
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="deleteTask(${index})">❌</button>
      </td>
    `;

    taskList.appendChild(row);
  });
}

function addTask() {
  const taskName = taskInput.value.trim();
  const dueDate = dueDateInput.value;

  if (taskName === "") return;

  tasks.push({
    name: taskName,
    dueDate: dueDate,
    completed: false,
  });

  taskInput.value = "";
  dueDateInput.value = "";

  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function deleteAll() {
  tasks = [];
  renderTasks();
}

addBtn.addEventListener("click", addTask);
deleteAllBtn.addEventListener("click", deleteAll);
filterBtn.addEventListener("click", () => renderTasks(true));

renderTasks();
