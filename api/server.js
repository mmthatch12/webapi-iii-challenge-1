const express = require('express');

console.log('environment', process.env.NODE_ENV)

const userRouter = require('../users/userRouter')
const postRouter = require('../posts/postRouter')

const server = express();

function logger(req, res, next) {
  console.log(`${req.method} to ${req.url} at [${new Date().toISOString()}] `)

  next()
}

server.use(express.json())
server.use(logger)

server.use('/users', userRouter)
server.use('/posts', postRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware! Try adding on /users or /posts to the url to start seeing some data!</h2>`)
});

//custom middleware


module.exports = server;
