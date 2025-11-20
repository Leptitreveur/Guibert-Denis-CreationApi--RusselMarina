import express from "express";

import loginRoute from "./login.js";
import userRoute from "./users.js";
import catwaysRoute from "./catways.js";
import reservationsRoute from "./reservations.js";
// import dashboardRoute from "./dashboard.js";
import logout from './logout.js';

const router = express.Router();


router.get("/", function (req, res, next) {
  res.render("index", { title: "Accueil" });
});


router.use("/login", loginRoute);
router.use("/users", userRoute); 
router.use("/catways", catwaysRoute);
router.use("/catways/:id/reservations", reservationsRoute);
// router.use("/dashboard", dashboardRoute);
router.use("/logout", logout);


export default router;
