import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Catway Schema
 *
 * Represents the catway in the system with identification number, type and state.
 *
 * @typedef {Object} catwaysSchema
 * @property {number} number - Catway's unique identification number (required, 1-3 digits)
 * @property {string} type - Catway's type (required, must be "long" or "short")
 * @property {string} state - Catway's current state description (required, 2-200 characters)
 * @property {Date} createdAt - Document creation timestamp (auto-generated)
 * @property {Date} updatedAt - Document updated timestamp (auto-generated)
 */
const catwaysSchema = new Schema(
  {
    number: {
      type: Number,
      required: [true, 'Catways number is required.'],
      unique: true,
      match: [/^\p{N}{1,3}$/u, 'Invalid catway number.'],
    },
    type: {
      type: String,
      enum: ['long', 'short'],
      required: [true, 'Catways type is required (long or short).'],
    },
    state: {
      type: String,
      minlength: [2, 'Minimum catways description is required (ex: ok).'],
      maxlength: [200, 'Please describe his state within 200 character max.'],
      required: [true, 'Catways state is required and must be between 2 to 200 character long.'],
      match: [/^\p{L}(?:[\p{L}\p{M}\p{N}\s':;,"()-.!]{0,200}[\p{L}.!])$/u, 'Catway state should be describe within 2 to 200 characters long'],
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Catways model
 *
 * Mongoose model for Catways documents
 *
 * @typedef {import('mongoose').Model<catwaysSchema & import('mongoose').Document>} CatwaysModel
 */
const Catways = mongoose.model('Catways', catwaysSchema);

export default Catways;
