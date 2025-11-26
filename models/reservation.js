import mongoose from 'mongoose';
import calculateDuration from '../utils/dateCalculator.js';

const { Schema } = mongoose;

/**
 * Reservation Schema
 *
 * Represents the reservation in the system on a specified catway number.
 * Duration is automatically calculated before saving using startDate and endDate.
 *
 * @typedef {Object} reservationSchema
 * @property {number} catwayNumber - Catway's identification number (required, 1-3 digits)
 * @property {string} clientName - Client name who made the reservation (required, 1-60 characters)
 * @property {string} boatName - Boat name that will stay at the catway (required, 1-58 characters, alphanumeric with special characters allowed)
 * @property {Date} startDate - Reservation starting date (required, must be today or in the future)
 * @property {Date} endDate - Reservation ending date (required, must occur on or after startDate)
 * @property {number} duration - Reservation duration in days (auto-calculated by pre-save hook based on startDate and endDate, minimum 1)
 * @property {Date} createdAt - Document creation timestamp (auto-generated)
 * @property {Date} updatedAt - Document updated timestamp (auto-generated)
 */
const reservationSchema = new Schema(
  {
    catwayNumber: {
      type: Number,
      required: [true, `Catway's number is required.`],
      match: [/^\p{N}{1,3}$/u, 'Invalid catway number.'],
    },
    clientName: {
      type: String,
      trim: true,
      required: true,
      match: [/^[\p{L}](?:[\p{L}\p{M}\s'-]{0,58}[\p{L}])?$/u, 'Invalid client name.'],
    },
    boatName: {
      type: String,
      trim: true,
      maxlength: [58, 'Boat name can only be 58 characters long.'],
      required: [true, 'Please enter your boat name.'],
      match: [/^[\p{L}\p{N}](?:[\p{L}\p{M}\p{N}\s'-]{0,58}[\p{L}\p{N}])$/u, "Boat name can only be 58 characters long and contain only letter, number, '-' and space."],
    },
    startDate: {
      type: Date,
      required: [true, 'A starting date is required.'],
      validate: {
        validator: function (value) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return new Date(value) >= today;
        },
        message: 'Start date must be today or in the future.',
      },
    },
    endDate: {
      type: Date,
      required: [true, 'An end date is required.'],
      validate: {
        validator: async function (end) {
          let start = null;

          if (this instanceof mongoose.Query) {
            const update = this.getUpdate();
            start = update?.startDate;
            if (!start) {
              const currentDoc = await this.model.findOne(this.getFilter()).lean();
              start = currentDoc?.startDate;
            }
          } else {
            start = this.startDate;
          }

          if (!start) {
            return true;
          }

          return new Date(end) >= new Date(start);
        },
        message: 'End date must be on or after start date.',
      },
    },
    duration: {
      type: Number,
      min: [1, 'The minimum duration for a reservation is 1 day'],
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save hook: Calculate duration before saving
 *
 * Automatically calculates the duration of the reservation in days using startDate and endDate
 * before saving in the database. Only calculates if both startDate and endDate are present.
 *
 * @async
 * @function pre-save
 * @throws {Error} If duration calculation fails
 * @see ../utils/dateCalculator.js
 */
reservationSchema.pre('save', async function () {
  if (this.startDate && this.endDate) {
    this.duration = calculateDuration(this.startDate, this.endDate);
    if (this.duration === 0) {
      this.duration = 1;
    }
  }
});

/**
 * pre-findOneAndUpdate hook: calculate duration before updating
 *
 * Automatically calculate the duration based on updated startDate and endDate values
 * before saving in the database. If one of the value (startDate or endDate) is not update,
 * it uses the corresponding value from the existing document in the database to perform calculation.
 *
 * @async
 * @function pre-findOneAndUpdate
 * @throws {Error} If duration calculation fails or document not found
 * @see ../utils/dateCalculator.js
 */
reservationSchema.pre('findOneAndUpdate', async function () {
  const docToUpdate = await this.model.findOne(this.getFilter()).lean();
  const update = this.getUpdate();

  if (docToUpdate && (update.startDate || update.endDate)) {
    const newStartDate = update.startDate || docToUpdate.startDate;
    const newEndDate = update.endDate || docToUpdate.endDate;

    let calculatedDuration = calculateDuration(newStartDate, newEndDate);

    if (calculatedDuration === 0) {
      calculatedDuration = 1;
    }

    this.set({ duration: calculatedDuration });
  }
});

/**
 * Reservation model
 *
 * Mongoose model for Reservation documents
 *
 * @typedef {import('mongoose').Model<reservationSchema & import('mongoose').Document>} reservationModel
 */
const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
