const { Schema, model } = require("mongoose");

const PostsSchema = Schema({
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  creation_date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  local: {
    type: Schema.Types.ObjectId,
    ref: "Local",
    required: true,
  },
  img: {
    type: String,
    required: [true, "Image is required"],
  },
});

module.exports = model("Posts", PostsSchema);
