const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  recipient: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  scheduleTime: { type: Date, required: true },
  attachments: { type: Array, default: [] },
  recurring: {
    type: {
      frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "quarterly"],
      },
      interval: { type: Number },
    },
    default: null,
  },
});

const Email = mongoose.model("Email", emailSchema);

module.exports = Email;
