import Reservation from '../models/reservation.js';
import asyncHandler from '../utils/asyncHandler.js';
import { creationValidator, updateValidator } from '../utils/periodValidator.js';

/**
 * Reservation CRUD handler.
 *
 * All handlers are wrapped by asyncHandler, which catches rejected promises
 * and forwards errors to Express via `next(err)`.
 * @see ../utils/asyncHandler.js
 */

/**
 * Create reservation
 *
 * @async
 * @function addReservation
 * @param {import('express').Request} req - Body: `catwayNumber`, `clientName`, `boatName`, `startDate`, `endDate`, `duration`.
 * @param {import('express').Response} res
 * @returns {Promise<void>} 201 with reservation.
 * @throws {ApiError} Period conflicted error from creationValidator..
 * @throws {ValidationError} Mongoose validation failure.
 * @throws {MongoServerError} Database error.
 * @throws {Error} Propagated by asyncHandler to error middleware.
 * @see ../utils/asyncHandler.js
 * @see ../utils/periodValidator.js
 */
const addReservation = asyncHandler(async (req, res) => {
  const catwayNumber = req.catwayNumber;
  const { clientName, boatName, startDate, endDate, duration } = req.body;

  if (typeof catwayNumber !== 'number') {
    return res.status(400).json({
      message: 'Catway number is missing.',
      data: req.catwayNumber
    });
  }

  await creationValidator(catwayNumber, startDate, endDate);

  const reservation = await Reservation.create({ catwayNumber, clientName, boatName, startDate, endDate, duration });

  return res.status(201).json({
    message: 'Reservation successfully created.',
    data: reservation,
  });
});

/**
 * Retrieve all reservations
 *
 * @async
 * @function getAllReservation
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>} Send 200 with array of reservations or 404 if none found.
 * @throws {MongoServerError} Database error.
 * @throws {Error} Propagated by asyncHandler to error middleware.
 * @see ../utils/asyncHandler.js
 */
const getAllReservation = asyncHandler(async (req, res) => {
  const catwayNumber = req.catwayNumber;

  const reservations = await Reservation.find({ catwayNumber });

  if (reservations.length > 0) {
    return res.status(200).json({
      message: 'All Reservation successfully found.',
      data: reservations,
    });
  }

  return res.status(404).json({
    message: 'No Reservations were found.',
  });
});

/**
 * Retrieve a reservation by ID
 *
 * @async
 * @function getReservationById
 * @param {import('express').Request} req - Params: `id`
 * @param {import('express').Response} res
 * @returns {Promise<void>} Send 200 with the reservation or 404 not found.
 * @throws {CastError} Invalid ObjectId.
 * @throws {MongoServerError} Database error.
 * @throws {Error} Propagated by asyncHandler to error middleware.
 * @see ../utils/asyncHandler.js
 */
const getReservationById = asyncHandler(async (req, res) => {
  const reservation = req.reservation;

  if (!reservation) {
    return res.status(404).json({
      message: 'Reservation not found.',
      data: req.params
    });
  }

  return res.status(200).json({
    message: 'Reservation successfully found.',
    data: reservation,
  });
});

/**
 * Update a reservation by ID
 * use Mongoose `{runValidators: true, new: true}`
 *
 * @async
 * @function updateReservation
 * @param {import('express').Request} req - Params: `id`; Body: `catwayNumber`, `clientName`, `boatName`, `startDate`, `endDate`, `duration`.
 * @param {import('express').Response} res
 * @returns {Promise<void>} Send 200 with the updated reservation.
 * @throws {ApiError} Period conflict from updateValidator.
 * @throws {ValidationError} Mongoose validation failure.
 * @throws {CastError} Invalid ObjectId.
 * @throws {MongoServerError} Database error.
 * @throws {Error} Propagated by asyncHandler to error middleware.
 * @see ../utils/asyncHandler.js
 * @see ../utils/periodValidator.js
 */
const updateReservation = asyncHandler(async (req, res) => {
  const catwayNumber = req.catwayNumber;
  const { idReservation, clientName, boatName, startDate, endDate, duration } = req.body;

  await updateValidator(catwayNumber, startDate, endDate, idReservation);

  const updatedReservation = await Reservation.findByIdAndUpdate(idReservation, { catwayNumber, clientName, boatName, startDate, endDate, duration }, { runValidators: true, new: true });

  return res.status(200).json({
    message: 'Reservation successfully updated.',
    data: updatedReservation,
  });
});

/**
 * Delete a reservation by ID
 *
 * @async
 * @function deleteReservation
 * @param {import('express').Request} req - Params: `id`.
 * @param {import('express').Response} res
 * @returns {Promise<void>} Send 200 with the deleted reservation or 404 not found
 * @throws {CastError} Invalid ObjectId.
 * @throws {MongoServerError} Database error.
 * @throws {Error} Propagated by asyncHandler to error middleware.
 * @see ../utils/asyncHandler.js
 */
const deleteReservation = asyncHandler(async (req, res) => {
  const reservation = req.reservation;
  if (!reservation) {
    return res.status(404).json({
      message: 'Reservation not found.',
    });
  }

  const deletedReservation = await Reservation.findByIdAndDelete(reservation._id);

  if (deletedReservation) {
    return res.status(200).json({
      message: 'Reservation successfully deleted.',
      data: reservation,
    });
  }
  return res.status(404).json({
    message: 'Reservation not found.',
  });
});

export { addReservation, getAllReservation, getReservationById, updateReservation, deleteReservation };
