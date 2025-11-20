import asyncHandler from '../utils/asyncHandler.js';
import BlackListedToken from '../models/blackListedToken.js';

/**
 * Handles logout
 *
 * @async
 * @function logout
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
