const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('./users-model.js');

// login /api/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    Users.findByUsername(username)
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          res.status(200).json(`Welcome back ${username} you're logged in!`)
        } else {
          res.status(401).json({ message: 'You cannot pass!!'})
        }
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

    Users.add({ username, password })
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