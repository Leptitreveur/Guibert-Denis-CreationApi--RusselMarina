import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import BlackListedToken from '../models/blackListedToken.js';

/**
 * Load SECRET_KEY
 *
 * Loads SECRET_KEY from environment variables
 */
const SECRET_KEY = process.env.SECRET_KEY;

/**
 * Check JWT validity
 *
 * Represents a middleware function that validates the access to the API by verifying a valid JWT token.
 * Tokens expire after 24 hours and are automatically renewed on each request.
 * Checks that the token is not in the current blacklisted token list.
 *
 * @async
 * @function checkJWT
 * @param {import('express').Request} req - Request object - Token must be provided via: Cookie `token`.
 * @param {import('express').Response} res - Response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {Promise<void>} Calls next() middleware function if validation succeeds, sets req.decoded and renews token in token cookie
 * @throws {401} token required/revoked/invalid
 * @see ../utils/asyncHandler.js
 * @see ../models/blackListedToken.js
 */
const checkJWT = asyncHandler(async (req, res, next) => {
  let token = req.cookies['token'];

  if (token) {
    token = token.replace(/^bearer\s+/i, '');
  }

  if (!token) {
    return res.status(401).json({
      message: 'token required!',
    });
  }

  const isBlackListedToken = await BlackListedToken.findOne({ token });
  if (isBlackListedToken) {
    return res.status(401).json({
      message: 'Token revoked',
    });
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: 'Invalid token',
      });
    }
    req.decoded = decoded;
    const newToken = jwt.sign(
      {
        user: decoded.user,
      },
      SECRET_KEY,
      {
        expiresIn: '24h',
      }
    );

    res.cookie('token', newToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    next();
  });
});

export default checkJWT;
