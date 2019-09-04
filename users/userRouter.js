const express = require('express');

const userDB = require('./userDb')
const postDB = require('../posts/postDb')

const router = express.Router();

router.post('/', validateUser, (req, res) => {
    const useradd = req.body

    userDB.insert(useradd)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(error => {
            res.status(500).json({ error: "Could not add user"})
        })
});


router.post('/:id/posts', validatePost, validateUserId,  (req, res) => {
    const useradd = req.body
    const id = req.params.id

    userDB.getById(id)
        .then(user => {
            postDB.insert(useradd)
                .then(post => {
                    res.status(201).json(post)
                })
                .catch(error => {
                    res.status(500).json({ error: "Could not add user"})
                })
        })

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

router.get('/:id', validateUserId, (req, res) => {
    const userId = req.params.id;

    userDB.getById(userId)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ error: "Could not load users"})
        })
});

router.get('/:id/posts', validateUserId, (req, res) => {
    const id = req.params.id;

    userDB.getUserPosts(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ error: "Could not load users"})
        })
});

router.delete('/:id', validateUserId, (req, res) => {
    const id = req.params.id;

    userDB.remove(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ error: "Could not remove user"})
        })
});

router.put('/:id', validateUserId, (req, res) => {
    const userup = req.body;
    const id = req.params.id;

    userDB.update(id, userup)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ error: "Could not update user"})
        })
});

//custom middleware


function validateUserId(req, res, next) {
    const id = req.params.id

    userDB.getById(id)
        .then(user => {
            if(user) {
                req.user = req.body
            } else {
                res.status(400).json({ message: "invalid user id" })
              }
        })

      next();
};

function validateUser(req, res, next) {
    if(!req.body) {
        res.status(400).json({ message: "missing user data" })
      } else if (!req.body.name) {
        res.status(400).json({ message: "missing required name field" })
      } 
    
      next();
};

function validatePost(req, res, next) {
    if(!req.body) {
        res.status(400).json({ message: "missing post data" })
      } else if (!req.body.text) {
        res.status(400).json({ message: "missing required text field" })
      } 
    
      next();
};

module.exports = router;
