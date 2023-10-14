const hrModel = require('../models/hrModel');
const express = require('express');
const subHrModel = require('../models/subHrModel');
const bcrypt = require('bcryptjs');
const categoryModel = require('../models/categoryModel');
const topicModel = require('../models/topicModel');
const selectedProduct = require('../models/selectedProduct');
const categoryRoundModel = require('../models/categoryRoundModel');
const interviewDataModel = require('../models/interviewDataModel');
const {
    v4: uuidv4
} = require('uuid');
const nodemailer = require('nodemailer');
const interviewerModel = require('../models/interviewerModel');
const freeSlotModel = require('../models/freeSlotModel');
const currentTime = require('../util/getCurrentDate');
const socketIO = require('socket.io');
const realTimeFeedbackModel = require('../models/realTimeFeedbackModel');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const displayRealTimeController = require('./diplayRealTimeController');
const currentDay=require('../util/getCurrentDay');
const {
    where
} = require('sequelize');
const detailFeedbackModel = require('../models/detailFeedbackModel');
const unscheduledModel = require('../models/unscheduledModel');
const loggingMessages=require('../util/logs');
const addHoursToTime=require('../util/addHours');
const {
    data
} = require('jquery');
// const io = socketIO(server);
// const JitsiMeetExternalAPI = require('lib-jitsi-meet/dist/lib-jitsi-meet.min').JitsiMeetExternalAPI;
const full_payment_hours=12;
const half_payment_hours=5;
const no_payment_hours=2;


module.exports = {
    getHrRegister: (req, res) => {
        res.render('hrRegister', {
            invalidDetails: false,
            userNotFound: false,
            userNotValidated: false
        });

    },
    postHrRegister: (req, res) => {
        const {
            userName,
            emailId,
            contactNumber,
            companyName,
            companyAddress,
            companyCity,
            companyPincode,
            companyState,
            companyCountry,
            companyGSTNumber,
            companyLinkedIn,
            companyAdditionalLink
        } = req.body;
        hrModel.create({
                userName,
                emailId,
                contactNumber,
                companyName,
                companyAddress,
                companyCity,
                companyPincode,
                companyState,
                companyCountry,
                companyGSTNumber,
                companyLinkedIn,
                companyAdditionalLink
            })
            .then(user => {
                console.log('post request'),
                    res.redirect('/')
            })
            .catch(error => {
                console.log(error)
            });
    },
    postHrLogin: (req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        hrModel.findOne({
                where: {
                    emailId: email
                }
            }).then(user => {
                if (!user) {
                    loggingMessages.logMessages(loggingMessages.direction[1],1,"Invalid user");
                    res.render('hrRegister', {
                        invalidDetails: false,
                        userNotFound: true,
                        userNotValidated: false
                    });
                } else {
                    if (user.password == null) {
                        res.render('hrRegister', {
                            invalidDetails: false,
                            userNotFound: false,
                            userNotValidated: true
                        });
                    }
                    const checkPass = bcrypt.compareSync(password, user.password.replaceAll('"', ''));
                    console.log(`Password Match ${checkPass}`);

                    if (checkPass == false) {
                        res.render('hrRegister', {
                            invalidDetails: true,
                            userNotFound: false,
                            userNotValidated: false
                        });
                    } else {
                        req.session.isLoggedIn = true;
                        req.session.userId = user.id;
                        req.session.username = user.userName;
                        req.session.email = user.emailId;
                        req.session.user = user;
                        console.log(`User Id is ${req.session.userId}`);

                        req.session.save((err) => {
                            console.log(err);
                            res.redirect('/hrDashboard');
                        });

                    }
                }
            })
            .catch(
                err => console.log(err)
            )
    },
    getLogout: (req, res) => {
        req.session.isLoggedIn = false;
        req.session.destroy();
        res.redirect('/');
    },
    getHrDashboard: async (req, res) => {
        const interviewData = await interviewDataModel.findAll({
            order: [
                ['date', 'ASC'],
                ['time', 'ASC']
            ],
        });
        currTime = currentTime();
        console.log(currTime);
        if (req.session.isLoggedIn) {
            res.render('hrDashboard', {
                username: req.session.username,
                interviewData: interviewData,
                currTime: currTime
            });

        }
    },
    getHrProfile: (req, res) => {
        if (req.session.isLoggedIn) {

            console.log('----------------');

            console.log(req.session.user);

            res.render('hrProfile', {
                data: req.session.user,
                username: req.session.username
            })

        }
    },
    createInterview: async (req, res) => {
        if (req.session.isLoggedIn) {
            const selected = await selectedProduct.findAll({
                where: {
                    companyid: req.session.userId
                }
            });
            const interviewers = await interviewerModel.findAll();
            const freeslot = await freeSlotModel.findAll();
            const category = await categoryModel.findAll();
            res.render('createInterview', {
                username: req.session.username,
                selected: selected,
                category: category,
                interviewers: interviewers,
                freeslot: freeslot
            });
        }
    },
    singleInterview: (req, res) => {
        if (req.session.isLoggedIn) {

            res.render('singleInterview', {
                username: req.session.username
            });
        }
    },
    getCompanyProfile: (req, res) => {
        if (req.session.isLoggedIn) {
            res.render('companyProfile', {
                username: req.session.username,
                data: req.session.user
            });
        }
    },
    getProduct: async (req, res) => {
        if (req.session.isLoggedIn) {
            const category = await categoryModel.findAll();
            const topic = await topicModel.findAll();
            const selected = await selectedProduct.findAll();
            console.log(req.query.isPresent);
            var isPresent=false;
            if(req.query.isPresent) {
                isPresent=true;
            }
            res.render('product', {
                username: req.session.username,
                category: category,
                topic: topic,
                selected: selected,
                user: req.session.user,
                isPresent:isPresent
            });
        }
    },
    postProduct:async (req, res) => {
        if (req.session.isLoggedIn) {
            const categoryID = req.body.categoryID;
            console.log(categoryID);
            const data= await selectedProduct.findOne({
                where:{
                    categoryid: categoryID
                }
            });
            // console.log(data);
            if(data==null) {
                await selectedProduct.create({
                companyid: req.session.userId,
                categoryid: categoryID
            });
                console.log('product selected');
                res.redirect('/product');
                
            }

            else {
                console.log("already present");
                res.redirect('/product?isPresent=true');
                        }
            

        }
    },
    postProductTopic: async (req, res) => {
        if (req.session.isLoggedIn) {
            if (op = "addRoundTopic") {
                console.log("----adding topics to database according to each rounds----");
                console.log(req.body.roundData);
                console.log(req.body.topicLength);
                console.log(req.body.roundNumber);
                console.log(req.body.categoryId);
                for (let i = 0; i < req.body.topicLength; i++) {
                    categoryRoundModel.create({
                        roundnumber: req.body.roundNumber,
                        categoryid: req.body.categoryId,
                        topicid: req.body.roundData[i],
                        companyid: req.session.userId
                    });
                }
            }
        }
    },
    postInterviewData: async (req, res) => {
        const email = req.body.studentEmail;
        const studentId = req.body.studentId;
        const selectedDate = req.body.date;
        const dateTime = selectedDate.split(' ')[1] + " " + selectedDate.split(' ')[2];
        const interviewerId = selectedDate.split(' ')[0];
        const date = selectedDate.split(' ')[1];
        const time = selectedDate.split(' ')[2];
        console.log(interviewerId);
        console.log(dateTime);

        const uniqueId = uuidv4();
        const day=new Date();


        await interviewDataModel.create({
            studentName: req.body.studentName,
            studentCollege: req.body.studentCollege,
            studentId: req.body.studentId,
            studentEmail: req.body.studentEmail,
            studentContact: req.body.studentContact,
            studentDob: req.body.studentDob,
            position: req.body.position,
            roundNumber: req.body.roundNumber,
            dateTime: dateTime,
            selectCategory: req.body.category,
            resumeLink: req.body.resumeLink,
            date: date,
            time: time,
            uniqueId: uniqueId,
            companyId:req.session.userId,
            scheduledTime:currentTime(),
            scheduledDay:day.toString()
        });

        await freeSlotModel.update({
            scheduled: 1
        }, {
            where: {
                interviewerId: interviewerId
            }
        });

        await realTimeFeedbackModel.create({
            studentId: req.body.studentId,
            name: req.body.studentName,
            role: req.body.position,
            date: date,
            time: time,
            uniqueId: uniqueId
        });
        await detailFeedbackModel.create({
            name: req.body.studentName,
            role: req.body.position,
            date: date,
            time: time,
            uniqueId: uniqueId
        });
        const meetingId = uuidv4();
        const domain = 'meet.jit.si';

        const meetingLink = `https://${domain}/${meetingId}`;
        console.log(meetingLink);
        await interviewDataModel.update({
            meetingLink: meetingLink,
            interviewerId: interviewerId
        }, {
            where: {
                studentId: studentId
            }
        });
        const msg = {
            from: "tdemo651@gmail.com",
            to: email,
            subject: "Meeting Link",
            text: "here is your meeting link " + meetingLink
        };
        nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "tdemo651@gmail.com",
                    pass: "tedihyjmypzstvwq"
                },
                port: 465,
                host: 'smtp.gmail.com'
            })
            .sendMail(msg, (err) => {
                if (err) {
                    return console.log('error occur', err);
                } else {
                    return console.log('email sent');
                }
            });
        res.redirect('/hrDashboard');
    },

    scheduledInterview: async (req, res) => {
        if (req.session.isLoggedIn) {
            const data = await interviewDataModel.findAll();
            const category = await categoryModel.findAll();
            console.log(data);
            res.render('scheduledInterview', {
                username: req.session.username,
                data: data,
                category: category
            });
        }
    },

    selectedTopic: async (req, res) => {
        if (req.session.isLoggedIn) {
            const category = await categoryModel.findAll();
            const data = await categoryRoundModel.findAll();
            const topic = await topicModel.findAll();
            res.render('selectedTopic', {
                username: req.session.username,
                data: data,
                category: category,
                topic: topic
            });
        }
    },

    deletePurchasedTopics: async (req, res) => {
        if (op = 'delete') {
            categoryRoundModel.destroy({
                where: {
                    id: req.body.id
                }
            }).then(user => {
                res.redirect('/selectedTopic');
            }).catch(err => {
                console.log(err);
            });
        }


    },
    displayRealTime: async (req, res) => {

        console.log('inside');
        console.log('inside' + req.query.uniqueId);
        const data = await realTimeFeedbackModel.findOne({
            where: {
                uniqueId: req.query.uniqueId
            }
        });
        // res.render('displayRealTime',{
        //     username:req.session.username,
        //     data:data
        // });
        res.json(data);
    },
    displayDetailFeedback: async (req, res) => {

        console.log('inside detail');
        console.log(req.query.uniqueId); //in case of get method 'req.query' is used and in case of post method 'req.body'
        const data = await detailFeedbackModel.findOne({
            where: {
                uniqueId: req.query.uniqueId
            }
        });
        res.render('displayDetailFeedback', {
            username: req.session.username,
            data: data
        });

    },
    batchInterview: async (req, res) => {
        const dataArray = req.body; // Get the array from the request body
        // console.log(dataArray);


        const freeslot = await freeSlotModel.findAll();
        const interviewers = await interviewerModel.findAll();
        // const category = await categoryModel.findAll();

        // console.log(categoryId);
        // console.log(interviewers);
        //we can use forEach loop aswell

        for (let i = 0; i < dataArray.length - 1; i++) {
            let check = 0;
            const date = dataArray[i].dob.split('-');
            const dob = date[2] + '-' + date[1] + '-' + date[0];
            const ctg = dataArray[i].category.toLowerCase();
            let categoryId = 0;

            switch (ctg) {
                case 'dsa':
                    categoryId = 1;
                    break;
                case 'core':
                    categoryId = 2;
                    break;
                case 'web':
                    categoryId = 3;
                    break;
                default:
                    console.log("Value is not 'dsa', 'core', or 'web'");
                    break;
            }
            for (const slot of freeslot) {

                if (slot.scheduled == 0) {
                    if (interviewers[slot.interviewerId - 1].preferredInterviewRole1 == categoryId || interviewers[slot.interviewerId - 1].preferredInterviewRole2 == categoryId || interviewers[slot.interviewerId - 1].preferredInterviewRole3 == categoryId) {
                        const uniqueId = uuidv4();
                        check = 1;
                        const dateTime = slot.date + " " + slot.time;
                        await interviewDataModel.create({
                            studentName: dataArray[i].student,
                            studentCollege: dataArray[i].college,
                            studentId: dataArray[i].id,
                            studentEmail: dataArray[i].email,
                            studentContact: dataArray[i].contact,
                            studentDob: dob,
                            position: dataArray[i].position,
                            roundNumber: dataArray[i].round,
                            dateTime: dateTime,
                            selectCategory: dataArray[i].category,
                            resumeLink: dataArray[i].resumeLink,
                            date: slot.date,
                            time: slot.time,
                            uniqueId: uniqueId
                        });

                        // await freeSlotModel.update({
                        //     scheduled: 1
                        // }, {
                        //     where: {
                        //         interviewerId: slot.interviewerId
                        //     }
                        // });

                        slot.scheduled = 1; // Update the existing property
                        await slot.save(); //save the updated field directly to db

                        dataArray[i].scheduled = 1;

                        const meetingId = uuidv4();
                        const domain = 'meet.jit.si';
                        const email = dataArray[i].email;
                        console.log(email);

                        const meetingLink = `https://${domain}/${meetingId}`;
                        console.log(meetingLink);
                        await interviewDataModel.update({
                            meetingLink: meetingLink,
                            interviewerId: slot.interviewerId
                        }, {
                            where: {
                                uniqueId: uniqueId
                            }
                        });
                        const msg = {
                            from: "tdemo651@gmail.com",
                            to: email,
                            subject: "Meeting Link",
                            text: "here is your meeting link " + meetingLink
                        };
                        nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: "tdemo651@gmail.com",
                                    pass: "tedihyjmypzstvwq"
                                },
                                port: 465,
                                host: 'smtp.gmail.com'
                            })
                            .sendMail(msg, (err) => {
                                if (err) {
                                    return console.log('error occur', err);
                                } else {
                                    return console.log('email sent');
                                }
                            });

                        await realTimeFeedbackModel.create({
                            studentId: dataArray[i].id,
                            name: dataArray[i].student,
                            role: dataArray[i].position,
                            date: slot.date,
                            time: slot.time,
                            uniqueId: uniqueId
                        });
                        await detailFeedbackModel.create({
                            name: dataArray[i].student,
                            role: dataArray[i].position,
                            date: slot.date,
                            time: slot.time,
                            uniqueId: uniqueId
                        });
                        break;
                    }
                }


            }
            if (check == 0) {
                dataArray[i].scheduled = 0;
            }
        }

        //add the unscheduled to the db so that they can be scheduled later
        for (let i = 0; i < dataArray.length - 1; i++) {

            if (dataArray[i].scheduled == 0) {
                const date = dataArray[i].dob.split('-');
                const dob = date[2] + '-' + date[1] + '-' + date[0];
                const ctg = dataArray[i].category.toLowerCase();
                let categoryId = 0;

                switch (ctg) {
                    case 'dsa':
                        categoryId = 1;
                        break;
                    case 'core':
                        categoryId = 2;
                        break;
                    case 'web':
                        categoryId = 3;
                        break;
                    default:
                        console.log("Value is not 'dsa', 'core', or 'web'");
                        break;
                }
                await unscheduledModel.create({
                    studentName: dataArray[i].student,
                    studentCollege: dataArray[i].college,
                    studentId: dataArray[i].id,
                    email: dataArray[i].email,
                    studentContact: dataArray[i].contact,
                    category: categoryId,
                    dob: dob,
                    position: dataArray[i].position,
                    round: dataArray[i].round,
                    resumeLink: dataArray[i].resumeLink,
                    companyId:req.session.userId
                });
            }

        }

    },
    cancelInterview: async (req, res) => {
        const uniqueId = req.query.uniqueId;
        console.log(uniqueId);
        const data = await interviewDataModel.findOne({
          where: {
            uniqueId: uniqueId
          }
        });
        // const scheduledTime = data.scheduledTime; // Convert scheduledTime to a Date object
        const scheduledDay= new Date(data.scheduledDay);
        const currentDay=new Date();
        
        
            // Calculate the difference in milliseconds
        const timeDiffMs = currentDay - scheduledDay;

            // Convert milliseconds to hours
        const timeDiffHours = Math.floor(timeDiffMs / (1000 * 60 * 60));
        console.log(timeDiffHours);
        if(timeDiffHours >= 0 && timeDiffHours <=no_payment_hours) {
            res.send("n");
        }
        else if(timeDiffHours > no_payment_hours && timeDiffHours <= half_payment_hours){
            res.send("h");
        }
        else {
            res.send("f");
        }
      },
      interviewCancelled:async (req,res)=>{
       

        await interviewDataModel.update(
            {
              paymentStatus: req.body.payment
            },
            {
              where: {
                uniqueId: req.body.uniqueId
              }
            }
          );
          
        res.redirect('/hrDashboard');
      }
        
};