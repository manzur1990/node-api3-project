const express = require('express');
const posts = require('./postDb')

const router = express.Router();


router.get('/', (req, res) => {
  // do your magic!
  posts.get(req.query)
  .then(posts => {res.status(200).json({posts})})
  .catch(error => {
    console.log(error)
    res.status(500).json({
      error: 'The information could not be retrieved.'
    })
  })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  posts.getById(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        error: 'The information could not be retrieved.',
      })
    })
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  posts.getById(req.params.id)
  .then(posts => { res.status(201).json(posts)})
  
  posts.remove(req.params.id)

  .catch(error => {
    console.log(error)
    res.status(500).json({error: 'post was not deleted'})
  })
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  posts.update(req.params.id, req.body)
  .then(post => {
    res.status(202).json(post)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({
      error: 'The information was not retrieved',
    })
})
  
});

// custom middleware
function validatePostId(req, res, next) {
  // do your magic!
  posts.getById(req.params.id).then(post =>{
    if (!post) {
      res.status(404).jason({error_message: 'Post not found'})
    } else {
      post = res.post
      next()
    }
  })
}

module.exports = router;
