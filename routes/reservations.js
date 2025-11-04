import express from "express";
import checkJWT from "../middlewares/private";
import inputsValidation from '../utils/inputsValidation.js';
import { addReservation, getAllReservation, getReservationById, updateReservation, deleteReservation } from "../services/reservation.js";

const router = express.Router();

router.use(checkJWT);

/* ADD CRUD */
router.get("/:id/reservations", inputsValidation('reservation'), getAllReservation);
router.get("/:id/reservations/:id", inputsValidation('reservation'), getReservationById);
router.post("/:id/reservations", inputsValidation('reservation'), addReservation);
router.put("/:id/reservations", inputsValidation('reservation'), updateReservation);
router.delete("/:id/reservations/:id", inputsValidation('reservation'), deleteReservation);

export default router;
