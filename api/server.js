const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const UsersRouter = require('./users/users-router.js');


const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());




server.get('/', (req, res) => {
  res.send('<h1>Web Auth I Challenge</h1>');
});

server.use('/api', UsersRouter);


module.exports = server;