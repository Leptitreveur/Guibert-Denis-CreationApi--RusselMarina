/**
 * Async handler wrapper for Express route handlers.
 *
 * Catches rejected promises from async function and forwards errors
 * to Express error middleware via `next(err)`.
 *
 * @function asyncHandler
 * @param {Function} fn - Async function to wrap (Express route handler).
 * @returns {Function} Express middleware function that handles async errors.
 * @throws {Error} Any error thrown by the wrapped async function.
 * @example
 * // Usage in route handlers
 * const getUsers = asyncHandler(async (req, res) => {
 *   const users = await User.find({});
 *   return res.json(users);
 * });
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export default asyncHandler;
