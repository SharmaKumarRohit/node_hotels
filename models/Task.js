const mongoose = require("mongoose");

const taskSechema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["high", "medium", "low"],
    default: "medium",
  },
  dueDate: {
    type: Date,
    required: true,
  },
});

const Task = mongoose.model("Task", taskSechema);
module.exports = Task;
