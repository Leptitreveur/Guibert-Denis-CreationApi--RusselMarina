import express from 'express';
import authentication from '../services/authentication.js';
import inputsValidation from '../middlewares/inputsValidation.js';

const router = express.Router();

/**
 * @route POST /login
 * @description Connect the user to his account
 * @access Public
 * @param {Object} body - Request body
 * @param {string} body.email - User's email (required)
 * @param {string} body.password - User's password (required)
 * @returns {Object} Login status with message, login flag and JWT token in secure HTTP-only Cookie named `token`
 * @throws {400} Empty request
 * @throws {400} Invalid password format
 * @throws {400} Missing required fields
 * @throws {403} authentication failed
 * @throws {404} User not found
 * @throws {500} Validation's layout missing or invalid
 * @throws {500} Service layout must be a string and have one of this values: add, update, login
 * @throws {500} User password not found in database
 */
router.post('/', inputsValidation('login', 'login'), authentication);

export default router;
