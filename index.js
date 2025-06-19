const express = require('express');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(express.json());

// Simple test route
app.get('/', (req, res) => {
  res.send('Welcome to Task Manager API');
});

// Get all tasks
app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error fetching tasks');
    }
    res.json(results);
  });
});

// Add a task
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  db.query('INSERT INTO tasks (title) VALUES (?)', [title], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error adding task');
    }
    res.send('Task added successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const sql = 'DELETE FROM tasks WHERE id = ?';
  db.query(sql, [taskId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error deleting task');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Task not found');
    }
    res.send('Task deleted successfully');
  });
});