const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    priority: { type: String },
    status: { type: String },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
    tags: [String],
    completionDate: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: { createdAt: "createdOn", updatedAt: "updatedOn" } }
);

module.exports = mongoose.model("Task", taskSchema);
