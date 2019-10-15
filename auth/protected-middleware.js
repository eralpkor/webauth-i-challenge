const bcrypt = require('bcryptjs');

const Users = require('../api/users/users-model');

function restrict(req, res, next) {
  const { username, password } = req.headers;

  Users.findByUsername(username)
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        next();
      } else {
        res.status(403).json({ message: 'You cannot pass!!'})
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}

module.exports = restrict;