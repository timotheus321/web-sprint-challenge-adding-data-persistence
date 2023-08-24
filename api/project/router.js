const express = require('express');
const Projects = require('./model'); 

const router = express.Router();

router.get('/', (req, res) => {
  Projects.findProjects()
    .then(projects => {
      projects.forEach(project => {
        project.project_completed = project.project_completed === 1; 
      });
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to retrieve projects' });
    });
});


router.post('/', (req, res) => {
  const project = req.body;


  if (!project.project_name) {
    return res.status(400).json({ message: 'Project name is required' });
  }

  Projects.addProject(project)
    .then(newProject => {

      newProject.project_completed = Boolean(newProject.project_completed);
      res.status(201).json(newProject);
    })
    .catch(err => {

      res.status(500).json({ message: 'Failed to create new project' });
    });
});


module.exports = router;
