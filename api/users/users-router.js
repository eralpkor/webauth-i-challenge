const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('./users-model.js');

// login /api/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
})

// POST /api/register
router.post('/register', (req, res) => {
  const { user } = req.body;

  if (user.username && user.password) {
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    Users.add(user)
      .then(save => {
        res.status(201).json(save)
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'There was an error...'})
      })
  } else {
    res.status(400).json({ message: 'Please add info...'});
  }
});

module.exports = router;