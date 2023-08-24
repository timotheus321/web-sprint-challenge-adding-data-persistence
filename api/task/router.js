// task/router.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Task endpoint' });
});

// You can add more endpoints here for creating, updating, deleting tasks, etc.

module.exports = router;
