const express = require("express");
const dotenv = require("dotenv");
const db = require("./pkg/db/index.js");
const authHandler = require("./controller/authHandler.js");
const viewHandler = require("./controller/viewHandler.js");
const post = require("./controller/post.js");

const jwt = require("express-jwt");
const cookieParser = require("cookie-parser");

const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

db.init();

app.use(
    jwt
      .expressjwt({
        algorithms: ["HS256"],
        secret: process.env.JWT_SECRET,
        getToken: (req) => {
          if (
            req.headers.authorization &&
            req.headers.authorization.split(" ")[0] === "Bearer"
          ) {
            return req.headers.authorization.split(" ")[1];
          }
          if (req.cookies.jwt) {
            return req.cookies.jwt;
          }
          return null;
        },
      })
      .unless({
        path: [
          "/",
          "/api/v1/signup",
          "/api/v1/login",
        ],
      })
  );

  app.post("/api/v1/signup", authHandler.signup);
app.post("/api/v1/login", authHandler.login);

app.get("/", viewHandler.getHome);
app.get("/api/v1/signup", viewHandler.getSignup)
app.get("/api/v1/login", viewHandler.getLogin)
app.get("/api/v1/hello", viewHandler.getHello);

app.listen(10000, (err) => {
    if (err) return console.log("there is an error");
    console.log("Server started successfully on port 10000");
  });
