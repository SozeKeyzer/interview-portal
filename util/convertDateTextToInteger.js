function convertDate(date){
    var day=date.split(' ')[0];
    var month=date.split(' ')[1].split(',')[0];
    var year=date.split(' ')[2]

    var mn;
    switch(month)
      {
        case "January":
          mn=1;
          break;
        case "February":
          mn=2;
          break;
        case "March":
          mn=3;
          break;
        case "April":
          mn=4;
          break;
        case "May":
          mn=5;
          break;
        case "June":
          mn=6;
          break;
        case "July":
          mn=7;
          break;
        case "August":
          mn=8;
          break;
        case "September":
          mn=9;
          break;
        case "October":
          mn=10;
          break;
        case "November":
          mn=11;
          break;
        case "December":
          mn=12;
          break;
      }

    var dt=year+'-'+mn+'-'+day;
    return dt;
}

module.exports={convertDate}