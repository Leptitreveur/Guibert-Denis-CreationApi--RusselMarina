import express from "express";

import userRoute from "./users.js";
import reservationsRoute from "./reservations.js";
import dashboardRoute from "./dashboard.js";
import catwaysRoute from "./catways.js";

const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index", { title: "Accueil" });
});

router.use("/users", userRoute);
router.use("/reservations", reservationsRoute);
router.use("/dashboard", dashboardRoute);
router.use("/catways", catwaysRoute);

export default router;
