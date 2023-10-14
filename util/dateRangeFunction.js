function runFunctionForDateRange(startDate, endDate, myFunction) {
    const dayInMillis = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    let currentDate = new Date(startDate); // Initialize current date to start date
  
    // Loop through the range of dates
    while (currentDate <= endDate) {
      // Call your function with the current date as an argument
      myFunction(currentDate);
  
      // Increment the current date by one day
      currentDate.setTime(currentDate.getTime() + dayInMillis);
    }
  }

module.exports={runFunctionForDateRange}