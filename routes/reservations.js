import express from "express";
import checkJWT from "../middlewares/private.js";
import inputsValidation from '../middlewares/inputsValidation.js';
import dateValidation from '../middlewares/dateValidation.js';
import { validateCatwayId } from "../middlewares/validateAccess.js";
import { validateReservationId } from "../middlewares/validateAccess.js";
import { addReservation, getAllReservation, getReservationById, updateReservation, deleteReservation } from "../services/reservation.js";

const router = express.Router({mergeParams: true});

router.use(checkJWT);
router.use(validateCatwayId);

/* ADD CRUD */
router.get("/", getAllReservation);
router.get("/:idReservation", validateReservationId, getReservationById);
router.post("/", inputsValidation('reservation', 'add'), dateValidation, addReservation);
router.put("/", inputsValidation('reservation', 'update'), dateValidation, updateReservation);
router.delete("/:idReservation", validateReservationId, deleteReservation);

export default router;
