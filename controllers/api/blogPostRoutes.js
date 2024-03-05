const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utilities/auth.js');

router.get('/', (req, res) => {
    BlogPost.findAll({
        order: [['createdAt', 'DESC']]
    })
    .then(dbBlogPostData => res.json(dbBlogPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
    // Add code here to find all blog posts
});
router.get('/:id', (req, res) => {
    BlogPost.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbBlogPostData => {
        if (!dbBlogPostData) {
            res.status(404).json({ message: 'No blog post found with this id' });
            return;
        }
        res.json(dbBlogPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
    // Add code here to find a single blog post by its `id`
});
router.post('/', withAuth, (req, res) => {
    if (req.session) {
        BlogPost.create({
            title: req.body.title,
            content: req.body.content,
            userID: req.session.userID
        })
        .then(dbBlogPostData => res.json(dbBlogPostData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
});

router.put('/:id', withAuth, (req, res) => {
    BlogPost.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbBlogPostData => {
        if (!dbBlogPostData) {
            res.status(404).json({ message: 'No blog post found with this id' });
            return;
        }
        res.json(dbBlogPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
    // Add code to update a blog post by its `id` value
});

router.delete('/:id', withAuth, (req, res) => {
    BlogPost.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbBlogPostData => {
        if (!dbBlogPostData) {
            res.status(404).json({ message: 'No blog post found with this id' });
            return;
        }
        res.json(dbBlogPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
    // Add code to delete a blog post by its `id` value
});

module.exports = router;