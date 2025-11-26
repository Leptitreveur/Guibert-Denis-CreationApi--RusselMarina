import asyncHandler from '../utils/asyncHandler.js';
import Reservation from '../models/reservation.js';
import Catways from '../models/catways.js';

/**
 * Catway validation access by ID middleware
 *
 * Middleware that validates catway ID in params and  retrieves
 * the catway number. Stores the catway number on req.catwayNumber for later middlewares.
 *
 * @async
 * @function validateCatwayId
 * @param {import('express').Request} req - Request object - Params: 'id'
 * @param {import('express').Response} res - Response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {Promise<void>} Calls next() if validation succeeds, sets req.catwayNumber
 * @throws {400} Catway ID is required
 * @throws {400} Catway not found
 * @see ../utils/asyncHandler.js
 * @see ../models/catways.js
 */
export const validateCatwayId = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: 'catway ID is required',
    });
  }

  const catway = await Catways.findById(id);

  if (!catway) {
    return res.status(400).json({
      message: 'Catway not found.',
    });
  }

  const catwayNumber = catway.number;

  req.catwayNumber = catwayNumber;

  return next();
});

/**
 * Reservation validation access middleware
 *
 * Middleware that retrieves a reservation (if idReservation provided) and verifies it
 * belongs to the current catway (catwayNumber stored previously on req). Stores the reservation document
 * on req.reservation.
 *
 * @async
 * @function validateReservationId
 * @param {import('express').Request} req - Request object - (requires req.catwayNumber set by validateCatwayId)
 * @param {import('express').Response} res - Response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {Promise<void>} Calls next() if validation succeeds, sets req.reservation
 * @throws {400} The reservation does not belong to the specified catway
 * @throws {404} Reservation not found
 * @see ../utils/asyncHandler.js
 * @see ../models/reservation.js
 */
export const validateReservationId = asyncHandler(async (req, res, next) => {
  const catwayNumber = req.catwayNumber;
  const idReservation = req.params.idReservation || req.body.idReservation;

  if (!idReservation) {
    return next();
  }

  const reservationId = await Reservation.findById(idReservation);

  if (!reservationId) {
    return res.status(404).json({
      message: 'Reservation not found.',
    });
  }

  if (reservationId.catwayNumber !== catwayNumber) {
    return res.status(400).json({
      message: 'The reservation does not belong to the specified catway.',
    });
  }

  req.reservation = reservationId;

  return next();
});
