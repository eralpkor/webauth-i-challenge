
const db = require('../../data/db-config.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  findByUsername,
};

function add(user) {
  return db('users')
    .insert(user, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function find() {
  return db('users');
}

function findBy(here) {
  return db('users').where(here);
}

function findByUsername(username) {
  return findBy({ username }).first();
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}