"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const expressHbs = require("express-handlebars");
const paginate = require("express-handlebars-paginate");
const sessions = require("express-session");
const cookieParser = require("cookie-parser");

// public static folder
app.use(express.static(__dirname + "/public"));

// template engine
app.engine(
  "hbs",
  expressHbs.engine({
    layoutsDir: __dirname + "/views/layouts",
    defaultLayout: "layout",
    extname: "hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
    },
    helpers: {
      paginate: paginate.createPagination,
      formatDate: (date) => {
        let day = new Date(date);
        return day.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" });
      },
    },
  })
);
app.set("view engine", "hbs");

// use body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use session
app.use(
  sessions({
    cookie: { httpOnly: true, maxAge: 60 * 60 * 1000 },
    secret: "secret to hash session id",
    resave: false,
    saveUninitialized: false,
  })
);

// use cookie
app.use(cookieParser());

// middlewares

// routes
app.use("/", require("./routes/nodejs2Router"));

// errors handler
app.use((req, res, next) => {
  res.status(404).render("error", { message: "Request not Found!" });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).render("error", { message: "Internal Server Error!" });
});

// start server
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
