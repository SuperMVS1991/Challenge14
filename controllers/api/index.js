const router = require('express').Router();
const userRoutes = require('./userRoutes');
// const  blogPostRoutes = require('./blogPostRoutes');
// var commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
// router.use('/blogPosts', blogPostRoutes);
// router.use('/comment', commentRoutes);

module.exports = router;