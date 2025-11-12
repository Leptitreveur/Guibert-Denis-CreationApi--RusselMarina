import express from "express";
import authentificate from "../services/authentification.js";
import inputsValidation from '../middlewares/inputsValidation.js';

const router = express.Router();

router.post("/", inputsValidation('login', 'login'), authentificate);

export default router;
