import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/users.js";

/**
 * User CRUD handler.
 * 
 * All handlers are wrapped by asyncHandler, which catches rejected promises
 * and forwards errors to Express via `next(err)`.
 * @see ../utils/asyncHandler.js
 */

/**
 * Create user
 * 
 * @async
 * @function addUser
 * @param {import('express').Request} req - Request object - Body: `name`, `firstname`, `username`, `email`, `password`.
 * @param {import('express').Response} res - Response object
 * @returns {Promise<void>} Send 201 with the user or error codes (400,409)
 * @throws {ValidationError} Mongoose validation failure.
 * @throws {MongoServerError} Database error.
 * @throws {Error} Propagated by asyncHandler to error middleware.
 * @see ../utils/asyncHandler.js
 * @see ../routes/users.js For complete route documentation (HTTP status codes, ...) for that service
 */
const addUser = asyncHandler(async (req, res) => {
  const { name, firstname, username, email, password } = req.body;

  let existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    return res.status(409).json({
      message: "User already exists with this email or username.",
    });
  }

  const user = await User.create({ name, firstname, username, email, password });

  return res.status(201).json({
    message: "User successfully created.",
    data: user,
  });
});

/**
 * Retrieve all users.
 * 
 * @async
 * @function getAllUsers
 * @param {import('express').Request} req - Request object
 * @param {import('express').Response} res - Response object
 * @returns {Promise<void>} Send 200 with array of users or error codes (401,404)
 * @throws {MongoServerError} Database error.
 * @throws {Error} Propagated by asyncHandler to error middleware.
 * @see ../routes/users.js For complete route documentation (HTTP status codes, ...) for that service
 */
const getAllUsers = asyncHandler(async (req, res) => {
  let users = await User.find({});

  if (users.length > 0) {
    return res.status(200).json({
      message: "Users successfully found.",
      data: users,
    });
  }

  return res.status(404).json({
    message: "No users were found.",
  });
});

/**
 * Retrieve a user by email
 * 
 * @async
 * @function getUserByEmail
 * @param {import('express').Request} req - Request object - Params: `email`.
 * @param {import('express').Response} res - Response object
 * @returns {Promise<void>} Send 200 with the user or error codes (400,401,404)
 * @throws {MongoServerError} Database error.
 * @throws {Error} Propagated by asyncHandler to error middleware.
 * @see ../routes/users.js For complete route documentation (HTTP status codes, ...) for that service
 */
const getUserByEmail = asyncHandler(async (req, res) => {
  const email = req.params.email;

  let user = await User.findOne({ email });

  if (user) {
    return res.status(200).json({
      message: "User successfully found.",
      data: user,
    });
  }

  return res.status(404).json({
    message: "User not found.",
  });
});

/**
 * Update user by email
 * 
 * @async
 * @function updateUser
 * @param {import('express').Request} req - Request object - Params: `email`; Body: `name`, `firstname`, `username`, `email`, `password`.
 * @param {import('express').Response} res - Response object
 * @returns {Promise<void>} Send 200 with updated user or error codes (400,401,409)
 * @throws {ValidationError} Mongoose validation failure.
 * @throws {MongoServerError} Database error.
 * @throws {Error} Propagated by asyncHandler to error middleware.
 * @see ../utils/asyncHandler.js
 * @see ../routes/users.js For complete route documentation (HTTP status codes, ...) for that service
 */
const updateUser = asyncHandler(async (req, res) => {
  const { email } = req.params;

  const { name, firstname, username, email: newEmail, password } = req.body;

  const user = await User.findOneAndUpdate(
    { email },
    { name, firstname, username, email: newEmail, password },
    { runValidators: true, new: true }
  );

  if (user) {
    return res.status(200).json({
      message: "User successfully updated.",
      data: user,
    });
  }

  return res.status(404).json({
    message: "User not found.",
  });
});

/**
 * Delete user by email
 * 
 * @async
 * @function deleteUser
 * @param {import('express').Request} req - Request object - Params: `email`.
 * @param {import('express').Response} res - Response object
 * @returns {Promise<void>} Send 200 with deleted user or error codes (400,401,404)
 * @throws {MongoServerError} Database error.
 * @throws {Error} Propagated by asyncHandler to error middleware.
 * @see ../utils/asyncHandler.js
 * @see ../routes/users.js For complete route documentation (HTTP status codes, ...) for that service
 */
const deleteUser = asyncHandler(async (req, res) => {
  let email = req.params.email;

  let user = await User.findOneAndDelete({ email });

  if (user) {
    return res.status(200).json({
      message: "User successfully deleted.",
      data: user,
    });
  }

  return res.status(404).json({
    message: "User not found.",
  });
});

export { getAllUsers, getUserByEmail, addUser, updateUser, deleteUser };
