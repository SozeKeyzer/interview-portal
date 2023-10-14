function getCurrentDay() {
        const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month (0 for January)
    const day = currentDate.getDate();
    
    const formattedMonth = String(month).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const dateString=`${year}-${formattedMonth}-${formattedDay}`;
    return dateString;
  
    // return timeString;
  }
  
module.exports=getCurrentDay;
 