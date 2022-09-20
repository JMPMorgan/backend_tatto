const { Schema, model } = require("mongoose");

const MessageSchema = Schema({
  situation: {
    type: Number,
    required: true,
    default: 0,
  },
  creation_date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  converstaion: {
    type: Schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
  },
});

module.exports = model("Message", MessageSchema);
