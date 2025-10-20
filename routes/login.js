import express from "express";
import loginRoute from "../services/login.js"

const router = express.Router();

router.post("/login", loginRoute);

export default router;
