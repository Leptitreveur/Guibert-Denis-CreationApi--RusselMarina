import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import asyncHandler from "../utils/asyncHandler.js";
import Users from "../models/users.js";

const SECRET_KEY = process.env.SECRET_KEY;

/**
 * Authentification function
 *
 * @async
 * @function authentificate
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>} Promise that resolves when authentification is successful
 * @see ../utils/asyncHandler.js
 */
const authentificate = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  let user = await Users.findOne({ email }).select("+password");

  if (!user) {
    return res.status(404).json({
        message: "User not found",
    });
  }

  if (!user.password) {
    return res.status(500).json({
      message: "User password not found in database.",
      data: user
    });
  }

  if (typeof password !== 'string' || typeof user.password !== 'string') {
    return res.status(400).json({
      message: "Invalid password format.",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    delete user._doc.password;

    const token = jwt.sign({ 
      user: user 
      }, 
          SECRET_KEY, 
      {
          expiresIn: "24h",
    });

    res.header("Authorization", "Bearer " + token);
    
    return res.status(200).json({
        message: "Authentificate_succeded"
      });
  }

  return res.status(403).json({
    message: "Authentification failed.",
    data: user.password
  });

});

export default authentificate;
