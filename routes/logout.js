import express from 'express';
import checkJWT from '../middlewares/private.js';
import logout from '../services/logout.js';

const router = express.Router();

/**
 * @route POST /logout
 * @description Disconnect user from his account
 * Requires JWT token in:
 * - Cookie: `token` (primary method, automatically sent by browser)
 * @access Private (JWT)
 * @returns {Object} Logout status with message and logout flag
 * @throws {401} Token required/revoked/invalid
 * @throws {401} Token not provided
 */
router.post('/', checkJWT, logout);

export default router;
