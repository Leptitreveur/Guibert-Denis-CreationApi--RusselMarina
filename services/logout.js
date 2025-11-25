import asyncHandler from '../utils/asyncHandler.js';
import BlackListedToken from '../models/blackListedToken.js';

/**
 * Handles logout
 *
 * @async
 * @function logout
 * @param {import('express').Request} req - Request object. Headers: `x-access-token` or `authorization` (with "Bearer " prefix) required.
 * @param {import('express').Response} res - Response object
 * @returns {Promise<void>} Send 200 with logout status or error code (401)
 * @throws {ValidationError} Mongoose validation failure
 * @throws {MongoServerError} Database error
 * @throws {Error} Propagated by asyncHandler to error middleware.
 * @see ../utils/asyncHandler.js
 * @see ../routes/logout.js For complete documentation (HTTP status codes, ...) for that service
 */
const logout = asyncHandler(async (req, res) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (token && token.startsWith('bearer ')) {
    token = token.slice(7, token.length);
  }

  if (!token) {
    return res.status(401).json({
      message: 'Token not provided.',
    });
  }

  const existingToken = await BlackListedToken.findOne({ token });

  if (existingToken) {
    return res.status(200).json({
      message: 'Already logged out.',
      logout: true,
    });
  }
  await BlackListedToken.create({ token });

  return res.status(200).json({
    message: 'Successfully logout',
    logout: true,
  });
});

export default logout;
