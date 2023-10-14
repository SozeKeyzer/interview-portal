const sequelize = require('../database/connect');
const realTimeFeedbackModel = require('../models/realTimeFeedbackModel');

exports.updateForm = (data) => {
  console.log(data);
  // return realTimeFeedbackModel.update(
  //   { destination: data.destination, time: data.time },
  //   { where: { id: data.id } }
  // );
};

exports.realTimeFeedback = (io) => {
  io.on('connection', (socket) => {
    console.log('a user connected');
  
    socket.on('realTimeFeedbackUpdate', (data) => {
      console.log(data);

      realTimeFeedbackModel.update({
        overallAnalysis:data.overallAnalysisInput,
        communication:data.communication
        },
        {
            where: {uniqueId: data.uniqueId}
        }
      )

    });
    socket.on('codingLanguageUpdate', (data) => {
      console.log(data);
      realTimeFeedbackModel.update({
        codingLanguage:data.codingLanguageInput
        },
        {
            where: {uniqueId: data.uniqueId}
        }
      )
    });
    socket.on('thinkingSpeedUpdate', (data) => {
      console.log(data);
      realTimeFeedbackModel.update({
        thinkingSpeed:data.thinkingSpeed
        },
        {
            where: {uniqueId: data.uniqueId}
        }
      )
    });
    socket.on('codingSpeedUpdate', (data) => {
      console.log(data);
      realTimeFeedbackModel.update({
        codingSpeed:data.codingSpeed
        },
        {
            where: {uniqueId: data.uniqueId}
        }
      )
    });
    socket.on('codeQualityUpdate', (data) => {
      console.log(data);
      realTimeFeedbackModel.update({
        codeQuality:data.codeQuality
        },
        {
            where: {uniqueId: data.uniqueId}
        }
      )
    });
    socket.on('concentrationUpdate', (data) => {
      console.log(data);
      realTimeFeedbackModel.update({
        concentration:data.concentration
        },
        {
            where: {uniqueId: data.uniqueId}
        }
      )
    });
    socket.on('operatingSystemUpdate', (data) => {
      console.log(data);
      realTimeFeedbackModel.update({
        os:data.operatingSystem
        },
        {
            where: {uniqueId: data.uniqueId}
        }
      )
    });
    socket.on('dbmsUpdate', (data) => {
      console.log(data);
      realTimeFeedbackModel.update({
        dbms:data.dbms
        },
        {
            where: {uniqueId: data.uniqueId}
        }
      )
    });
    socket.on('dataStructuresUpdate', (data) => {
      console.log(data);
      realTimeFeedbackModel.update({
        dataStructure:data.dataStructures
        },
        {
            where: {uniqueId: data.uniqueId}
        }
      )
    });
    socket.on('algorithmUpdate', (data) => {
      console.log(data);
      realTimeFeedbackModel.update({
        algorithm:data.algorithm
        },
        {
            where: {uniqueId: data.uniqueId}
        }
      )
    });
    socket.on('apptitudeUpdate', (data) => {
      console.log(data);
      realTimeFeedbackModel.update({
        apptitude:data.apptitude
        },
        {
            where: {uniqueId: data.uniqueId}
        }
      )
    });
    socket.on('personalityUpdate', (data) => {
      console.log(data);
      realTimeFeedbackModel.update({
        personalityAndBehaviour:data.personality
        },
        {
            where: {uniqueId: data.uniqueId}
        }
      )
    });
    socket.on('projectUpdate', (data) => {
      console.log(data);
      realTimeFeedbackModel.update({
        projectAndResume:data.project
        },
        {
            where: {uniqueId: data.uniqueId}
        }
      )
    });
    socket.on('realTimeAverageRating', (data) => {
      console.log(data);
      realTimeFeedbackModel.update({
        averageRating:data.avgRating
        },
        {
            where: {uniqueId: data.uniqueId}
        }
      )
    });

  });
};

