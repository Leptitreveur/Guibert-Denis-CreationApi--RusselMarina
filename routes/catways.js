import express from "express";
import checkJWT from "../middlewares/private.js";
import inputsValidation from '../middlewares/inputsValidation.js';
import paramsValidataion from '../middlewares/paramsValidation.js'; 
import { addCatway, getAllCatways, getCatwayById, updateCatway, deleteCatway } from "../services/catways.js";
import paramsValidation from "../middlewares/paramsValidation.js";

const router = express.Router();

router.use(checkJWT);

/* ADD CRUD */
router.get("/", getAllCatways);
router.get("/:id", paramsValidation, getCatwayById);
router.post("/", inputsValidation('catway', 'add'), addCatway);
router.put("/:id", paramsValidation, inputsValidation('catway', 'update'), updateCatway);
router.delete("/:id", paramsValidation, deleteCatway);


export default router;
