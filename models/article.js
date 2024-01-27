'use strict';
module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define('Article', {
        title: DataTypes.STRING,
        imagepath: DataTypes.STRING,
        description: DataTypes.TEXT,
        summary: DataTypes.TEXT
    }, {});
    Article.associate = function(models) {
        // associations can be defined here
        Article.hasMany(models.Comment);
    };
    return Article;
};