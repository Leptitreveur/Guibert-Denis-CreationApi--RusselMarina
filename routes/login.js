import express from "express";
import loginRoute from "../services/login.js"

const router = express.Router();

router.post("/", loginRoute);

export default router;
