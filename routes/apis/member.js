const express = require('express');
const router = express.Router();
const members = require('../../members');
const uuid = require('uuid');


// get single member
router.get('/:id', (req, res) => {
  const isFound = members.some(member => member.id === parseInt(req.params.id));
  // res.json(members.filter(member => member.id === parseInt(req.params.id)))
  if (isFound) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)))
  } else {
    res.status(400).json({
      msg: `no member found with ${req.params.id}`
    })
  }
})


// create Member

router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  }

  if(!newMember.name && !newMember.email) {
    res.status(400).json({ msg: `please include name and email`})
  }
  members.push(newMember);
  // res.json(members);
  res.redirect('/')
})

// update member

router.put('/:id', (req, res) => {
  const isFound = members.some(member => member.id === parseInt(req.params.id))
  if (isFound) {
    const updatedMember = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updatedMember.name ? updatedMember.name : member.name;
        member.email = updatedMember.email ? updatedMember.email : member.email;
        res.json({ msg: `Member added`, member });
      }
    });
  } else {
    res.status(400).json({ msg: `no member found with id` });
  }
})

// delet member

router.delete('/:id', (req, res) => {
  const isFound = members.some(member => member.id === parseInt(req.params.id))
  if (isFound) {
    res.json({ msg: `member deleted`, members: members.filter(member => member.id !== parseInt(req.params.id))})
  } else {
    res.status(400).json({ msg: `no member found with id` });
  }
})


module.exports = router;