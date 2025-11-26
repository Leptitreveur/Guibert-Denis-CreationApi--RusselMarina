import asyncHandler from '../utils/asyncHandler.js';
import Catways from '../models/catways.js';

/**
 * Catways CRUD handlers
 *
 * All handlers are wrapped by asyncHandler, which catches rejected promises
 * and forwards errors to Express via `next(err)`.
 * @see ../utils/asyncHandler.js
 */

/**
 * Create a catway
 *
 * @async
 * @function addCatway
 * @param {import('express').Request} req - Request object - Body: `number`, `type`, `state`.
 * @param {import('express').Response} res - Response object
 * @returns {Promise<void>} Send 201 with created catway or error code (409)
 * @throws {ValidationError} Mongoose validation failure.
 * @throws {MongoServerError} Database error (e.g., duplicate key).
 * @throws {Error} Propagated by asyncHandler to error middleware.
 * @see ../utils/asyncHandler.js
 * @see ../routes/catways.js For complete documentation (HTTP status codes, ...) for that service
 */
const addCatway = asyncHandler(async (req, res) => {
  const { number, type, state } = req.body;

  const existingCatway = await Catways.findOne({ number });

  if (existingCatway) {
    return res.status(409).json({
      message: 'This catway already exists.',
      data: existingCatway,
    });
  }

  const catway = await Catways.create({ number, type, state });

  return res.status(201).json({
    message: 'Catways successfully created.',
    data: catway,
  });
});

/**
 * Retrieve all existing catways
 *
 * @async
 * @function getAllCatways
 * @param {import('express').Request} req - Request object
 * @param {import('express').Response} res - Response object
 * @returns {Promise<void>} Send 200 with array of catways or error code (404)
 * @throws {MongoServerError} Database error.
 * @throws {Error} Propagated by asyncHandler to error middleware.
 * @see ../utils/asyncHandler.js
 * @see ../routes/catways.js For complete documentation (HTTP status codes, ...) for that service
 */
const getAllCatways = asyncHandler(async (req, res) => {
  let catways = await Catways.find({});

  if (catways.length > 0) {
    return res.status(200).json({
      message: 'Catways successfully found.',
      data: catways,
    });
  }

  return res.status(404).json({
    message: 'No catways were found.',
  });
});

/**
 * Retrieve a catway by ID
 *
 * @async
 * @function getCatwayById
 * @param {import('express').Request} req - Request object - Params: `id`.
 * @param {import('express').Response} res - Response object
 * @returns {Promise<void>} Send 200 with the catway or error codes (400,404)
 * @throws {CastError} Invalid ObjectId.
 * @throws {MongoServerError} Database error.
 * @throws {Error} Propagated by asyncHandler to error middleware.
 * @see ../utils/asyncHandler.js
 * @see ../routes/catways.js For complete documentation (HTTP status codes, ...) for that service
 */
const getCatwayById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: 'Invalid Id.',
    });
  }

  const catway = await Catways.findById(id);

  if (catway) {
    return res.status(200).json({
      message: 'Catway successfully found.',
      data: catway,
    });
  }

  return res.status(404).json({
    message: `Catway ${id} not found`,
  });
});

/**
 * Update a catway by ID
 *
 * Use Mongoose `{runValidators: true, new: true}`
 *
 * @async
 * @function updateCatway
 * @param {import('express').Request} req - Request object - Params: `id`; Body: `number`, `type`, `state`.
 * @param {import('express').Response} res - Response object
 * @returns {Promise<void>} Send 200 with the updated catway or error code (404)
 * @throws {ValidationError} Mongoose validation failure.
 * @throws {CastError} Invalid ObjectId.
 * @throws {MongoServerError} Database error.
 * @throws {Error} Propagated by asyncHandler to error middleware.
 * @see ../utils/asyncHandler.js
 * @see ../routes/catways.js For complete documentation (HTTP status codes, ...) for that service
 */
const updateCatway = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { number, type, state } = req.body;

  const catway = await Catways.findByIdAndUpdate(id, { number, type, state }, { runValidators: true, new: true });

  if (catway) {
    return res.status(200).json({
      message: 'Catway successfully updated.',
      data: catway,
    });
  }

  return res.status(404).json({
    message: `Catway ${id} not found`,
  });
});

/**
 * Delete a catway by ID
 *
 * @async
 * @function deleteCatway
 * @param {import('express').Request} req - Request object - Params: `id`.
 * @param {import('express').Response} res - Response object
 * @returns {Promise<void>} Send 200 with the deleted catway or error code (404)
 * @throws {CastError} Invalid ObjectId.
 * @throws {MongoServerError} Database error.
 * @throws {Error} Propagated by asyncHandler to error middleware.
 * @see ../utils/asyncHandler.js
 * @see ../routes/catways.js For complete documentation (HTTP status codes, ...) for that service
 */
const deleteCatway = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const catway = await Catways.findByIdAndDelete(id);

  if (catway) {
    return res.status(200).json({
      message: 'Catway successfully deleted.',
      data: catway,
    });
  }

  return res.status(404).json({
    message: `Catway ${id} not found`,
  });
});

export { addCatway, getAllCatways, getCatwayById, updateCatway, deleteCatway };
