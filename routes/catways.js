import express from "express";
import checkJWT from "../middlewares/private";
import { addCatway, getAllCatways, getCatwayById, updateCatway, deleteCatway } from "../services/catways.js";

const router = express.Router();

router.use(checkJWT);

/* ADD CRUD */
router.get("/", getAllCatways);
router.get("/:id", getCatwayById);
router.post("/", addCatway);
router.put("/:id", updateCatway);
router.delete("/:id", deleteCatway);


export default router;
