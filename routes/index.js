import express from "express";

import loginRoute from "./login.js";
import userRoute from "./users.js";
import catwaysRoute from "./catways.js";
import reservationsRoute from "./reservations.js";
// import dashboardRoute from "./dashboard.js";
import logoutRoute from './logout.js';

const router = express.Router();

/**
 * Main router configuration
 * 
 * Mount all sub-routers.
 * Individual route documentation can be found in their respective route files.
 */

/**
 * @route GET /
 * @description Render the home page
 * @access Public
 * @returns {void} Renders the index view with a title
 */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Accueil" });
});

/**
 * Mount sub-routers
 * 
 * @see ./login.js - POST /login
 * @see ./users.js - GET, POST, PUT, DELETE /users
 * @see ./catways.js - GET, POST, PUT, DELETE /catways
 * @see ./reservations.js - GET, POST, PUT, DELETE /catways/:id/reservations
 * @see ./dashboard.js - GET /dashboard
 * @see ./logout.js - POST /logout
 */
router.use("/login", loginRoute);
router.use("/users", userRoute); 
router.use("/catways", catwaysRoute);
router.use("/catways/:id/reservations", reservationsRoute);
// router.use("/dashboard", dashboardRoute);
router.use("/logout", logoutRoute);


export default router;
