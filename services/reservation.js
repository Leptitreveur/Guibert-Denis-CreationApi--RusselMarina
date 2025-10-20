import Reservation from "../models/reservation.js";
import asyncHandler from "../utils/asyncHandler.js";
import { creationValidator, updateValidator } from "../utils/periodValidator.js";

/**
 * Reservation CRUD handler.
 * 
 * All handlers are wrapped by asyncHandler, witch catches rejected promises
 * and forwards errors to Express via `next(err)`.
 * @see ../utils/asyncHandler.js
 */

/**
 * Create reservation
 * 
 * @async
 * @function addReservation
 * @param {import('express').Request} req - Body: `catwayId`, `clientName`, `boatName`, `startDate`, `endDate`, `duration`.
 * @param {import('express').Response} res
 * @returns {Promise<void>} 201 with reservation.
 * @throws {ApiError} Period conflic error from creationValidator..
 * @throws {ValidationError} Mongoose validation failure.
 * @throws {MongoServerError} Database error.
 * @throws {Error} Propagated by asyncHandler to error middleware.
 * @see ../utils/asyncHandler.js
 * @see ../utils/periodValidator.js
 */
const addReservation = asyncHandler(async (req, res) => {
  const { catwayId, clientName, boatName, startDate, endDate, duration } = req.body;

  await creationValidator(catwayId, startDate, endDate);

  const reservation = await Reservation.create({ catwayId, clientName, boatName, startDate, endDate, duration });

  return res.status(201).json({
    message: "Reservation successfully created.",
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
 * @returns {Promise<void>} Send 200 with array of  reservations or 404 if none found.
 * @throws {MongoServerError} Database error.
 * @throws {Error} Propagated by asyncHandler to error middleware.
 * @see ../utils/asyncHandler.js
 */
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

/**
 * Update a reservation by ID
 * use Mongoose `{runValidators: true, new: true}`
 * 
 * @async
 * @function updateReservation
 * @param {import('express').Request} req - Params: `id`; Body: `catwayId`, `clientName`, `boatName`, `startDate`, `endDate`, `duration`.
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
