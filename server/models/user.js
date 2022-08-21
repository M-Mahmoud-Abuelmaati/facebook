const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  token: {
    type: String,
  },
  nickname: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter an email"],
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  img: {
    type: String,
    default: "uploads/image-default.png",
  },
  coverImg: {
    type: String,
    default: "uploads/image-cover-default.jpg",
  },
  friends: [
    {
      friendName: { type: String },
      friendId: { type: String },
      to: { type: String },
    },
  ],
  friendRequests: [
    {
      friendName: { type: String },
      friendId: { type: String },
    },
  ],
  notifications: [
    {
      userId: { type: String },
      message: { type: String },
      to: { type: String },
    },
  ],
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email");
};

const User = mongoose.model("user", userSchema);

module.exports = { User };
