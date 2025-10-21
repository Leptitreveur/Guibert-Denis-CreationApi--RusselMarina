import express from "express";

const router = express.Router();

/* ADD CRUD */
router.get("/users/", getAllUsers);
router.get("/users/:email", getUserByEmail);
router.post("/users/", CreateUser);
router.put("/users/:email", updateUser);
router.delete("/users/:email", deleteUser);


export default router;
