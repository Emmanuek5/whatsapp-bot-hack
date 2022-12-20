const fs = require('fs');


exports.log= (message,id) =>{
    // get the current date and time
    const now = new Date();
    const timestamp = `${now.toDateString()} ${now.toTimeString()}`;

    // format the message with the timestamp
    const logMessage = `[${timestamp}] ": ${id}":" ${message}\n`;

    // append the message to the log file
    fs.appendFileSync('./logs/'+id+'-log.txt', logMessage);
}

// example usage

