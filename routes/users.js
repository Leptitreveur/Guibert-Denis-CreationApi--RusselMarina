import express from "express";
import { getAllUsers, getUserByEmail, addUser, updateUser, deleteUser } from "../services/users.js";

const router = express.Router();

/* ADD CRUD */
router.get("/", getAllUsers);
router.get("/:email", getUserByEmail);
router.post("/", addUser);
router.put("/:email", updateUser);
router.delete("/:email", deleteUser);

export default router;
