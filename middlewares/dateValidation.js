import { parseIsoDateUTC, startOfDayUTC, endOfDayUTC, formatUTCDateToISO } from '../utils/dateFormatter.js';
import Reservation from '../models/reservation.js';

/**
 * Date validation middleware
 *
 * Validates and formats reservation dates (startDate, endDate) from the request body.
 * Retrieves existing dates from the reservation if dates are not provided but idReservation is.
 * Modifies req.body.startDate and req.body.endDate with UTC-formatted Date objects.
 *
 * @async
 * @function dateValidation
 * @param {import('express').Request} req - Request object
 * @param {string} [req.body.startDate] - Reservation starting date (ISO string YYYY-MM-DD, optional if idReservation provided)
 * @param {string} [req.body.endDate] - Reservation ending date (ISO YYYY-MM-DD, optional if idReservation provided)
 * @param {string} [req.body.idReservation] - Reservation ID to retrieve existing dates if none are provided (optional, must be valid and existing if provided)
 * @param {import('express').Response} res - Response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {Promise<void>} Calls next() middleware function if validation succeeds
 * @throws {400} Start and end reservation dates are required
 * @throws {400} Start and end dates must be ISO strings (YYYY-MM-DD)
 * @throws {400} Invalid date format
 * @throws {400} Start reservation date must occur before end's reservation date
 * @throws {400} Start reservation date must occur on or after today's date
 * @throws {404} Reservation not found
 * @see ../utils/dateFormatter.js For date formatting utilities
 * @see ../models/reservation.js For reservation model
 */
async function dateValidation(req, res, next) {
  let { startDate, endDate } = req.body;
  const { idReservation } = req.body;

  const reservation = await Reservation.findById(idReservation);

  if (idReservation && !reservation) {
    return res.status(404).json({
      message: 'Reservation not found.',
    });
  }

  if (!startDate && reservation) {
    const startUTC = reservation.startDate;
    startDate = formatUTCDateToISO(startUTC);
  }

  if (!endDate && reservation) {
    const endUTC = reservation.endDate;
    endDate = formatUTCDateToISO(endUTC);
  }

  if (!startDate || !endDate) {
    return res.status(400).json({
      message: 'Start and end reservation dates are required.',
    });
  }

  if (typeof startDate !== 'string' || typeof endDate !== 'string') {
    return res.status(400).json({
      message: 'Start and end dates must be ISO strings (YYYY-MM-DD).',
    });
  }

  const parsedStart = parseIsoDateUTC(startDate);
  const parsedEnd = parseIsoDateUTC(endDate);

  if (!parsedStart || !parsedEnd) {
    return res.status(400).json({
      message: 'Invalid date format.',
    });
  }

  const start = startOfDayUTC(parsedStart);
  const end = endOfDayUTC(parsedEnd);

  if (start.getTime() > end.getTime()) {
    return res.status(400).json({
      message: `Start reservation date must occur before end's reservation date.`,
    });
  }

  const todayUTC = startOfDayUTC(new Date());

  if (start.getTime() < todayUTC.getTime()) {
    return res.status(400).json({
      message: `Start reservation date must occur on or after today's date.`,
    });
  }

  req.body.startDate = start;
  req.body.endDate = end;

  next();
}

export default dateValidation;
