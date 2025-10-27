import express from "express";
import checkJWT from "../middlewares/private";
import { addReservation, getAllReservation, getReservationById, updateReservation, deleteReservation } from "../services/reservation.js";

const router = express.Router();

router.use(checkJWT);

/* ADD CRUD */
router.get("/:id/reservations", getAllReservation);
router.get("/:id/reservations/:id", getReservationById);
router.post("/:id/reservations", addReservation);
router.put("/:id/reservations", updateReservation);
router.delete("/:id/reservations/:id", deleteReservation);

export default router;
