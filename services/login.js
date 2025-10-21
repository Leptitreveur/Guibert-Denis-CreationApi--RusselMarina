import asyncHandler from "../utils/asyncHandler.js";


/**
 * Handles login into tha app
 * 
 * @async
 * @function Login
 * @return {object} user's email returned if logged in successfully
 */
const loginRoute = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error("Email and password required");
    error.status(400);
    throw error;
  }

  res.status(200).json({
    message: "Succefull login",
    received: { email },
  });
});

export default loginRoute;
