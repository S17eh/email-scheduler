const express = require("express");
const {
  scheduleEmailHandler,
  getAllScheduledEmails,
  getScheduledEmailById,
  deleteScheduledEmail,
} = require("../controllers/emailController");

const router = express.Router();

// Schedule an email
router.post("/schedule-email", scheduleEmailHandler);

// Retrieve all scheduled emails
router.get("/scheduled-emails", getAllScheduledEmails);

// Retrieve a specific scheduled email
router.get("/scheduled-emails/:id", getScheduledEmailById);

// Delete a scheduled email
router.delete("/scheduled-emails/:id", deleteScheduledEmail);

module.exports = router;
