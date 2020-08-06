const express = require('express');
const postsRouter = require('./posts/postRouter')
const usersRouter = require('./users/userRouter')


const server = express();

server.use(express.json())
server.use('/api/posts', logger, postsRouter)
server.use('/api/users', logger, usersRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


//custom middleware
function logger(req, res, next) {
  const date = new Date().toString() 
  console.log(`${req.method} request at ${req.originalUrl} on ${date}`)
  next()
 }
 

module.exports = server;
