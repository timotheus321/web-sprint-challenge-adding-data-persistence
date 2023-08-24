// resource/router.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Resource endpoint' });
});

// You can add more endpoints here for managing resources, etc.

module.exports = router;
