const User = require('./User');
const Comment = require('./comments'); // Fix the casing of the import statement
const BlogPost = require('./blogPost');


User.hasMany(BlogPost, {

    foreignKey: 'userID',
    onDelete: 'CASCADE'
});

BlogPost.belongsTo(User, {
    foreignKey: 'userID'
});

User.hasMany(Comment, {

    foreignKey: 'userID',
    onDelete: 'CASCADE'
});
Comment.belongsTo(User, {
    foreignKey: 'userID'
});
BlogPost.hasMany(Comment, {
    
        foreignKey: 'postId',
        onDelete: 'CASCADE'
    });
    Comment.belongsTo(BlogPost, {
        foreignKey: 'postId'
    });



module.exports = { User, blogPost };