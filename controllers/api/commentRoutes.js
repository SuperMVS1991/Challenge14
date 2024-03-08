const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utilities/auth.js');

// GET /api/comments
router.get('/', (req, res) => {
Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});
    // Add code to fetch all comments from the database
    // and send them as a response


// POST /api/comments
router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Comment.create({
            content: req.body.content,
            postID: req.body.postID,
            userID: req.session.user_id
        })
        .then(dbCommentData => {
            console.log('Comment created successfully');
            console.log('Created comment:', dbCommentData);
            res.json(dbCommentData);
        })
        .catch(err => {
            console.error('Error creating comment:', err);
            res.status(400).json(err);
        });
    }
    // Add code to create a new comment in the database
    // using the data from the request body
});

// PUT /api/comments/:id
router.put('/:id', withAuth, (req, res) => {
    Comment.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
    // Add code to update a comment by its `id` value
});

// DELETE /api/comments/:id
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
    // Add code to delete a specific comment from the database
    // based on the comment ID provided in the request params
});


module.exports = router;