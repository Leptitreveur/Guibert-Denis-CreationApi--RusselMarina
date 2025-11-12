import mongoose from 'mongoose';
import calculateDuration from '../utils/dateCalculator.js';

const { Schema } = mongoose;

const reservationSchema = new Schema(
  {
    catwayId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Catways',
      required: [true, 'Catway ID is required.'],
      match: [/^[0-9a-fA-F]{24}$/, 'Invalid catway ID.'],
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
        validator: async function (value) {
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

          return new Date(value) > new Date(start);
        },
        message: 'End date must be after start date.',
      },
    },
    duration: {
      type: Number,
      min: [0, 'The minimum duration for a reservation is 1 day'],
    },
  },
  {
    timestamps: true,
  }
);

reservationSchema.pre('save', async function () {
  if (this.startDate && this.endDate) {
    this.duration = calculateDuration(this.startDate, this.endDate);
  }
});

reservationSchema.pre('findOneAndUpdate', async function () {
  const docToUpdate = await this.model.findOne(this.getFilter()).lean();
  const update = this.getUpdate();

  if (docToUpdate && (update.startDate || update.endDate)) {
    const newStartDate = update.startDate || docToUpdate.startDate;
    const newEndDate = update.endDate || docToUpdate.endDate;

    this.set({ duration: calculateDuration(newStartDate, newEndDate) });
  }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
