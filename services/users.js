import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/users.js";

const getAllUsers = asyncHandler(async (req, res) => {
  let users = await User.find({});
  if (users.length > 0) {
    return res.status(200).json({
      message: "Users successfully found",
      data: users,
    });
  }

  return res.status(404).json({
    message: "no users were found",
  });
});

const getUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  let user = await User.findById(id);

  if (user) {
    return res.status(200).json({
      message: "User successfully found",
      data: user,
    });
  }

  return res.status(404).json({
    message: "User not found.",
  });
});

const createUser = asyncHandler(async (req, res) => {
  // Validation des données requises
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
    message: "User's email not found.",
  });
});

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
    message: "User's email not found",
  });
});

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
