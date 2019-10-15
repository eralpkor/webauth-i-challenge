const bcrypt = require('bcryptjs');


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'eralp', password: bcrypt.hashSync('password', 8)},
        {username: 'norman', password: bcrypt.hashSync('password', 8)},
        {username: 'sunny', password: bcrypt.hashSync('password', 8)}
      ]);
    });
};
