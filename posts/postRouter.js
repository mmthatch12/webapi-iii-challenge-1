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

router.get('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;