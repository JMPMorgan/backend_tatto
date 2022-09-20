const { Schema, model } = require("mongoose");

const CathegoryLocalSchema = Schema({
  cathegory: {
    type: Schema.Types.ObjectId,
    ref: "Cathegory",
    required: true,
  },
  local: {
    type: Schema.Types.ObjectId,
    ref: "Local",
    required: true,
  },
  creation_date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = model("CathegoryLocal", CathegoryLocalSchema);
