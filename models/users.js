import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      // match: [/*ATTENTION REGEX A RENSEIGNER*/, "Name should be a string"],
    },
    firstname: {
      type: String,
      trim: true,
      // match: [/*ATTENTION REGEX A RENSEIGNER*/, "Firstname should be a string"],
    },
    username: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "The username is required"],
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Your email is required"],
      unique: true,
      // match: [/*ATTENTION REGEX A RENSEIGNER*/, "Invalid email : {VALUE}"],
    },
    password: {
      type: String,
      required: [true, "A password is required"],
      minlength: [8, "Must be at least 8 character long : {VALUE}."],
      maxlength: [72, "Must not be longer than 72 characters : {VALUE}"],
      // match: [
      //   /*ATTENTION REGEX A RENSEIGNER*/,
      //   "Password must contain at least 1 uppercase, 1 lowercase and 1 number",
      // ],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
