const express = require("express");
const server = express();
const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);
const db = require("../data/config");

const UsersRouter = require("../users/users-router");

server.use(express.json());
server.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "this is a secret message, keep it safe",
    store: new knexSessionStore({
      knex: db,
      createtable: true,
    }),
  })
);

server.use("/api", UsersRouter);

module.exports = server;
