const { Schema, model } = require("mongoose");

const CathegorySchema = Schema({
  name: {
    type: String,
    required: [true, "Name Cathegory is Required"],
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
});

module.exports = model("Cathegory", CathegorySchema);
