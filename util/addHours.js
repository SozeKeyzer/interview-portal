function addHoursToTime(time, hoursToAdd) {
    // Split the time into hours and minutes components
    const [hours, minutes,seconds] = time.split(':').map(Number);
  
    // Calculate the new time by adding the hours and modulo operation to handle overflow
    const newHours = (hours + hoursToAdd) % 24;
  
    // Format the new time components to ensure two digits
    const formattedHours = String(newHours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
  
    // Return the new time in the 24-hour format
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
  
  module.exports = addHoursToTime;
  