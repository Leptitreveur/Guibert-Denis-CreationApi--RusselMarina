import asyncHandler from '../utils/asyncHandler.js';
import BlackListedToken from '../models/blackListedToken.js';

/**
 * Handles logout
 *
 * @async
 * @function logout
 * @param {import('express').Request} req - Request object - Token must be provided via: Cookie `token`.
 * @param {import('express').Response} res - Response object
 * @returns {Promise<void>} Send 200 with logout status and clear the token in the cookie or error code (401)
 * @throws {ValidationError} Mongoose validation failure
 * @throws {MongoServerError} Database error
 * @throws {Error} Propagated by asyncHandler to error middleware.
 * @see ../utils/asyncHandler.js
 * @see ../routes/logout.js For complete documentation (HTTP status codes, ...) for that service
 */
const logout = asyncHandler(async (req, res) => {
  let token = req.cookies['token'];

  if (token) {
    token = token.replace(/^bearer\s+/i, '');
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

  res.clearCookie('token', {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });

  return res.status(200).json({
    message: 'Successfully logged out',
    logout: true,
  });
});

export default logout;
