const interviewerModel = require('../models/interviewerModel');
const freeSlotModel = require('../models/freeSlotModel');
const interviewDataModel = require('../models/interviewDataModel');

const convertDateTextToInteger = require('../util/convertDateTextToInteger')
const convert12To24Hour = require('../util/convert12To24Hour')
const dateRangeFunction = require('../util/dateRangeFunction')

const sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const realTimeFeedbackModel = require('../models/realTimeFeedbackModel');
const detailFeedbackModel = require('../models/detailFeedbackModel');
const questionModel = require('../models/questionModel');



const getInterviewerRegister = (req,res,next)=>{
    res.render('interviewerRegister.ejs',{
        invalidDetails:false,
        userNotFound:false,
        userNotValidated:false
    });
};

const postInterviewerRegister = (req,res,next)=>{

    const name = req.body.name;
    const email = req.body.email;
    const contactNumber = req.body.contactNumber;
    const address = req.body.address;
    const currentEmployer = req.body.currentEmployer;
    const experience = req.body.experience;
    const resume = req.body.resume;
    const linkedInProfile = req.body.linkedInProfile;
    const githubProfile = req.body.githubProfile;
    const otherLinks = req.body.otherLinks;
    const technologyStack = req.body.technologyStack;
    const preferredInterviewRole1 = req.body.preferredInterviewRole1;
    const preferredInterviewRole2 = req.body.preferredInterviewRole2;
    const preferredInterviewRole3 = req.body.preferredInterviewRole3;

    interviewerModel.create({
        name : name,
        email : email,
        contactNumber : contactNumber,
        address : address,
        currentEmployer : currentEmployer,
        experience : experience,
        resume : resume,
        linkedInProfile : linkedInProfile,
        githubProfile : githubProfile,
        otherLinks : otherLinks,
        technologyStack : technologyStack,
        preferredInterviewRole1 : preferredInterviewRole1,
        preferredInterviewRole2 : preferredInterviewRole2,
        preferredInterviewRole3 : preferredInterviewRole3
    })
    .then(result=> {
        console.log(result),
        console.log("new Interviewer registered "),
        res.render('/afterInterviewRegistration')
    })
    .catch(
        err=>console.log(err)
    );
};

const postInterviewerLogin = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;


    interviewerModel.findOne(
        {
            where : {email : email}
        }
    )
    .then(user=>{
        if(!user){
            console.log("User not found");
            res.render('interviewerRegister',{
                invalidDetails:false,
                userNotFound:true,
                userNotValidated:false
            });
        }
        else
        {
            if(user.password==null)
            {
                res.render('interviewerRegister',{
                    invalidDetails:false,
                    userNotFound:false,
                    userNotValidated:true
                });
            }

            const bool = bcrypt.compareSync(password,user.password.replaceAll('"', ''));
            console.log(`Password Match ${bool}`);
            

            if(bool == false)
            {
                res.render('interviewerRegister',{
                    invalidDetails:true,
                    userNotFound:false,
                    userNotValidated:false
                });
            }
            else
            {
                req.session.isLoggedIn = true;
                req.session.userId = user.id;
                req.session.name = user.name;
                console.log(`User Id up ${req.session.userId}`)
                req.session.save((err)=>{
                    console.log(err);
                    console.log("suc log")
                    res.redirect("/interviewerDashboard")

                })
            }
        }
    })
    .catch(
        err=>console.log(err)
        )

}

const getLogout=(req,res)=>{
    req.session.isLoggedIn=false;
    req.session.destroy();
    res.redirect('/');
}



const getInterviewerDashboard=(req,res)=>{
    if(req.session.isLoggedIn)
    {
        interviewerModel.findOne(
            {
                where : {id : req.session.userId}
            }
        )
        .then(user=>{
            interviewDataModel.findAll(
                {
                    where : {interviewerId : req.session.userId}
                }
            )
            .then(scheduledInterviewsData=>{
                console.log("qwert")
                console.log(scheduledInterviewsData)
                res.render('interviewerDashboard',{
                    user:user,
                    username:req.session.name,
                    scheduledInterviewsData:scheduledInterviewsData
                })
            })
            .catch(
                err=>console.log(err)
            )
        })
        .catch(
            err=>console.log(err)
        )
    }
}

const getInterviewerProfile =(req,res)=>{
    if(req.session.isLoggedIn)
    {
        interviewerModel.findOne(
            {
                where : {id : req.session.userId}
            }
        )
        .then(user=>{
            res.render('interviewerProfile',{
                user:user,
                username:req.session.name,
                userId:req.session.userId
            })
        })
        .catch(
            err=>console.log(err)
        )
    }
}

const postInterviewerProfile = (req,res)=>{

    const { formData, operation, userId} = req.body;
    
    const formDataObj = {};
    formData.split('&').forEach((field) => {
        const [key, value] = field.split('=');
        formDataObj[key] = value;
    });

    if (operation === 'passwordChange') {
        console.log("passwordChange")

        console.log(formDataObj.password)


        interviewerModel.findAll({
            where : {id:userId}
        })
        .then((data)=>{
            console.log(data[0].password);
            const bool = bcrypt.compareSync(formDataObj.password,data[0].password.replaceAll('"', ''));
            console.log(`Password Match ${bool}`);

            if(bool)
            {
                bcrypt.hash(formDataObj.newPassword,12,(err,pass)=>
                {
                    interviewerModel.update({
                        password:pass
                    },
                    {
                        where : {id:userId}
                    })
                    .then((result)=>{
                        res.send("Password Changed")
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
                })
            }

        })
        .catch((err)=>{
            console.log(err);
        })

    } else if (operation === 'profileUpdate') {
        
        var techStack=formDataObj.technologyStack
        var preferredInterviewRole1=formDataObj.preferredInterviewRole1
        var preferredInterviewRole2=formDataObj.preferredInterviewRole2
        var preferredInterviewRole3=formDataObj.preferredInterviewRole3

        console.log(techStack);
        console.log(preferredInterviewRole1);
        console.log(preferredInterviewRole2);
        console.log(preferredInterviewRole3);
        
        interviewerModel.update({
            technologyStack: formDataObj.technologyStack,
            preferredInterviewRole1: formDataObj.preferredInterviewRole1,
            preferredInterviewRole2: formDataObj.preferredInterviewRole2,
            preferredInterviewRole3: formDataObj.preferredInterviewRole3,
            verifiedStatus:0
        },
        {
            where: {id: userId}
        }
        )
        .then((result)=>{
            console.log(result);
            res.redirect('/interviewerProfile')
        })
        .catch((err)=>{
            console.log(err);
        })
    }

  // send a response back to the client
  res.send('Form submitted successfully!');



   

        
        
}

const getInterviewerFreeSlot=(req,res)=>{
    if(req.session.isLoggedIn)
    {
        freeSlotModel.findAll(
            {
                where : {interviewerId : req.session.userId}
            }
        )
        .then(data=>{
            console.log(req.session.name)
            console.log(data)
            res.render('interviewerFreeSlot',{
                data:data,
                username:req.session.name
            })
        })
        .catch(
            err=>console.log(err)
        )
    }
}

const postInterviewerFreeSlot=(req,res)=>{
    console.log(req.body.date)
    console.log(req.body.time)
    var date=req.body.date
    var time=req.body.time
    

    var dt=convertDateTextToInteger.convertDate(date)
    console.log(dt)

    var tm = convert12To24Hour.convertTime(time)
    console.log(tm)


    freeSlotModel.create({
        interviewerId:req.session.userId,
        interviewerName:req.session.name,
        date:dt,
        time:tm
    })
    .then(result=> {
        console.log(result),
        console.log("Free Slot Added"),
        res.redirect('/interviewerFreeSlot')
    })
    .catch(
        err=>console.log(err)
        );
    }
    
    
    const postInterviewerFreeWeekSlot=(req,res)=>{
        console.log(req.body.date1)
        console.log(req.body.date2)
        console.log(req.body.time)

        var dt1=convertDateTextToInteger.convertDate(req.body.date1)
        console.log(dt1)
        
        var dt2=convertDateTextToInteger.convertDate(req.body.date2)
        console.log(dt2)
        
        var tm = convert12To24Hour.convertTime(req.body.time)
        console.log(tm)
    
    
        function runFunctionForDateRange(startDate, endDate, myFunction) {
            
            return new Promise((resolve, reject) => {
                
                const dayInMillis = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
                let currentDate = new Date(startDate); // Initialize current date to start date
                
                while (currentDate <= endDate) {
                    myFunction(currentDate);
                    
                    currentDate.setTime(currentDate.getTime() + dayInMillis);
                }
                resolve('done');
            });
            
        }
    
        function myFunction(date) {
            console.log(date);
            freeSlotModel.create({
                interviewerId:req.session.userId,
                interviewerName:req.session.name,
                date:date,
                time:tm,
                scheduled:"0"
            })
        }

        const startDate = new Date(dt1); // Start date
        const endDate = new Date(dt2); // End date
        runFunctionForDateRange(startDate, endDate, myFunction)
        .then(()=>{
            console.log("Free Slots Added"),
            res.redirect('/interviewerFreeSlot')
        })
        .catch(
            err=>console.log(err)
        );
    
}


const getInterview=(req,res)=>{
    if(req.session.isLoggedIn)
    {
        const meetLink = req.query.meetLink;
        const uniqueId = req.query.uniqueId;
        console.log(meetLink);
        const domain = 'meet.jit.si';
        // const uuid = uuidv4();
        
        const displayName = req.session.name; // Information = name of student snd interviewer
        // const link = `https://${domain}/${roomName}`;
        const link = meetLink;
      
        realTimeFeedbackModel.findOne(
            {
                where:{uniqueId:uniqueId}
            }
        )
        .then((realTimeFeedbackData)=>{
            detailFeedbackModel.findOne(
                {
                    where : {uniqueId:uniqueId}
                }
            )
            .then((detailFeedbackData)=>{
                questionModel.findAll(
                    {
                        where : {}
                    }
                ).then((questionData)=>{
                    console.log(realTimeFeedbackData);
                    res.render('interviewer', {domain, displayName, link, realTimeFeedbackData,detailFeedbackData,uniqueId,questionData});
                })
                .catch(err=>console.log(err))
                

            })
            .catch((err)=>
                console.log(err)
            )
        })
        .catch((err)=>
            console.log(err)
        )
    }
}

const getDetailedFeedbackForm=(req,res)=>{
    if(req.session.isLoggedIn)
    {
        const meetLink = req.query.meetLink;
        const uniqueId = req.query.uniqueId;
        detailFeedbackModel.findOne(
            {
                where : {uniqueId:uniqueId}
            }
        )
        .then((detailFeedbackData)=>{
            questionModel.findAll(
                {
                    where : {}
                }
            ).then((questionData)=>{
                console.log(realTimeFeedbackData);
                res.render('detailedFeedbackForm', {detailFeedbackData,uniqueId,questionData});
            })
            .catch(err=>console.log(err))

        })
        .catch((err)=>
            console.log(err)
        )
    }
}

const postDetailedFeedbackForm=(req,res)=>{

}


module.exports={
    getInterviewerRegister,
    postInterviewerRegister,
    postInterviewerLogin,
    getLogout,
    getInterviewerDashboard,
    getInterviewerProfile,
    postInterviewerProfile,
    getInterviewerFreeSlot,
    postInterviewerFreeSlot,
    postInterviewerFreeWeekSlot,
    getInterview,
    getDetailedFeedbackForm,
    postDetailedFeedbackForm
}

