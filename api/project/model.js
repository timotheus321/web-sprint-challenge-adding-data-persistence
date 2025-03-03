const db = require('../../data/dbConfig'); 

function findProjects() {
  return db('projects');
}

function addProject(project) {
    return db('projects').insert(project, 'project_id') 
      .then(ids => {
     
        const project_id = ids[0].project_id;

        return findProjects().where({ project_id }).first(); 
      })
      .then(newProject => {
        if (!newProject) {
          throw new Error("Project not found after insert");
        }
        return newProject;
      });
  }
  

module.exports = {
  findProjects,
  addProject,
};
