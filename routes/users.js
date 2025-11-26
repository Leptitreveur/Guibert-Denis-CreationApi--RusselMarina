import express from 'express';
import checkJWT from '../middlewares/private.js';
import inputsValidation from '../middlewares/inputsValidation.js';
import paramsValidation from '../middlewares/paramsValidation.js';
import { getAllUsers, getUserByEmail, addUser, updateUser, deleteUser } from '../services/users.js';

const router = express.Router();

/**
 * @route GET /users
 * @description Retrieve all users in a list
 * @access Private (JWT)
 * @returns {Object} List of all users
 * @throws {401} Token required/revoked/invalid
 * @throws {404} No users were found
 */
router.get('/', checkJWT, getAllUsers);

/**
 * @route GET /users/:email
 * @description Retrieve user by email
 * @access Private (JWT)
 * @param {string} params.email - user's email
 * @returns {Object} User's data
 * @throws {400} Invalid email format
 * @throws {401} Token required/revoked/invalid
 * @throws {404} User not found
 */
router.get('/:email', checkJWT, paramsValidation('users'), getUserByEmail);

/**
 * @route POST /users
 * @description Create a new user
 * @access Public
 * @param {Object} body - Request body
 * @param {string} body.name - User's name (optional)
 * @param {string} body.firstname - User's firstname (optional)
 * @param {string} body.username - User's username (required)
 * @param {string} body.email - User's email (required)
 * @param {string} body.password - User's password (required)
 * @returns {Object} User's data newly created
 * @throws {400} Empty request
 * @throws {400} Missing required fields
 * @throws {400} Unauthorized field(s)
 * @throws {400} Field must be a string
 * @throws {400} Rules not respected
 * @throws {400} Password contains sequential patterns
 * @throws {409} User already exists with this email or username
 * @throws {500} Validation's layout missing or invalid
 * @throws {500} Service layout must be a string and have one of this values: add, update, login
 */
router.post('/', inputsValidation('users', 'add'), addUser);

/**
 * @route PUT /users/:email
 * @description Update user's data by email. At least one field must be provided in order to perform an update.
 * @access Private (JWT)
 * @param {string} params.email - user's email
 * @param {Object} body - Request body
 * @param {string} [body.name] - New user's name (optional)
 * @param {string} [body.firstname] - New user's firstname (optional)
 * @param {string} [body.username] - New user's username (optional)
 * @param {string} [body.email] - New email (optional)
 * @param {string} [body.password] - New password (optional)
 * @returns {Object} User's data updated
 * @throws {400} Empty request - At least one field must be provided
 * @throws {400} Invalid email format
 * @throws {400} Unauthorized field(s)
 * @throws {400} Field must be a string
 * @throws {400} Rules not respected
 * @throws {400} Password contains sequential patterns
 * @throws {401} Token required/revoked/invalid
 * @throws {404} User not found
 * @throws {500} Validation's layout missing or invalid
 * @throws {500} Service layout must be a string and have one of this values: add, update, login
 */
router.put('/:email', checkJWT, paramsValidation('users'), inputsValidation('users', 'update'), updateUser);

/**
 * @route DELETE /users/:email
 * @description Delete a user's data by email
 * @access Private (JWT)
 * @param {string} params.email - user's email
 * @returns {Object} User's data deleted
 * @throws {400} Invalid email format
 * @throws {401} Token required/revoked/invalid
 * @throws {404} User not found
 */
router.delete('/:email', checkJWT, paramsValidation('users'), deleteUser);

export default router;
