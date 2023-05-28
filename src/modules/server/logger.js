const fs = require("fs");
const path = require("path");

exports.log = (message, id) => {
  // Get the current date and time
  const now = new Date();
  const timestamp = `${now.toDateString()} ${now.toTimeString()}`;

  // Format the message with the timestamp
  const logMessage = `[${timestamp}] ": ${id}":" ${message}\n`;
  console.log(logMessage);

  const logFilePath = `./logs/${id}-log.txt`;

  if (fs.existsSync(path.join(__dirname, logFilePath))) {
    fs.appendFileSync(path.join(__dirname, logFilePath), logMessage);
  } else {
    fs.writeFileSync(path.join(__dirname, logFilePath), logMessage);
  }
};
