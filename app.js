/**
 * Main Express application configuration and setup
 * @fileoverview Express server configuration with MongoDB connection/disconnection and middlewares setup
 */
import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { DbConnection } from "./db/mongo.js";
import { SetupShutdown } from "./utils/serverShutdown.js";

import indexRouter from "./routes/index.js";

/**
 * Express application instance
 *
 * @type {express.Application}
 */
const app = express();

/**
 * Initialize MongoDB connection with error handling
 */
DbConnection().catch((err) => {
  if (process.env.NODE_ENV === "production") {
    console.error("Error details : ", err.stack);
    process.exit(1);
  } else {
    console.warn("MongoDB unavailable - downgrade mode");
  }
});

/**
 * Setup server shutdown handlers
 */
SetupShutdown();

/**
 * Configure view engine and template settings
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/**
 * Configure Cors
 */
app.use(
  cors({
    exposeHeaders: ["Authorization"],
    origin: "*",
  })
);

/**
 * Configure middleware stack
 */
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/**
 * Configure route handlers
 */
app.use("/", indexRouter);

/**
 * 404 error handler -  catch all unmatched routes
 *
 * @param  {Express.Request} req - Express request object
 * @param  {Express.Response} res - Express response object
 * @param  {Express.NextFunction} next - Express next function
 */
app.use(function (req, res, next) {
  next(createError(404));
});

/**
 * Global error handler middleware
 *
 * @param {Error} err - Error object
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.NextFunction} next - Express next function
 */
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
