/**
 * Period validator utilities
 *
 * Provides functions to validate reservation periods and prevent overlapping
 * reservations on the same catway.
 */

import Reservation from '../models/reservation.js';

/**
 * ApiError structure for period validation conflicts.
 * @typedef {Object} ApiError
 * @property {number} statusCode - HTTP status code (409).
 * @property {string} type - Error type ("CONFLICT").
 * @property {string} message - Error message.
 * @property {Object} [details] - Additional error details.
 */

/**
 * Validates a period creation to prevent overlapping reservations.
 *
 * @async
 * @function creationValidator
 * @param {number} catwayNumber - The catway number to check for conflicts.
 * @param {Date} startDate - Starting date of the reservation.
 * @param {Date} endDate - Ending date of the reservation.
 * @returns {Promise<boolean>} Returns true if period is valid.
 * @throws {ApiError} Conflict error with details.
 */
export async function creationValidator(catwayNumber, startDate, endDate) {
  const invalidPeriod = await Reservation.findOne({
    catwayNumber: catwayNumber,
    startDate: { $lt: endDate },
    endDate: { $gt: startDate },
  });

  if (invalidPeriod) {
    const error = {
      message: 'Data conflict detected.',
      type: 'CONFLICT',
      statusCode: 409,
      details: {
        catwayNumber: invalidPeriod.catwayNumber,
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
 * Validates an updated period to prevent overlapping reservations.
 * Excludes the current reservation being updated from conflict check.
 *
 * @async
 * @function updateValidator
 * @param {number} catwayNumber - The catway number to check for conflicts.
 * @param {Date} startDate - Starting date of the reservation.
 * @param {Date} endDate - Ending date of the reservation.
 * @param {string} excludeIdReservation - Id reservation to exclude from check.
 * @returns {Promise<boolean>} Returns true if update is valid.
 * @throws {ApiError} Conflict error with details.
 */
export async function updateValidator(catwayNumber, startDate, endDate, excludeIdReservation) {
  const invalidPeriod = await Reservation.findOne({
    catwayNumber: catwayNumber,
    startDate: { $lt: endDate },
    endDate: { $gt: startDate },
    _id: { $ne: excludeIdReservation },
  });

  if (invalidPeriod) {
    const error = {
      message: 'Data conflict detected.',
      type: 'CONFLICT',
      statusCode: 409,
      details: {
        catwayNumber: invalidPeriod.catwayNumber,
        existingPeriod: {
          start: invalidPeriod.startDate,
          end: invalidPeriod.endDate,
        },
        requestedPeriod: {
          start: startDate,
          end: endDate,
        },
        updatingidReservation: excludeIdReservation,
      },
    };
    throw error;
  }

  return true;
}
