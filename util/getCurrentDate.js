function getCurrentTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
  
    // Format the time values to ensure two digits
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
  
    // Create a string representation of the current time
    const timeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  
    return timeString;
  }
  
module.exports=getCurrentTime;
  