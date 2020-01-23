const express = require('express');
const router = express.Router();
const members = require('../../members');


// get all members

router.get('/', (req, res) => {
  res.json(members);
})

module.exports = router;