"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/nodejs2Controller");
const {
  body,
  showErrorMessageIfAvailable,
} = require("../controllers/validator");

router.use(controller.setLayout);
router.use(controller.initUser);
router.use(controller.checkDatabaseConnection);

router.get("/", controller.showList);

router.get("/articles", controller.showList);
router.get("/articles/:id", controller.showDetails);

router.post(
  "/comments",
  controller.isLoggedIn,
  body("comment").notEmpty().withMessage("Comment can not be empty!"),
  body("comment")
    .isLength({ max: 255 })
    .withMessage("Comment must be less than 255 characters!"),
  controller.createComment
);

router.delete("/comments/:id", controller.isLoggedIn, controller.deleteComment);

// register
router.get("/register", controller.showRegister);
router.post(
  "/register",
  body("username").trim().notEmpty().withMessage("Username can not be empty!"),
  body("confirm_password").custom((confirm_password, { req }) => {
    if (confirm_password !== req.body.password) {
      throw new Error("Password confirmation does not match password!");
    }
    return true;
  }),
  body("password")
    .matches(/(?=.*\d)(?=.*[a-z]).{7,}/)
    .withMessage(
      "Password must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters!"
    ),
  showErrorMessageIfAvailable("register"),
  controller.register
);

// login
router.get("/login", controller.showLogin);
router.post(
  "/login",
  body("username").trim().notEmpty().withMessage("Username can not be empty!"),
  body("password").trim().notEmpty().withMessage("Password can not be empty!"),
  showErrorMessageIfAvailable("login"),
  controller.login
);

// user
router.get("/user", controller.isLoggedIn, controller.showUserPage);

// logout
router.get("/logout", controller.logout);

// create tables and import data
router.get("/install", async (req, res) => {
  const dbController = require("../controllers/dbController");
  await dbController.createDatabase();
  res.redirect("/");
});

module.exports = router;
