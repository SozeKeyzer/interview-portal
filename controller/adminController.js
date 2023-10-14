const hrModel = require('../models/hrModel');
const interviewerModel = require('../models/interviewerModel');
const sequelize = require('sequelize');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const pass_gen=require('../util/generator');

const getAdminDashboard = (req,res,next)=>{
    res.render("adminDashboard")
}


const getHrValidation = (req, res, next) => {
    hrModel.findAll(
        {
            where: { verifiedStatus: false }
        }
    )
        .then(data => {
            res.render('hrValidate.ejs', {
                data: data
            })
        })
        .catch((err) => {
            console.log(err)
        });

}

const postHrValidation = (req, res, next) => {
  var id = req.body.id;
  console.log(id+"ajax check");

  const pass=pass_gen.genPass();
  console.log(pass);

 
  bcrypt.hash(pass,12,(err,password)=>
  {
    hrModel.update({
        verifiedStatus: 1,
        password: password
      },
      {
          where: {id: id},
      }
    );
  
      hrModel.findAll(
        {
          where: { id:id }
        }
      )
      .then((user)=>{
        console.log(user[0].emailId);
        const msg = {
          from : "tdemo651@gmail.com",
          to : user[0].emailId,
          subject : "Entrevue Password ",
          text : "Hey HR buddy, thanks for registering. We have validated your data which proves up to the mark. Here are your credentials : eMail-"+user[0].emailId+" Password-"+pass
      };
      nodemailer.createTransport({
          service:'gmail',
          auth: {
              user: "tdemo651@gmail.com",
              pass: "tedihyjmypzstvwq"
          },
          port: 465,
          host: 'smtp.gmail.com'
      })
      .sendMail(msg,(err)=>{
          if(err){
              return console.log('error occur', err);
          }
          else 
          {
              return console.log('email sent');
          }
      });
      })
      .catch((err)=> {
        console.log(err)
      });
    });  
  
  
}



const getInterviewerValidation = (req, res, next) => {
    interviewerModel.findAll(
        {
            where: { verifiedStatus: false }
        }
    )
        .then(data => {
            res.render('interviewerValidate.ejs', {
                data: data
            })
        })
        .catch((err) => {
            console.log(err)
        });
}

const postInterviewerValidation=(req,res,next)=>{
    var id = req.body.id;
    console.log(id+"ajax check");
    
    interviewerModel.findAll({
        where:{id:req.body.id}
    })
    .then((user)=>{
        if(!user[0].password)
        {
            const pass=pass_gen.genPass();
            console.log(pass);
            
            bcrypt.hash(pass,12,(err,password)=>
            {
                interviewerModel.update({
                    verifiedStatus: 1,
                    password: password
                },
                {
                    where: {id: id},
                }
                );
                
                interviewerModel.findAll(
                    {
                        where: { id:id }
                    }
                    )
                    .then((user)=>{
                        console.log(user[0].email);
                        const msg = {
                        from : "tdemo651@gmail.com",
                        to : user[0].email,
                        subject : "Entrevue Password ",
                        text : "Hey Interviwer buddy, thanks for registering. We have validated your data which proves up to the mark. Here are your credentials : eMail-"+user[0].email+" Password-"+pass};
                        nodemailer.createTransport({
                            service:'gmail',
                            auth: {
                                user: "tdemo651@gmail.com",
                                pass: "tedihyjmypzstvwq"
                            },
                            port: 465,
                            host: 'smtp.gmail.com'
                        })
                        .sendMail(msg,(err)=>{
                            if(err){
                                return console.log('error occur', err);
                            }
                            else 
                            {
                                return console.log('email sent');
                            }
                        });
                    })
                    .catch((err)=> {
                        console.log(err)
                    });
                
            });
        }
        else
        {
            interviewerModel.update({
                verifiedStatus: 1
            },
            {
                where: {id: id},
            })
            .then((result)=>{
                res.redirect('/interviewerValidation')
            })
            .catch((err)=> {
                console.log(err)
            });
        }
        })
        .catch(err=>console.log(err))
    

    
    }
    
    
    module.exports = {
        getAdminDashboard,
        getHrValidation,
        postHrValidation,
        getInterviewerValidation,
        postInterviewerValidation
    };