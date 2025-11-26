import express from 'express';
import checkJWT from '../middlewares/private.js';
import inputsValidation from '../middlewares/inputsValidation.js';
import dateValidation from '../middlewares/dateValidation.js';
import { validateCatwayId } from '../middlewares/validateAccess.js';
import { validateReservationId } from '../middlewares/validateAccess.js';
import { addReservation, getAllReservation, getReservationById, updateReservation, deleteReservation } from '../services/reservation.js';

const router = express.Router({ mergeParams: true });

router.use(checkJWT);
router.use(validateCatwayId);

/**
 * @route GET /catways/:id/reservations
 * @description Retrieve all reservation for a specified catway
 * @access Private (JWT)
 * @returns {Object} All reservations data for a specified catway in a list
 * @throws {400} Catway ID is required
 * @throws {400} Catway not found
 * @throws {401} Token required/revoked/invalid
 * @throws {404} No reservations were found
 */
router.get('/', getAllReservation);

/**
 * @route GET /catways/:id/reservations/:idReservation
 * @description Retrieve user's reservation by id for a specified catway
 * @access Private (JWT)
 * @returns {Object} User's reservation data for a specified catway
 * @throws {400} Catway ID is required
 * @throws {400} Catway not found
 * @throws {400} The reservation does not belong to the specified catway
 * @throws {401} Token required/revoked/invalid
 * @throws {404} Reservation not found
 */
router.get('/:idReservation', validateReservationId, getReservationById);

/**
 * @route POST /catways/:id/reservations
 * @description Create a reservation for a specified catway
 * @access Private (JWT)
 * @param {Object} body - Request body
 * @param {string} body.clientName - Client name onto the reservation (required)
 * @param {string} body.boatName - Client boat's name (required)
 * @param {string} body.startDate - Reservation starting date (required)
 * @param {string} body.endDate - Reservation ending date (required)
 * @returns {Object} Reservation data newly created including catway number and duration
 * @throws {400} Catway number is missing
 * @throws {400} Start and end reservation dates are required
 * @throws {400} Start and end dates must be ISO strings (YYYY-MM-DD)
 * @throws {400} Invalid date format
 * @throws {400} Start reservation date must occur before end's reservation date
 * @throws {400} Start reservation date must occur on or after end reservation date
 * @throws {400} Catway ID is required
 * @throws {400} Catway not found
 * @throws {400} Empty request
 * @throws {400} Unauthorized field(s) in the request
 * @throws {400} Missing required fields
 * @throws {400} Field must be a string
 * @throws {400} Rules not respected
 * @throws {401} Token required/revoked/invalid
 * @throws {404} Reservation not found
 * @throws {409} Data conflict detected
 * @throws {500} Validation's layout missing or invalid
 * @throws {500} Service layout must be a string and have one of this values: add, update, login
 */
router.post('/', inputsValidation('reservations', 'add'), dateValidation, addReservation);

/**
 * @route PUT /catways/:id/reservations
 * @description Update a reservation for a specified catway
 * @access Private (JWT)
 * @param {Object} body - Request body
 * @param {string} body.idReservation - Mongoose reservation ID
 * @param {string} body.startDate - Reservation starting date (required)
 * @param {string} body.endDate - Reservation ending date (required)
 * @returns {Object} Updated reservation data including catwayNumber and duration
 * @throws {400} Start and end reservation dates are required
 * @throws {400} Start and end dates must be ISO strings (YYYY-MM-DD)
 * @throws {400} Invalid date format
 * @throws {400} Start reservation date must occur before end's reservation date
 * @throws {400} Start reservation date must occur on or after end reservation date
 * @throws {400} Catway ID is required
 * @throws {400} Catway not found
 * @throws {400} Empty request
 * @throws {400} Unauthorized field(s) in the request
 * @throws {400} Missing required fields
 * @throws {401} Token required/revoked/invalid
 * @throws {404} Reservation not found
 * @throws {409} Data conflict detected
 * @throws {500} Validation's layout missing or invalid
 * @throws {500} Service layout must be a string and have one of this values: add, update, login
 */
router.put('/', inputsValidation('reservations', 'update'), dateValidation, updateReservation);

/**
 * @route DELETE /catways/:id/reservations/:idReservation
 * @description Delete a reservation by id for a specified catways
 * @access Private (JWT)
 * @returns {Object} Reservation data deleted
 * @throws {400} Catway ID is required
 * @throws {400} Catway not found
 * @throws {400} The reservation does not belong to the specified catway
 * @throws {401} Token required/revoked/invalid
 * @throws {404} Reservation not found
 */
router.delete('/:idReservation', validateReservationId, deleteReservation);

export default router;
