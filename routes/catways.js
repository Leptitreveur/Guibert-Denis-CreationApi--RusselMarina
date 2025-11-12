import express from "express";
import checkJWT from "../middlewares/private.js";
import inputsValidation from '../middlewares/inputsValidation.js';
import { addCatway, getAllCatways, getCatwayById, updateCatway, deleteCatway } from "../services/catways.js";

const router = express.Router();

router.use(checkJWT);

/* ADD CRUD */
router.get("/", getAllCatways);
router.get("/:id", getCatwayById);
router.post("/", inputsValidation('catway', 'add'), addCatway);
router.put("/:id", inputsValidation('catway', 'update'), updateCatway);
router.delete("/:id", deleteCatway);


export default router;
