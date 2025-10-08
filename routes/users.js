import express from "express";

const router = express.Router();

/* ADD CRUD */
router.get("/users/");
router.get("/users/:id");
router.post("/users/:email");
router.put("/users/:email");
router.delete("/users/:email");


export default router;
