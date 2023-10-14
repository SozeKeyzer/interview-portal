const currentDate = require('./getCurrentDay');
const currentTime = require('./getCurrentDate');
const fs = require("fs");

const direction = {
    1: '[LOG]',
    2: '[ERROR]',
    3: '[FATAL_ERROR]'
};

function logMessages(messageType, messageLevel, message) {
    var tabstringa = "";
    for (let i = 1; i < messageLevel; i++) {
        tabstringa += "\t"
    }
    
    const timestamp = `${currentDate()}_${currentTime()}`;
    console.log(timestamp);
    const data = `${tabstringa}${messageType} ${timestamp} ${message} \n`;
    // const filename = `output_${timestamp}.txt`;

        fs.appendFile('./error_logs/logs.txt', data, (error) => {
        if (error) {
            console.error('An error occurred:', error);
        } else {
            console.log('File has been written successfully.');
        }
    });
    
    console.log(tabstringa + messageType + "\t" + message)
}
// logMessages(direction[1], 1, "this that bla bla");
// logMessages(direction[2], 2, "table not found error");
// logMessages("[FATAL_ERROR]", 0 / 1 / 2, "ErrorMessage")

module.exports = {
    logMessages,
    direction
}




/*
Message Type - FATAL_ERROR, ERROR, LOG
Message - "[FATAL_ERROR]    Website crashed, service not working fine (apiName)", "[ERROR] Query results syntax error (apiName)", "[LOG] abs.hbs/ejs rendered"
*/

/*
[LOG_L1] "Hello"
    [LOG_L2] "World"
        [LOG_L3] "Utkrisht"
        [ERROR] "Error Message"

[ERROR] "Utkrisht"
*/

/*
New Folder Error Logs
Detect Fatal Error/Error
Dump Logs to a file with timesgtamp
*/