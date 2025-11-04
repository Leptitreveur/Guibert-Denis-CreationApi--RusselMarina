import express from "express";
import checkJWT from "../middlewares/private";
import inputsValidation from '../utils/inputsValidation.js';
import { addCatway, getAllCatways, getCatwayById, updateCatway, deleteCatway } from "../services/catways.js";

const router = express.Router();

router.use(checkJWT);

/* ADD CRUD */
router.get("/", inputsValidation('catway'), getAllCatways);
router.get("/:id", inputsValidation('catway'), getCatwayById);
router.post("/", inputsValidation('catway'), addCatway);
router.put("/:id", inputsValidation('catway'), updateCatway);
router.delete("/:id", inputsValidation('catway'), deleteCatway);


export default router;
