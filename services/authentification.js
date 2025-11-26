import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import asyncHandler from '../utils/asyncHandler.js';
import Users from '../models/users.js';

const SECRET_KEY = process.env.SECRET_KEY;

/**
 * authentication function
 *
 * @async
 * @function authentication
 * @param {import('express').Request} req - Request object. Body: `email`, `password` required.
 * @param {import('express').Response} res - Response object
 * @returns {Promise<void>} Send 200 with login status and JWT token stored in secure HTTP-only cookie named 'token' (expires in 24h), or error codes (400,403,404,500)
 * @throws {ValidationError} Mongoose validation failure
 * @throws {MongoServerError} Database error
 * @throws {Error} Propagated by asyncHandler to error middleware
 * @see ../utils/asyncHandler.js
 * @see ../routes/login.js For complete documentation (HTTP status codes, ...) for that service
 */
const authentication = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  let user = await Users.findOne({ email }).select('+password');

  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }

  if (!user.password) {
    return res.status(500).json({
      message: 'User password not found in database.',
      data: user,
    });
  }

  if (typeof password !== 'string' || typeof user.password !== 'string') {
    return res.status(400).json({
      message: 'Invalid password format.',
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    delete user._doc.password;

    const token = jwt.sign(
      {
        user: user,
      },
      SECRET_KEY,
      {
        expiresIn: '24h',
      }
    );

    res.cookie('token', token, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: 'Authentication succeeded',
      login: true,
    });
  }

  return res.status(403).json({
    message: 'Authentication failed.',
    login: false,
  });
});

export default authentication;
