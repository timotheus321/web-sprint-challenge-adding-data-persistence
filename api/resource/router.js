// resource/router.js
const express = require('express');
const Resources = require('./model');
const router = express.Router();

router.get('/', (req, res) => {
    Resources.findResources()
      .then(resources => {
        res.status(200).json(resources);
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to retrieve resources' });
      });
  });
  router.get('/:id', (req, res) => {
    const { id } = req.params;
    Resources.findResourceById(id)
      .then(resource => {
        res.status(200).json(resource);
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to retrieve the resource' });
      });
  });
  router.post('/', (req, res) => {
    const resource = req.body;
    Resources.addResource(resource)
      .then(id => {
        Resources.findResourceById(id[0])
          .then(newResource => {
            res.status(201).json(newResource); 
          });
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to create new resource' });
      });
  });
  
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const resource = req.body;
    Resources.updateResource(id, resource)
      .then(count => {
        res.status(200).json({ message: `${count} resource(s) updated` });
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to update resource' });
      });
  });
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Resources.deleteResource(id)
      .then(count => {
        res.status(200).json({ message: `${count} resource(s) deleted` });
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to delete resource' });
      });
  });
  module.exports = router;

  