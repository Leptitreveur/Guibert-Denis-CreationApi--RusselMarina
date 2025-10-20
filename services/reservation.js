import Reservation from "../models/reservation.js";
import asyncHandler from "../utils/asyncHandler.js";
import { creationValidator, updateValidator } from "../utils/periodValidator.js";

// Create reservation
const addReservation = asyncHandler(async (req, res) => {
  const { catwayId, clientName, boatName, startDate, endDate, duration } = req.body;

  await creationValidator(catwayId, startDate, endDate);

  const reservation = await Reservation.create({ catwayId, clientName, boatName, startDate, endDate, duration });

  return res.status(201).json({
    message: "Reservation successfully created.",
    data: reservation,
  });
});

// get all reservation
const getAllReservation = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find({});

  if (reservations.length > 0) {
    return res.status(200).json({
      message: "Successfully find all Reservation.",
      data: reservations,
    });
  }

  return res.status(404).json({
    message: "No Reservations were found.",
  });
});

// get one reservation by id
const getReservationById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingReservation = await Reservation.findById(id);

  if (existingReservation) {
    return res.status(200).json({
      message: "Reservation successfully found.",
      data: existingReservation,
    });
  }

  return res.status(404).json({
    message: "Reservation not found.",
  });
});

// update reservation
const updateReservation = asyncHandler(async (req, res) => {
  const { catwayId, clientName, boatName, startDate, endDate, duration } = req.body;
  const { id } = req.params;
  
  await updateValidator(catwayId, startDate, endDate, id);

  const reservation = await Reservation.findByIdAndUpdate(
    id,
    { catwayId, clientName, boatName, startDate, endDate, duration },
    { runValidators: true, new: true }
  );


  return res.status(200).json({
    message: "Reservation successfully updated.",
    data: reservation,
  });
});

// delete reservation by id
const deleteReservation = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const reservation = await Reservation.findByIdAndDelete(id);

  if (reservation) {
    return res.status(200).json({
      message: "Reservation successfully deleted.",
      data: reservation,
    });
  }

  return res.status(404).json({
    message: "Reservation not found.",
  });
});

export { addReservation, getAllReservation, getReservationById, updateReservation, deleteReservation };
