import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { DbConnection } from "./db/mongo.js";
import { SetupShutdown } from "./utils/serverShutdown.js";

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";

const app = express();

DbConnection().catch((err) => {
  if (process.env.NODE_ENV === "production") {
    console.error("Error details : ", err.stack);
    process.exit(1);
  } else {
    console.warn("MongoDB unavailable - downgrade mode");
  }
});

SetupShutdown();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

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

export default app;
