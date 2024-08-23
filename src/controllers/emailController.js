const Email = require("../models/Email");
const { scheduleEmail } = require("../services/schedulerService");

const scheduleEmailHandler = async (req, res) => {
  try {
    const email = new Email(req.body);
    await email.save();

    scheduleEmail(email);

    res.status(201).json({ message: "Email scheduled successfully", email });
  } catch (error) {
    console.log("Error scheduling email", error);
    res.status(500).json({ message: "Error scheduling email", error });
  }
};

const getAllScheduledEmails = async (req, res) => {
  try {
    const emails = await Email.find();
    res.status(200).json(emails);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving emails", error });
  }
};

const getScheduledEmailById = async (req, res) => {
  try {
    const email = await Email.findById(req.params.id);
    if (!email) return res.status(404).json({ message: "Email not found" });

    res.status(200).json(email);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving email", error });
  }
};

const deleteScheduledEmail = async (req, res) => {
  try {
    const email = await Email.findByIdAndDelete(req.params.id);
    if (!email) return res.status(404).json({ message: "Email not found" });

    res.status(200).json({ message: "Email deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting email", error });
  }
};

module.exports = {
  scheduleEmailHandler,
  getAllScheduledEmails,
  getScheduledEmailById,
  deleteScheduledEmail,
};
