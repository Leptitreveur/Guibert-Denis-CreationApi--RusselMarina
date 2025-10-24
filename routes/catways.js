import express from "express";
import { addCatway, getAllCatways, getCatwayById, updateCatway, deleteCatway } from "../services/catways.js";

const router = express.Router();

/* ADD CRUD */
router.get("/", getAllCatways);
router.get("/:id", getCatwayById);
router.post("/", addCatway);
router.put("/:id", updateCatway);
router.delete("/:id", deleteCatway);


export default router;
