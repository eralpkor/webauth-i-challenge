const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const db = require('../data/db-config.js');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const UsersRouter = require('./users/users-router.js');
const AuthRouter = require('../auth/auth-router.js');

const sessionConfig = {
  name: 'CookieForJonathan',// by default it is SID change it for security
  secret: process.env.SESSION_SECRET || 'it is a string', // use environmet variable
  cookie: {
    httpOnly: true, // JS cannot access cookies
    maxAge: 1000 * 60 * 60, // expiration time in milliceconds
    secure: process.env.NODE_ENV === 'production' ? true : false, // use cookie HTTPs only should be true in production
  },
  resave: false,
  saveUninitialized: true, // read about GDPR complience about cookies
  // change to use database the sessions
  store: new KnexSessionStore({
    knex: db,
    tablename: 'sessions',
    // sidfieldname: 'sessionid',
    createtable: true, // automatically create sessions table
    clearInterval: 1000 * 60 * 30, // delete expired sessions every 30 min.
  })
}

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.get('/', (req, res) => {
  res.send('<h1>Web Auth I Challenge</h1>');
});

server.use('/api', UsersRouter);
server.use('/api/auth', AuthRouter);
// server.use('/api/restricted', restrict, RestrictedRouter);


module.exports = server;