import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      match: [/^[\p{L}](?:[\p{L}\p{M}\s'-]{0,58}[\p{L}])?$/u, 'Name should be a string'],
    },
    firstname: {
      type: String,
      trim: true,
      match: [/^[\p{L}](?:[\p{L}\p{M}\s'-]{0,58}[\p{L}])?$/u, 'Firstname should be a string'],
    },
    username: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'The username is required'],
      unique: true,
      match: [/^[\p{L}\p{N}].{3,16}$/u, 'Username should contain only letter and number without space'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Your email is required'],
      unique: true,
      match: [/^[\w\_\-\.]+@[\w\-\.]+\.[a-zA-Z]{2,6}$/, 'Invalid email : {VALUE}'],
    },
    password: {
      type: String,
      required: [true, 'A password is required'],
      minlength: [8, 'Must be at least 8 character long : {VALUE}.'],
      maxlength: [72, 'Must not be longer than 72 characters : {VALUE}'],
      match: [/^(?=.*\p{N})(?=.*\p{Ll})(?=.*\p{Lu})(?=.*[^a-zA-Z0-9])(?!.*\s).{8,72}$/u, 'Password must contain at least 1 uppercase, 1 lowercase and 1 number'],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model('User', userSchema);

export default User;
