var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// const port = 3000;

// app.get("/redirect", (req, response) => {
//   axios({
//     method: "post",
//     url: "https://us.battle.net/oauth/token",
//     params: {
//       code: req.query.code,
//       grant_type: "authorization_code",
//       scope: "wow.profile",
//       redirect_uri: "http://10.0.2.2:3000/redirect",
//       // redirect_uri: "exp://192.168.1.4:19000/"
//     },
//     auth: {
//       username: "c22ce62fd8f6467bb9656f2fa971ac35",
//       password: "u0BVI5CiExd6JZ7FeUxO0K77N5tu1ib6",
//     },
//   })
//     .then((res) => {
//       //   console.log(query);
//       const query = querystring.stringify(res.data);
//       response.status(301).redirect(`exp://192.168.1.4:19000/?${query}`);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// });

// app.get("/health", (req, response) => {
//   response.send("alive");
// });

// app.get("/", (req, response) => {
//   response.send("ok.");
// });

// app.listen(port, () =>
//   console.log(`Example app listening at http://localhost:${port}`)
// );

module.exports = app;
