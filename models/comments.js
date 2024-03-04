const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
// class Comment extends Model {}
const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    postID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'BlogPost',
            key: 'id'
        }
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,

    freezeTableName: true,
    underscored: true,
    modelName: 'Comment',
    timestamps: false

});

module.exports = Comment;