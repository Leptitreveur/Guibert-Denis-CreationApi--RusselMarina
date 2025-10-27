import express from "express";
import authentification from "../services/authentification.js";

const router = express.Router();

router.post("/", authentification);

export default router;
