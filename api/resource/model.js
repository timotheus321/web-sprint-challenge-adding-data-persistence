const db = require('../../data/dbConfig'); 

function findResources() {
    return db('resources'); 
  }
  function findResourceById(id) {
    return db('resources').where({ resource_id: id }).first();
  }
  function addResource(resource) {
    return db('resources').insert(resource);
  }
  function updateResource(id, resource) {
    return db('resources').where({ resource_id: id }).update(resource);
  }
  
  function deleteResource(id) {
    return db('resources').where({ resource_id: id }).del();
  }
  module.exports = {
    findResources,
    findResourceById,
    addResource,
    updateResource,
    deleteResource,
  };
  