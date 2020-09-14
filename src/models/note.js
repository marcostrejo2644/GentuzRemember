const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
  typeNote: { type: String, require: true },
  priority: { type: String, require: true },
  title: { type: String, require: true },
  description: { type: String, require: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Note", noteSchema);
