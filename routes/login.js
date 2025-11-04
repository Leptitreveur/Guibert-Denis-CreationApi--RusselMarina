import express from "express";
import authentification from "../services/authentification.js";
import inputsValidation from '../utils/inputsValidation.js';

const router = express.Router();

router.post("/", inputsValidation('login'), authentification);

export default router;
