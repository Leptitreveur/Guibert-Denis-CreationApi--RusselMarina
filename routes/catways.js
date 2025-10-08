import express from "express";

const router = express.Router();

/* ADD CRUD */
router.get("/catways");
router.get("/catways/:id");
router.post("/catways");
router.put("/catways/:id");
router.delete("/catways/:id");


export default router;
