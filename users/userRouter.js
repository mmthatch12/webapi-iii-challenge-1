const express = require('express');

const userDB = require('./userDb')

const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
    userDB.get()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ error: "Could not load users"})
        })
});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    if(userId) {
        userId = req.user
      } else {
        res.status(400).json({ message: "invalid user id" })
      }
    
      next();
};

function validateUser(req, res, next) {
    if(!req.body) {
        res.status(400).json({ message: "missing user data" })
      } else if (!req.body.name) {
        res.status(400).json({ message: "missing required name field" })
      } else {
        res.sent('User validated!')
      }
    
      next();
};

function validatePost(req, res, next) {
    if(!req.body) {
        res.status(400).json({ message: "missing post data" })
      } else if (!req.body.test) {
        res.status(400).json({ message: "missing required text field" })
      } else {
        res.sent('Post validated!')
      }
    
      next();
};

module.exports = router;
