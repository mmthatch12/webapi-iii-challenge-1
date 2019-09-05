const express = require('express');

console.log('environment', process.env.NODE_ENV)

const userRouter = require('../users/userRouter')

const server = express();

function logger(req, res, next) {
  console.log(`${req.method} to ${req.url} at [${new Date().toISOString()}] `)

  next()
}

server.use(express.json())
server.use(logger)

server.use('/users', userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware


module.exports = server;
