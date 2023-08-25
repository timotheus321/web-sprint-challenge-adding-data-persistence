// build your `Task` model here
const db = require('../../data/dbConfig')

function findTasks() {
    return db('tasks')
      .select('task_id', 'task_description', 'task_notes', 'task_completed')
      .join('projects', 'tasks.project_id', '=', 'projects.project_id')
      .select('projects.project_name', 'projects.project_description')
      .then(tasks => tasks.map(task => ({
        ...task,
        task_completed: Boolean(task.task_completed),
      })));
  }
  

function findTasksById(id) {
    return db('tasks').where({ task_id: id }).first();
}

function addTask(task) {
    return db('tasks').insert(task)
      .then(([id]) => findTasksById(id))
  }
  

function updateTask(id, task) {
    return db('tasks').where({ task_id: id}).update(task)
}

function deleteTask(id) {
    return db('tasks').where({ task_id: id }).del()
}

module.exports = {
    findTasks,
    findTasksById,
    addTask,
    updateTask,
    deleteTask,
}