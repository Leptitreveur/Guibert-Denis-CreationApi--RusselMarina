import express from "express";
import checkJWT from "../middlewares/private";
import inputsValidation from '../utils/inputsValidation.js';
import { getAllUsers, getUserByEmail, addUser, updateUser, deleteUser } from "../services/users.js";

const router = express.Router();

router.use(checkJWT);

/* ADD CRUD */
router.get("/", inputsValidation('user'), getAllUsers);
router.get("/:email", inputsValidation('user'), getUserByEmail);
router.post("/", inputsValidation('user'), addUser);
router.put("/:email", inputsValidation('user'), updateUser);
router.delete("/:email", inputsValidation('user'), deleteUser);

export default router;
