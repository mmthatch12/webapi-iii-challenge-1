const express = require('express');

const router = express.Router();

const postDB = require('./postDb')

router.get('/', (req, res) => {
    postDB.get()
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: "Could not get posts" })
        })
});

router.get('/:id', validatePostId, (req, res) => {
    const id = req.params.id

    postDB.getById(id)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: "Could not get post data"})
        })

});

router.delete('/:id', validatePostId, (req, res) => {
    const id = req.params.id
    postDB.remove(id)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: "Could not delete post data"})
        })

});

router.put('/:id', validatePostId, (req, res) => {
    const postBody = req.body
    const id  = req.params.id

    postDB.update(id, postBody)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: "Could not update post data"})
        })

});

// custom middleware

function validatePostId(req, res, next) {
    const id = req.params.id

    postDB.getById(id)
        .then(post => {
            if(post) {
                req.post = req.body
            } else {
                res.status(400).json({ message: "invalid post id" })
              }
        })

      next();

};

module.exports = router;