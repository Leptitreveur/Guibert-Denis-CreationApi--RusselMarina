/**
 * ApiError structure for duration validation in reservation models
 * 
 * @typedef {object} ApiError
 * @property {string} message - error message.
 * @property {string} type - Error type ("BAD_REQUEST").
 * @property {number} statusCode - HTTP status code (400).
 * @property {object} [details] - Additional error details.
 */

/**
 * Calculate the duration of the reservation
 * 
 * @function calculateDuration
 * @param {Date} start - Starting date of the reservation.
 * @param {Date} end - Ending date of the reservation.
 * @returns {number} Duration of the reservation in days.
 * @throws {ApiError} Bad request error with details.
 */

function calculateDuration(start, end) {
  if (!start || !end) {
    const error = {
      message: "Start and end date are required",
      type: "BAD_REQUEST",
      statusCode: 400,
      details: {
        startDate: start,
        endDate: end,
      }
    }
    throw error;
  }
  const timeDifference = end - start;
  return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
}

export default calculateDuration;
