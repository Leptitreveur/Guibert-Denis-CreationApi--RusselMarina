import express from 'express';
import checkJWT from '../middlewares/private.js';
import inputsValidation from '../middlewares/inputsValidation.js';
import paramsValidataion from '../middlewares/paramsValidation.js';
import { addCatway, getAllCatways, getCatwayById, updateCatway, deleteCatway } from '../services/catways.js';

const router = express.Router();

router.use(checkJWT);

/**
 * @route GET /catways
 * @description Retrieve all catways
 * @access Private (JWT)
 * @returns {Object} All catways data in a list
 * @throws {401} Token required/revoked/invalid
 * @throws {404} No catways were found
 */
router.get('/', getAllCatways);

/**
 * @route GET /catways/:id
 * @description Retrieve a catway by ID
 * @access Private (JWT)
 * @returns {Object} Catway data
 * @throws {400} Invalid ID
 * @throws {401} Token required/revoked/invalid
 * @throws {404} Catway not found
 * @throws {500} Invalid ID parameter
 * @throws {500} Invalid layout parameter
 */
router.get('/:id', paramsValidation('catways'), getCatwayById);

/**
 * @route POST /catways
 * @description Create a catway
 * @access Private (JWT)
 * @param {Object} body - Request body
 * @param {string} body.number - Catway's number
 * @param {string} body.type - Catway's type
 * @param {string} body.state - Catway's state
 * @returns {Object} Catway data newly created
 * @throws {400} Empty request
 * @throws {400} Unauthorized field(s) in the request
 * @throws {400} Missing required fields
 * @throws {400} Field must be a string
 * @throws {400} Rules not respected
 * @throws {401} Token required/revoked/invalid
 * @throws {409} This catway already exists
 * @throws {500} Validation's layout missing or invalid
 * @throws {500} Service layout must be a string and have one of this values: add, update, login
 */
router.post('/', inputsValidation('catways', 'add'), addCatway);

/**
 * @route PUT /catways/:id
 * @description Update a catway by ID
 * @access Private (JWT)
 * @param {Object} body - Request body
 * @param {string} body.state - Catway's state
 * @returns {Object} Updated catway data
 * @throws {400} Empty request
 * @throws {400} Unauthorized field(s) in the request
 * @throws {400} Missing required fields
 * @throws {400} Field must be a string
 * @throws {400} Rules not respected
 * @throws {401} Token required/revoked/invalid
 * @throws {404} Catway not found
 * @throws {500} Validation'layout missing or invalid
 * @throws {500} Service layout must be a string and have one of this values: add, update, login
 * @throws {500} Invalid ID parameter
 * @throws {500} Invalid layout parameter
 */
router.put('/:id', paramsValidation('catways'), inputsValidation('catways', 'update'), updateCatway);

/**
 * @route DELETE /catways/:id
 * @description Delete a catway by ID
 * @access Private (JWT)
 * @returns {Object} Deleted catway data
 * @throws {401} Token required/revoked/invalid
 * @throws {404} Catway not found
 * @throws {500} Invalid ID parameter
 * @throws {500} Invalid layout parameter
 */
router.delete('/:id', paramsValidation('catways'), deleteCatway);

export default router;
