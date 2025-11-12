import express from "express";
import checkJWT from "../middlewares/private.js";
import inputsValidation from '../middlewares/inputsValidation.js';
import dateValidation from '../middlewares/dateValidation.js';
import { addReservation, getAllReservation, getReservationById, updateReservation, deleteReservation } from "../services/reservation.js";

const router = express.Router();

router.use(checkJWT);

/* ADD CRUD */
router.get("/:id/reservations", getAllReservation);
router.get("/:id/reservations/:id", getReservationById);
router.post("/:id/reservations", inputsValidation('reservation', 'add'), dateValidation, addReservation);
router.put("/:id/reservations", inputsValidation('reservation', 'update'), dateValidation, updateReservation);
router.delete("/:id/reservations/:id", deleteReservation);

export default router;
