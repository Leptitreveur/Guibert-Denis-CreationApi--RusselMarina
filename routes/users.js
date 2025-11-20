import express from "express";
import checkJWT from "../middlewares/private.js";
import inputsValidation from '../middlewares/inputsValidation.js';
import paramsValidation from "../middlewares/paramsValidation.js";
import { getAllUsers, getUserByEmail, addUser, updateUser, deleteUser } from "../services/users.js";

const router = express.Router();

// router.use(checkJWT);

/* ADD CRUD */
router.get("/", checkJWT, getAllUsers);
router.get("/:email", checkJWT, paramsValidation, getUserByEmail);
router.post("/", inputsValidation('user', 'add'), addUser);
router.put("/:email", checkJWT, paramsValidation, inputsValidation('user', 'update'), updateUser);
router.delete("/:email", checkJWT, paramsValidation, deleteUser);

export default router;
