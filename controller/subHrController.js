const subHrModel = require('../models/subHrModel');
const pass_gen=require('../util/generator');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

module.exports = {

    postSubHrRegistration: (req, res) => {
        const {
            userName,
            emailId,
            contactNumber,
            role
        } = req.body;
        subHrModel.create({
                userName: userName,
                emailId: emailId,
                contactNumber: contactNumber,
                role:role
            })
            .then(user => {

                res.redirect('/subHrProfiles');
                const pass = pass_gen.genPass();
                console.log(pass);


                bcrypt.hash(pass, 12, (err, password) => {
                    console.log(password);
                    subHrModel.update({
                        password: password,
                       hrId:req.session.userId
                    }, {
                        where: {
                            emailId: emailId
                        },
                    });
                });
                        console.log('fskahfksakfksafdkhksahfdkjhsakhfhsaf');
                const msg = {
                    from : "tdemo651@gmail.com",
                    to : emailId,
                    subject : "Entrevue Password ",
                    text : "This profile is successfully created.Here are your credentials : eMail-"+emailId+" Password-"+pass
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
            .catch(error => {
                console.log(error);
            });
    },
    postSubHrLogin: (req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        subHrModel.findOne({
                where: {
                    emailId: email
                }
            }).then(user => {
                if (!user) {
                    console.log("User not found");
                    res.render('hrRegister',{
                        invalidDetails:false,
                        userNotFound:true,
                        userNotValidated:false
                    });
                } else {
                    if (user.password == null) {
                        res.render('hrRegister',{
                            invalidDetails:false,
                            userNotFound:false,
                            userNotValidated:true
                        });
                    }
                    const checkPass = bcrypt.compareSync(password, user.password.replaceAll('"', ''));
                    console.log(`Password Match ${checkPass}`);

                    if (checkPass == false) {
                        res.render('hrRegister',{
                            invalidDetails:true,
                            userNotFound:false,
                            userNotValidated:false
                        });
                    } else {
                        req.session.isLoggedIn = true;
                        req.session.userId = user.id;
                        req.session.username=user.userName;
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
    getSubHrProfiles:(req,res)=>{
       if(req.session.isLoggedIn){
        subHrModel.findAll({
            where:{
                hrId:req.session.userId
            }
        }).then(data=>{
            res.render('subHrProfile',{
                username:req.session.username,
                data:data
            });
        })
        .catch(err=>{
            console.log(err);
        });
       }
    },
    postSubHrProfiles:(req,res)=>{
       if(req.body.op=="edt"){
        console.log(req.body)
        subHrModel.update({
            username:req.body.userName,
            contactNumber:req.body.contactNumber,
            email:req.body.email,
            role:req.body.role,
        },{
            where : {id:req.body.id}
        })
       }
    },
    delSubHr:(req,res)=>{
        console.log(req.body.id);
        console.log('-----------------------ljsofjs---s----');
        res.redirect('/subHrProfiles');
    }
};