// task/router.js
const express = require('express');
const Tasks = require('./model')
const router = express.Router();

router.get('/', (req, res) => {
  Tasks.findTasks()
    .then(tasks => {
      res.status(200).json(tasks);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to retrieve tasks' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Tasks.findTasksById(id)
    .then(task => {
      res.status(200).json(task);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to retrieve the task' });
    });
});

router.post('/', (req, res) => {
  const task = req.body;

  if (!task.task_description) { // Assuming task_description is required
    return res.status(400).json({ message: 'Task description is required' });
  }

  Tasks.addTask(task)
    .then(newTask => {
      newTask.task_completed = Boolean(newTask.task_completed);
      res.status(201).json(newTask);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to create new task' });
    });
});


router.put('/:id', (req, res) => {
  const { id } = req.params;
  const task = req.body;
  Tasks.updateTask(id, task)
    .then(count => {
      res.status(200).json({ message: `${count} task(s) updated` });
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to update task' });
    });
});
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Tasks.deleteTask(id)
    .then(count => {
      res.status(200).json({ message: `${count} task(s) deleted` });
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete task' });
    });
});








module.exports = router;
