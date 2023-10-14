
const realTimeFeedbackModel = require("../models/realTimeFeedbackModel");


async function realTimeDisplay(io,uniqueId){
    console.log("lsjfoslkjf");
    console.log(uniqueId);
    io.on('connection', (socket) => {
        // console.log("lsjfoslkjf");
      console.log('a user connected');
    
      socket.on('updateFormFields', async () => {
    
        const updatedData = await realTimeFeedbackModel.findOne({
            where:{
                uniqueId:uniqueId
            }
        }); 
    
        console.log(updatedData);
        // io.emit('formFieldsUpdated', updatedData);
      });
    
      // Handle client disconnections
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
  
    });
  };

  module.exports = realTimeDisplay;
  
  