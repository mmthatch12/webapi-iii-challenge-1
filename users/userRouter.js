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

//this isn't working yet, not sure what method to use to add posts to a user?
router.post('/:id/posts', validatePost, (req, res) => {
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

router.get('/:id', (req, res) => {
    const userId = req.params.id;

    userDB.getById(userId)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ error: "Could not load users"})
        })
});

router.get('/:id/posts', (req, res) => {
    const id = req.params.id;

    userDB.getUserPosts(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ error: "Could not load users"})
        })
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    userDB.remove(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ error: "Could not remove user"})
        })
});

router.put('/:id', (req, res) => {
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

//the 400 error isn't working yet, not sure what he means by store
function validateUserId(req, res, next) {
    if(req.id) {
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
        res.send('User validated!')
      }
    
      next();
};

function validatePost(req, res, next) {
    if(!req.body) {
        res.status(400).json({ message: "missing post data" })
      } else if (!req.body.text) {
        res.status(400).json({ message: "missing required text field" })
      } else {
        res.send('Post validated!')
      }
    
      next();
};

module.exports = router;
