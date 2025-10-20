import asyncHandler from "../utils/asyncHandler.js";
import Catways from "../models/catways.js";

// create catways
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

// get all catways
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
// get one catways
const getCatwayById = asyncHandler(async (req, res) => {
  const { id } = req.params;

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

// update catways
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

// delete catways
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
