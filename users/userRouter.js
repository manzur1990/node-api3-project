const express = require('express');

const router = express.Router();

const users = require('./userDb')
const posts = require('../posts/postDb')

router.post('/', (req, res) => {
  // do your magic!
  users.insert(req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: 'Internal error, unable to process request',
      })
    })

});

router.post('/:id/posts', validateUser, validateUserId, (req, res) => {
  // do your magic!
  const user = { user_id: req.params.id, ...req.body }
  posts.insert(user)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: 'Internal error, unable to process request',
      })
    })
});

router.get('/', (req, res) => {
  // do your magic!
  users.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Internal error, unable to process requests',
      });
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  users.getById(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        error: 'Internal error, unable to process request.',
      })
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        error: 'Internal error, unable to process request.',
      })
    })
});

router.delete('/:id', validateUserId,(req, res) => {
  // do your magic!
  users.getById(req.params.id).then(user => {
    res.status(200).json(user)
  })
  users.remove(req.params.id).catch(error => {
    console.log(error)
    res.status(500).json({
      error: 'The user could not be removed',
    })
  })
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  users.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        error: 'Internal error, unable to process request.',
      })
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  users.getById(req.params.id).then(user => {
    if (!user) {
      res.status(404).json({ message: 'invalid user id' })
    } else {
      req.user = user
      next()
    }
  })
}

function validateUser(req, res, next) {
  // do your magic!
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: 'user information required' })
  } else if (!req.body.name) {
    res.status(400).json({ message: 'missing required name field' })
  } else if (req.body) {
    return next()
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: 'missing post data' })
  } else if (!req.body.text) {
    res.status(400).json({ message: 'missing required text field' })
  } else if (req.body) {
    return next()
  }
}

module.exports = router;
