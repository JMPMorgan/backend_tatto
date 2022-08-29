const { Schema, model } = require("moongose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
  },
  password: {
    type: String,
    required: [
      true,
      "Password is required ,must be 8 Characters and include a character number and special character",
    ],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: "USER",
    enum: ["ADMIN", "ARTIST"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJson = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model("User", UserSchema);
