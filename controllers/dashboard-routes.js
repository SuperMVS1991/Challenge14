const router = require("express").Router();
const { BlogPost, Comment, User } = require("../models");
const withAuth = require("../utilities/auth.js");

router.get("/", withAuth, (req, res) => {
  console.log(req.session.user_id);

  console.log(req.session);

  BlogPost.findAll({
    where: {
      userID: req.session.user_id,
    },
    attributes: ["id", "title", "content", "publishedAt"],
    include: [
      {
        model: Comment,
        attributes: ["id", "postID", "userID", "content", "createdAt"],
        include: {
          model: User,
          attributes: ["name"],
        },
      },
      {
        model: User,
        attributes: ["name"],
      },
    ],
  })
    .then((dbBlogPostData) => {
      const blogPosts = dbBlogPostData.map((blogPost) =>
        blogPost.get({ plain: true })
      );
      console.log(blogPosts);
      res.render("dashboard", { blogPosts, logged_in: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
  BlogPost.findByPk(req.params.id, {
    attributes: ["id", "title", "content", "createdAt"],
    include: [
      {
        model: Comment,
        attributes: ["id", "content", "postID", "userID", "createdAt"],
        include: {
          model: User,
          attributes: ["name"],
        },
      },
      {
        model: User,
        attributes: ["name"],
      },
    ],
  })
    .then((dbBlogPostData) => {
      if (dbBlogPostData) {
        const blogPost = dbBlogPostData.get({ plain: true });
        res.render("edit-post", { blogPost, logged_in: true });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
