'use strict';
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        content: DataTypes.STRING
    }, {});
    Comment.associate = function (models) {
        // associations can be defined here
        Comment.belongsTo(models.Article);
        Comment.belongsTo(models.User);
    };
    return Comment;
};