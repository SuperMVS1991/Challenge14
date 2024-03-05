const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
// class BlogPost extends Model {}
const BlogPost = sequelize.define('BlogPost', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    publishedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, // Move the closing curly brace here
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'BlogPost'
});

module.exports = BlogPost;