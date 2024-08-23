const generateCronExpression = (schedule) => {
  let cronExpression;

  //   // Function to convert IST to UTC
  //   const istToUtc = (date) => {
  //     const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
  //     return new Date(date.getTime() - istOffset);
  //   };

  if (schedule instanceof Date) {
    // One-time schedule (convert Date to cron expression)
    // const utcDate = istToUtc(schedule);
    cronExpression = `${schedule.getMinutes()} ${schedule.getHours()} ${schedule.getDate()} ${
      schedule.getMonth() + 1
    } *`;
  } else if (typeof schedule === "object" && schedule.frequency) {
    // Recurring schedule
    const { frequency, interval, dayOfWeek, dayOfMonth } = schedule;

    switch (frequency) {
      case "daily":
        cronExpression = `0 ${interval} * * *`; // e.g., "0 14 * * *" for 2 PM daily
        break;
      case "weekly":
        cronExpression = `0 ${interval} * * ${dayOfWeek || 0}`; // e.g., "0 14 * * 1" for every Monday at 2 PM
        break;
      case "monthly":
        cronExpression = `0 ${interval} ${dayOfMonth || 1} * *`; // e.g., "0 14 28 * *" for the 28th of every month at 2 PM
        break;
      case "quarterly":
        cronExpression = `0 ${interval} ${dayOfMonth || 1} */3 *`; // e.g., "0 14 9 */3 *" for the 9th of every 3rd month at 2 PM
        break;
      default:
        throw new Error("Invalid frequency");
    }
  } else {
    throw new Error("Invalid schedule format");
  }

  return cronExpression;
};

module.exports = {
  generateCronExpression,
};
