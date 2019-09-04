const express = require('express');

const server = express();

function logger(req, res, next) {
  console.log(`${req.method} to ${req.url} at [${new Date().toISOString()}] `)

  next()
}

function validateUserId(req, res, next) {
  if(userId) {
    userId = req.user
  } else {
    res.status(400).json({ message: "invalid user id" })
  }

  next()
}

server.use(express.json())
server.use(logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware


module.exports = server;
