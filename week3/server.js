const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

let tasks = [
  { id: 1, name: "Complete SIT725 Task 3.2P", status: "Pending" },
  { id: 2, name: "SIT725 4.1P", status: "In Progress" }
];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const newTask = { id: tasks.length + 1, name: req.body.name, status: "Pending" };
  tasks.push(newTask);
  res.json(newTask);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
