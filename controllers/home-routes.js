const router = require("express").Router();
const { Comment, User, BlogPost } = require("../models");
const withAuth = require("../utilities/auth.js");

router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const BlogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          attributes: ["content", "createdAt", "userID", "postID", "id"],
          include: {
            model: User,
            attributes: ["name"],
          },
        },
      ],
    });
    // Console.log("BLOGPOSTDATA", BlogPostData);
    // Serialize data so the template can read it
    const blogPosts = BlogPostData.map((blogPost) =>
      blogPost.get({ plain: true })
    );
    console.log("BLOGPOSTS", blogPosts);
    // Pass serialized data and session flag into template
    res.render("homepage", {
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/blogpost/:id", async (req, res) => {
  try {
    const BlogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          attributes: ["content", "createdAt", "userID", "postID", "id"],
          include: {
            model: User,
            attributes: ["name"],
          },
        },
      ],
    });
console.log("req.session.logged_in", req.session.logged_in);
    const blogPost = BlogPostData.get({ plain: true });
    res.render("single-post", {
      blogPost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
// router.get("/profile", withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.UserID, {
//       attributes: { exclude: ["password"] },
//       include: [{ model: BlogPost }],
//     });

//     const user = userData.get({ plain: true });

//     res.render("profile", {
//       ...user,
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

module.exports = router;
