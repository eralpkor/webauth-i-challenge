const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('./users-model.js');

// login /api/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    

    User.findBy({ username })
      .first()
      .then(user => {
        res.status(201).json(user)
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'That name is used...'})
      })
  } else {
    res.status(400).json({ message: 'Please add user & pass info...'});
  }
});

// POST /api/register
router.post('/register', (req, res) => {
  let { username, password } = req.body;

  if (username && password) {
    const hash = bcrypt.hashSync(password, 8);
    password = hash;

    User.add({ username, password })
      .then(user => {
        res.status(201).json(user)
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'That name is used...'})
      })
  } else {
    res.status(400).json({ message: 'Please add user & pass info...'});
  }
});

module.exports = router;