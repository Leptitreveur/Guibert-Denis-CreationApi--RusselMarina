/**
 * Main Express application configuration and setup
 * @fileoverview Express server configuration with MongoDB connection/disconnection and middlewares setup
 */
import createError from "http-errors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { DbConnection } from "./db/mongo.js";
import { setupShutdown } from "./utils/serverShutdown.js";
import cors from "cors";

import indexRouter from "./routes/index.js";

// Recreate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
 * Configure view engine and template settings
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/**
 * Configure CORS
 *
 * Enables cross-origin requests with cookie support.
 * credentials: true is required to allow HTTP-only cookies (JWT tokens) 
 * to be sent and received across different origins.
 * When credentials is true, origin must be a specific domain (not "*").
 */
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

/**
 * Sending HTTP traffic to HTTPS
 */
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.get('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.get('host')}${req.url}`);
    } else {
      next();
    }
  });
}

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
 * 404 error handler -  Catch all unmatched routes
 *
 * @param  {Express.Request} req - Express request object
 * @param  {Express.Response} res - Express response object
 * @param  {Express.NextFunction} next - Express next function
 */
app.use(function (req, res, next) {
  console.log("404 error handler");
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
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

/**
* Set up server shutdown handlers
*/
setupShutdown();

export default app;
