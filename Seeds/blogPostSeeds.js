const { BlogPost } = require('../models');

const BlogPostData = [
    {
        title: "Post 1",
        content: "This is the first post",
        userID: 1,
        publishedAt: "2021-08-01"
    },
    {
        title: "Post 2",
        content: "This is the second post",
        userID: 2,
        publishedAt: "2021-08-02"
    },
    {
        title: "Post 3",
        content: "This is the third post",
        userID: 3,
        publishedAt: "2021-08-03"
    }, 
    {
        title: "Post 4",
        content: "This is the fourth post",
        userID: 4,
        publishedAt: "2021-08-04"
    },
    {
        title: "Post 5",
        content: "This is the fifth post",
        userID: 5,
        publishedAt: "2021-08-05"
    }
];
   

const seedPosts = () => BlogPost.bulkCreate(BlogPostData);

module.exports = seedPosts;