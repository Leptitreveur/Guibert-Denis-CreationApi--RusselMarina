import asyncHandler from "../utils/asyncHandler.js";
import Catways from "../models/catways.js";

/**
 * Catways CRUD handlers
 * 
 * All handlers are wrapped by asyncHandler, witch catches rejected promises
 * and forwards errors to Express via `next(err)`.
 * @see ../utils/asyncHandler.js
*/

/**
 * Create a catway
 * 
 * @async
 * @function addCatway
 * @param {import('express').Request} req - Body: `number`, `type`, `state`.
 * @param {import('express').Response} res
 * @returns {Promise<void>} Send 201 with created catway or 409 if it already exists.
 * @throws {ValidationError} Mongoose validation failure.
 * @throws {MongoServerError} Database error (e.g., duplicate key).
 * @throws {Error} Propagated by asyncHandler to error middleware.
 * @see ../utils/asyncHandler.js
*/
const addCatway = asyncHandler(async (req, res) => {
  const { number, type, state } = req.body;
  
  const existingCatway = await Catways.findOne({ number });
  
  if (existingCatway) {
    return res.status(409).json({
      message: "This catway already exist.",
      data: existingCatway,
    });
  }
  
  const catway = await Catways.create({ number, type, state });
  
  return res.status(201).json({
    message: "Catways successfully created.",
    data: catway,
  });
});

/**
 * Retrieve all existing catways
 * 
 * @async
 * @function getAllCatways
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>} Send 200 with array of catways or 404 if none found.
 * @throws {MongoServerError} Database error.
 * @throws {Error} Propagated by asyncHandler to error middleware.
 * @see ../utils/asyncHandler.js
*/
const getAllCatways = asyncHandler(async (req, res) => {
  let catways = await Catways.find({});
  
  if (catways.length > 0) {
    return res.status(200).json({
      message: "Catways successfully found.",
      data: catways,
    });
  }
  
  return res.status(404).json({
    message: "No catways were found.",
  });
});

/**
 * Retrieve a catway by ID
 * 
 * @async
 * @function getCatwayById
 * @param {import('express').Request} req - Params: `id`.
 * @param {import('express').Response} res
 * @returns {Promise<void>} Send 200 with the catway or 404 if not found.
 * @throws {CastError} Invalid ObjectId.
 * @throws {MongoServerError} Database error.
 * @throws {Error} Propagated by asyncHandler to error middleware.
 * @see ../utils/asyncHandler.js
*/
const getCatwayById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: 'Invalid Id.'
    })
  }
  
  const catway = await Catways.findById(id);
  
  if (catway) {
    return res.status(200).json({
      message: "Catway successfully found.",
      data: catway,
    });
  }
  
  return res.status(404).json({
    message: "Catway not found.",
  });
});

/**
 * Update a catway by ID
 * 
 * Use Mongoose `{runValidators: true, new: true}`
 * 
 * @async
 * @function updateCatway
 * @param {import('express').Request} req - Params: `id`; Body: `number`, `type`, `state`.
 * @param {import('express').Response} res
 * @returns {Promise<void>} Send 200 with the updated catway or 404 if not found.
 * @throws {ValidationError} Mongoose validation failure.
 * @throws {CastError} Invalid ObjectId.
 * @throws {MongoServerError} Database error.
 * @throws {Error} Propagated by asyncHandler to error middleware. 
 * @see ../utils/asyncHandler.js
*/
const updateCatway = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { number, type, state } = req.body;
  
  const catway = await Catways.findByIdAndUpdate(id, { number, type, state }, { runValidators: true, new: true });
  
  if (catway) {
    return res.status(200).json({
      message: "Catway successfully updated.",
      data: catway,
    });
  }
  
  return res.status(404).json({
    message: `Could not find catway ${id} to update.`,
  });
});

/**
 * Delete a catway by ID
 * 
 * @async
 * @function deleteCatway
 * @param {import('express').Request} req - Params: `id`.
 * @param {import('express').Response} res
 * @returns {Promise<void>} Send 200 with the deleted catway or 404 not found
 * @throws {CastError} Invalid ObjectId.
 * @throws {MongoServerError} Database error.
 * @throws {Error} Propagated by asyncHandler to error middleware.
 * @see ../utils/asyncHandler.js
*/
const deleteCatway = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const catway = await Catways.findByIdAndDelete(id);

  if (catway) {
    return res.status(200).json({
      message: "Catway successfully deleted.",
      data: catway,
    });
  }

  return res.status(404).json({
    message: `Could not find catway ${id} to delete`,
  });
});

export { addCatway, getAllCatways, getCatwayById, updateCatway, deleteCatway };
