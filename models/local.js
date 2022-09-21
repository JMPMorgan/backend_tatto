const { Schema, model } = require("mongoose");

const LocalSchema = Schema({
  name: {
    type: String,
    required: [true, "Local Name is required"],
  },
  schedule: {
    type: String,
    required: [true, "Schedule is Required"],
  },
  weekdays: {
    type: String,
    required: [true, "Weekdays is required"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  location: {
    type: String,
    required: [true, "Location is required"],
  },
  img: {
    type: String,
    required: [true, "Image is required"],
  },
});

module.exports = model("Local", LocalSchema);
