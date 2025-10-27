import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import asyncHandler from "../utils/asyncHandler.js";
import Users from "../models/users.js";

const SECRET_KEY = process.env.SECRET_KEY;

/**
 * Authentification function
 *
 * @async
 * @function authentification
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>} Promise that resolves when authentification is successful
 * @see ../utils/asyncHandler.js
 */
const authentification = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  let user = await Users.findOne({ email }, "-__v -createdAt -updatedAt").select("+password");

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      delete user._doc.password;

      const expiresIn = Math.floor(Date.now() / 1000) + (60 * 60 * 24);
      const token = jwt.sign({ 
        user: user 
        }, 
            SECRET_KEY, 
        {
            expiresIn: expiresIn,
      });

      res.header("Authorization", "Bearer " + token);

      return res.status(200).json({
          message: "Authentificate_succeded"
        });
    }

    return res.status(403).json({
      message: "Authentification failed",
    });
  }

  return res.status(404).json({
      message: "User not found",
  });
});

export default authentification;
