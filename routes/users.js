import express from "express";

const router = express.Router();

/* ADD CRUD */
router.get("/users/", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/users/:email", CreateUser);
router.put("/users/:email", updateUser);
router.delete("/users/:email", deleteUser);


export default router;
