import mongoose from "mongoose";
import calculateDuration from "../utils/dateCalculator.js";

const { Schema } = mongoose;

const reservationSchema = new Schema(
  {
    catwayId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Catways",
      required: [true, "Catway ID is required."],
    },
    clientName: {
      type: String,
      trim: true,
      required: true,
    },
    boatName: {
      type: String,
      trim: true,
      required: [true, "Please entre your boat name."],
      match: [, /*ATTENTION REGEX A RENSEIGNER*/ "Name should be a string"],
    },
    startDate: {
      type: Date,
      required: [true, "A starting date is required."],
      validate: {
        validator: function (value) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return value >= today;
        },
        message: "Start date must be today or in the futur.",
      },
    },
    endDate: {
      type: Date,
      required: [true, "An end date i required."],
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "End date must be after start date.",
      },
    },
    duration: {
      type: Number,
      min: [0, "The minimum duration for a reserevation is 1 day"],
    }
  },
  {
    timestamps: true,
  }
);

reservationSchema.pre('save', async function(){
  if (this.startDate && this.endDate) {
    this.duration = calculateDuration(this.startDate, this.endDate);
  }
});

reservationSchema.pre('findOneAndUpdate', async function () {
  const docToUpdate = await this.model.findOne(this.getFilter());
  const update = this.getUpdate();

  if ( docToUpdate && ( update.startDate || update.endDate)) {
    const newStartDate = update.startDate || docToUpdate.startDate;
    const newEndDate = update.endDate || docToUpdate.endDate;

    this.set({ duration: calculateDuration(newStartDate, newEndDate)});
  }
})

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
