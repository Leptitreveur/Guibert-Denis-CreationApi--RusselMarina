import asyncHandler from "../utils/asyncHandler.js";

const validateObjectId = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const objectIdRegex = [^[\w]]
}