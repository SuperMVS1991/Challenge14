const { Comment } = require("../models");

const commentData = [
  {
    postID: 1,
    userID: 1,
    content: "This is the comment for the first post",
    createdAt: "2021-08-01",
  },
  {
    userID: 2,
    postID: 2,
    createdAt: "2021-08-02",
    content: "This is the second post",
  },
  {
    userID: 3,
    postID: 3,
    createdAt: "2021-08-03",
    content: "This is the third post",
  },
  {
    userID: 4,
    postID: 4,
    createdAt: "2021-08-04",
    content: "This is the fourth post",
  },
  {
    userID: 5,
    postID: 5,
    createdAt: "2021-08-05",
    content: "This is the fifth post",
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
