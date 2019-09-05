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

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;