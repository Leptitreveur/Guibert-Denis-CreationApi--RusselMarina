import mongoose from "mongoose";

const { Schema } = mongoose;

const catwaysSchema = new Schema({
  number: {
    type: Number,
    required: [true, "Catways number is required."],
    unique: true,
  },
  type: {
    type: String,
    enum: ["long", "short"],
    required: [true, "Catways type is required (long or short)."],
  },
  state: {
    type: String,
    minlength: [2, "Minimum catways description is required (ex: ok)."],
    maxlength: [200, "Please describe his state within 200 character max."],
    required: [true, "Catways state is required and must be between 2 to 200 character long."],
  }
})

const Catways = mongoose.model("Catways", catwaysSchema);

export default Catways;