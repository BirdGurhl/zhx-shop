var createError = require("http-errors");
var express = require("express");
var path = require("path");

// 中间件
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var app = express()
const cors = require('cors')
// let multer = require('multer')
// let objMulter = multer({ dest: './public/upload' })
// app.use(objMulter.any());

// 接口路由
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const upload = require('./routes/upload')
const goodsRouter = require("./routes/goods");
const adminRouter = require("./routes/adminUser")
const cateRouter = require('./routes/cate')


// view engine setup

app.get("/public/upload/*", function (req, res) {
  console.log(111);
  res.sendFile(__dirname + "/" + req.url);
  console.log("Request for " + req.url + " received.");
});
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 接口路由安装
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/goods", goodsRouter);
app.use("/upload", upload);
app.use('/admin', adminRouter);
app.use('/cate', cateRouter)

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

module.exports = app;
