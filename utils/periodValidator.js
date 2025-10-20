import Reservation from "../models/reservation.js";
/**
 * ApiError structure for period validation conflicts.
 * @typedef {object} ApiError
 * @property {number} statusCode - HTTP status code (409).
 * @property {string} type - Error type ("CONFLICT").
 * @property {string} message - Error message.
 * @property {object} [details] - Additional error details.
 */


/**
 * Validate a period creation to prevent overlapping reservations.
 * 
 * @async
 * @function creationValidator
 * @param {string} catwayId - The catway ID to check for conflicts.
 * @param {Date} startDate - Starting date of the reservation.
 * @param {Date} endDate - Ending date of the reservation.
 * @returns {Promise<bool>} Returns true if period is valid.
 * @throws {ApiError} Conflict error with details.
 */
export async function creationValidator(catwayId, startDate, endDate) {
  const invalidPeriod = await Reservation.findOne({
    catwayId: catwayId,
    startDate: { $lt: endDate },
    endDate: { $gt: startDate },
  });

  if (invalidPeriod) {
    const error = {
      message: "Data conflict detected.",
      type: "CONFLICT",
      statusCode: 409,
      details: {
        catwayId: invalidPeriod.catwayId,
        existingPeriod: {
          start: invalidPeriod.startDate,
          end: invalidPeriod.endDate,
        },
        requestedPeriod: {
          start: startDate,
          end: endDate,
        },
      },
    };
    throw error;
  }

  return true;
}

/**
 * Validate an updated period to prevent overlapping reservations.
 * Exclude the current reservatioin being updated from conflict check.
 * 
 * @async
 * @function updateValidator
 * @param {string} catwayId - The catway ID to check for conflicts.
 * @param {Date} startDate - Starting date of the reservation.
 * @param {Date} endDate - Ending date of the reservation.
 * @param {string} excludeReservationId - Id reservation to exclude from check.
 * @returns {Promise<bool>} Returns true if update is valid.
 * @throws {ApiError} Conflict error with details. 
 */
export async function updateValidator(catwayId, startDate, endDate, excludeReservationId) {
  const invalidPeriod = await Reservation.findOne({
    catwayId: catwayId,
    startDate: { $lt: endDate },
    endDate: { $gt: startDate },
    _id: { $ne: excludeReservationId },
  });

  if (invalidPeriod) {
    const error = {
      message: "Data conflict detected.",
      type: "CONFLICT",
      statusCode: 409,
      details: {
        catwayId: invalidPeriod.catwayId,
        existingPeriod: {
          start: invalidPeriod.startDate,
          end: invalidPeriod.endDate,
        },
        requestedPeriod: {
          start: startDate,
          end: endDate,
        },
        updatingReservationId: excludeReservationId,
      },
    };
    throw error;
  }

  return true;
}
