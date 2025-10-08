import express from "express";

const router = express.Router();

/* ADD CRUD */
router.get("/catways/:id/reservations");
router.get("/catways/:id/reservations/:id");
router.post("/catways/:id/reservations");
router.put("/catways/:id/reservations");
router.delete("/catways/:id/reservations/:id");

export default router;
