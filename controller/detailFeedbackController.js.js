const sequelize = require('../database/connect');
const detailFeedbackModel = require('../models/detailFeedbackModel');

exports.detailFeedback = (io) => {
    io.on('connection', (socket) => {
      console.log('a user connected with detail information');
  
      socket.on('languageUpdate', (data) => {
        console.log(data);
        detailFeedbackModel.update({
            language:data.language
          },
          {
              where: {uniqueId: data.uniqueId}
          }
        )
      });
      socket.on('priorExperienceUpdate', (data) => {
        console.log(data);
        detailFeedbackModel.update({
            priorExperience:data.priorExperience
          },
          {
              where: {uniqueId: data.uniqueId}
          }
        )
      });

      socket.on('detailProjectUpdate', (data) => {
        console.log(data);
        detailFeedbackModel.update({
            projects:data.project
          },
          {
              where: {uniqueId: data.uniqueId}
          }
        )
      });

      socket.on('techStackUpdate', (data) => {
        console.log(data);
        detailFeedbackModel.update({
            techStack:data.techStack
          },
          {
              where: {uniqueId: data.uniqueId}
          }
        )
      });
      
      socket.on('dsaQuestion1Update', (data) => {
        console.log(data);
        detailFeedbackModel.update({
            dsaQuestion1:data.dsaQuestion1
          },
          {
              where: {uniqueId: data.uniqueId}
          }
        )
      });
      
      socket.on('dsaAnswer1Update', (data) => {
        console.log(data);
        detailFeedbackModel.update({
            dsaAnswer1:data.dsaAnswer1
          },
          {
              where: {uniqueId: data.uniqueId}
          }
        )
      });
      
      socket.on('dsaQuestion2Update', (data) => {
        console.log(data);
        detailFeedbackModel.update({
            dsaQuestion2:data.dsaQuestion2
          },
          {
              where: {uniqueId: data.uniqueId}
          }
        )
      });
      
      socket.on('dsaAnswer2Update', (data) => {
        console.log(data);
        detailFeedbackModel.update({
            dsaAnswer2:data.dsaAnswer2
          },
          {
              where: {uniqueId: data.uniqueId}
          }
        )
      });
      
      socket.on('osQuestion1Update', (data) => {
        console.log(data);
        detailFeedbackModel.update({
            osQuestion1:data.osQuestion1
          },
          {
              where: {uniqueId: data.uniqueId}
          }
        )
      });
      
      socket.on('osAnswer1Update', (data) => {
        console.log(data);
        detailFeedbackModel.update({
            osAnswer1:data.osAnswer1
          },
          {
              where: {uniqueId: data.uniqueId}
          }
        )
      });
      
      socket.on('osQuestion2Update', (data) => {
        console.log(data);
        detailFeedbackModel.update({
            osQuestion2:data.osQuestion2
          },
          {
              where: {uniqueId: data.uniqueId}
          }
        )
      });
      
      socket.on('osAnswer2Update', (data) => {
        console.log(data);
        detailFeedbackModel.update({
            osAnswer2:data.osAnswer2
          },
          {
              where: {uniqueId: data.uniqueId}
          }
        )
      });
      
      socket.on('dbmsQuestion1Update', (data) => {
        console.log(data);
        detailFeedbackModel.update({
            dbmsQuestion1:data.dbmsQuestion1
          },
          {
              where: {uniqueId: data.uniqueId}
          }
        )
      });
      
      socket.on('dbmsAnswer1Update', (data) => {
        console.log(data);
        detailFeedbackModel.update({
            dbmsAnswer1:data.dbmsAnswer1
          },
          {
              where: {uniqueId: data.uniqueId}
          }
        )
      });
      
      socket.on('dbmsQuestion2Update', (data) => {
        console.log(data);
        detailFeedbackModel.update({
            dbmsQuestion2:data.dbmsQuestion2
          },
          {
              where: {uniqueId: data.uniqueId}
          }
        )
      });
      
      socket.on('dbmsAnswer2Update', (data) => {
        console.log(data);
        detailFeedbackModel.update({
            dbmsAnswer2:data.dbmsAnswer2
          },
          {
              where: {uniqueId: data.uniqueId}
          }
        )
      });
      
  
    });
};