const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  task: { type: String, require: true },
  createdAt: { type: Date, default: new Date().toISOString() },
  completedAt: { type: Date, default: null },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Tasks", TodoSchema);
