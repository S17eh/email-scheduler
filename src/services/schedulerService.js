const cron = require("node-cron");
const Email = require("../models/Email");
const { sendEmail } = require("./emailService");
const { generateCronExpression } = require("../utils/cronUtils");

const scheduleEmail = (email) => {
  if (email.recurring) {
    scheduleRecurringEmail(email);
  } else {
    const scheduleDate = new Date(email.scheduleTime);
    // console.log("Generated Cron Expression:", cronExpression);
    const cronExpression = generateCronExpression(scheduleDate);
    console.log(
      "Generated Cron Expression for one-time email:",
      cronExpression
    );

    // Schedule the email using node-cron for one-time delivery
    const task = cron.schedule(
      generateCronExpression(scheduleDate),
      async () => {
        await sendEmail({
          from: process.env.EMAIL_USER,
          to: email.recipient,
          subject: email.subject,
          text: email.body,
          attachments: email.attachments,
        });
        console.log("Email sent successfully");

        await Email.findByIdAndDelete(email._id);
      }
    );
    // console.log("Cron task started");

    task.start();
  }
};

const scheduleRecurringEmail = (email) => {
  const cronExpression = generateCronExpression(email.recurring);
  console.log("Generated Cron Expression:", cronExpression);
  const task = cron.schedule(cronExpression, async () => {
    await sendEmail({
      from: process.env.EMAIL_USER,
      to: email.recipient,
      subject: email.subject,
      text: email.body,
      attachments: email.attachments,
    });
    console.log("Email sent successfully");
  });
  //   console.log("Cron task started");
  task.start();
};

module.exports = {
  scheduleEmail,
};
