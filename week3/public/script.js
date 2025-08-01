document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
  fetch('/tasks')
    .then(res => res.json())
    .then(tasks => {
      const list = document.getElementById('taskList');
      list.innerHTML = '';
      tasks.forEach(task => {
        list.innerHTML += `<li class="collection-item">
          <strong>${task.name}</strong> - <em>${task.status}</em>
        </li>`;
      });
    });
}

document.getElementById('addTaskBtn').addEventListener('click', () => {
  const taskInput = document.getElementById('taskInput');
  if (taskInput.value.trim() !== "") {
    fetch('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: taskInput.value })
    }).then(() => {
      taskInput.value = '';
      loadTasks();
    });
  }
});
