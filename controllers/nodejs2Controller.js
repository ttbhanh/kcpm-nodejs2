"use strict";

const controller = {};
const models = require("../models");
const bcrypt = require("bcrypt");

// middlewares
controller.setLayout = (req, res, next) => {
  res.locals.build = "Build 2";
  res.locals.title = "NodeJS Website";
  next();
};

controller.checkDatabaseConnection = async (req, res, next) => {
  try {
    await models.sequelize.authenticate();
    next();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    res.status(500).render("error", {
      message:
        "Unable to connect to the database. Please check your configuration file config.js then restart the server!",
    });
  }
};

controller.initUser = (req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.isLoggedIn = req.session.user ? true : false;
  res.locals.isAdmin = req.session.user ? req.session.user.isAdmin : false;
  next();
};

controller.isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect(`/login?returnURL=${req.originalUrl}`);
  }
};

// controller

controller.showList = async (req, res) => {
  try {
    res.locals.articles = await models.Article.findAll({ order: [["id"]] });
    return res.render("articles");
  } catch (error) {
    res.redirect("/install");
  }
};

controller.showDetails = async (req, res) => {
  console.log(req.session.user);

  const id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
  const article = await models.Article.findByPk(id);

  if (article) {
    let limit = 3;
    let page = isNaN(req.query.page)
      ? 1
      : Math.max(1, parseInt(req.query.page));
    let offset = (page - 1) * limit;

    const { rows, count } = await models.Comment.findAndCountAll({
      where: {
        ArticleId: id,
      },
      include: [
        {
          model: models.User,
          attributes: ["id", "username"],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    article.Comments = rows;

    if (Math.ceil(count / limit) > 0) {
      let pagination = {
        page,
        limit,
        totalRows: count,
        queryParams: req.query,
      };
      res.locals.pagination = pagination;
    }

    res.locals.article = article;
    res.locals.title = article.title;
    res.locals.error = req.query.error;

    return res.render("details");
  } else {
    return res.render("error", { message: "Request NOT found!" });
  }
};

controller.createComment = async (req, res) => {
  let articleId = isNaN(req.body.articleId) ? 0 : parseInt(req.body.articleId);

  const { validationResult } = require("express-validator");

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors = errors.array();

    let message = "";
    for (let i = 0; i < errors.length; i++) {
      message += errors[i].msg;
    }

    return res.redirect(`/articles/${req.body.articleId}?error=${message}`);
  }

  if (
    (await models.Article.findByPk(articleId)) &&
    req.body.comment &&
    req.body.comment.trim() != ""
  ) {
    let comment = {
      content: req.body.comment,
      ArticleId: articleId,
      UserId: req.session.user.id,
    };

    await models.Comment.create(comment);
  }
  return res.redirect(`/articles/${req.body.articleId}`);
};

controller.deleteComment = async (req, res) => {
  const id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
  await models.Comment.destroy({
    where: { id },
  });
  return res.sendStatus(200);
};

controller.showRegister = (req, res) => {
  res.render("register", {
    error: "",
    title: "Register",
  });
};

controller.showLogin = (req, res) => {
  if (req.session.user) {
    res.redirect("/user");
  } else {
    var details = {
      title: "Login",
      username: req.cookies.username || "",
      password: req.cookies.password || "",
      user: undefined,
      error: "",
    };
    req.session.returnURL = req.query.returnURL;
    res.render("login", details);
  }
};

controller.login = async (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var saved = req.body.checkbox;
  let user = await models.User.findOne({ where: { username } });

  if (!user) {
    var details = {
      title: "Login",
      username: req.cookies.username || "",
      password: req.cookies.password || "",
      user: undefined,
      error: "Username does not exist!",
    };
    res.render("login", details);
  } else {
    bcrypt.compare(password, user.password, function (err, isMatch) {
      if (err) throw err;

      if (!isMatch) {
        res.render("login", {
          error: "Incorrect Password",
        });
      } else {
        req.session.user = {
          id: user.id,
          username: user.username,
          isAdmin: user.isAdmin,
        };
        if (saved) {
          res.cookie("username", username, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
          });
          res.cookie("password", password, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
          });
        }
        if (req.session.returnURL) {
          res.redirect(req.session.returnURL);
        } else {
          if (user.isAdmin === true) {
            res.redirect("/user");
          } else {
            res.redirect("/");
          }
        }
      }
    });
  }
};

controller.register = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  let user = await models.User.findOne({ where: { username } });
  if (user) {
    res.render("register", {
      error: `Username ${email} exists! Please choose another.`,
    });
  } else {
    user = {
      username: username,
      password: password,
      isAdmin: false,
    };
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) throw err;

        user.password = hash;
        models.User.create(user);

        res.render("login", {
          error: "You have registered, now please login",
        });
      });
    });
  }
};

controller.logout = (req, res) => {
  req.session.user = null;
  res.redirect("/login");
};

controller.showUserPage = (req, res) => {
  res.render("user", {
    title: "User",
  });
};

controller.showUnderConstruction = (req, res) => {
  res.render("error", {
    message: "This function is under construction. Please come back later!",
  });
};

module.exports = controller;
