import mongoose from 'mongoose';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * Parameter validation middleware
 *
 * Returns a middleware function that validate IDs and emails used to build the sub-routes.
 * Verifies if ID is a valid mongoose object and if email is regex valid.
 *
 * @param {string} layout - Selected sub-route being used (required, must be 'users', 'catways')
 * @returns {Function} Express middleware function that validates route parameters
 * @throws {400} Invalid email format
 * @throws {500} Invalid layout parameter
 * @throws {500} Invalid ID parameter
 * @see ../utils/asyncHandler.js
 */
function paramsValidation(layout) {
  return asyncHandler(async (req, res, next) => {
    if (!layout) {
      return res.status(500).json({
        message: 'Invalid layout parameter',
      });
    }
    if (layout !== 'catways' && layout !== 'users') {
      return res.status(500).json({
        message: 'Invalid layout parameter',
      });
    }

    if (layout === 'catways') {
      const { id } = req.params;
      const isValidId = mongoose.Types.ObjectId.isValid(id);
      if (!isValidId) {
        return res.status(400).json({
          message: 'Invalid ID parameter',
        });
      }
      return next();
    }

    if (layout === 'users') {
      const { email } = req.params;
      const emailRegex = /^[\w\_\-\.]+@[\w\-\.]+\.[a-zA-Z]{2,6}$/;

      if (!emailRegex.test(email)) {
        return res.status(400).json({
          message: 'Invalid Email format.',
        });
      }
      return next();
    }
  });
}

export default paramsValidation;
