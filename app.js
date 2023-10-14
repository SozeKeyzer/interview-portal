const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const sequelize = require('./database/connect');
const hrRoutes = require('./routes/hrRoutes');
const adminRoutes = require('./routes/adminRoutes');
const interviewerRoutes = require('./routes/interviewerRoutes');
const subHrRoutes=require('./routes/subHrRoutes');
const realTimeFeedbackController = require('./controller/realTimeFeedbackController.js');
const detailFeedbackController = require('./controller/detailFeedbackController.js');



const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 2000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(session({secret: 'my secret',resave: false, saveUninitialized: false}));
app.use('/socket.io', express.static(__dirname + '/node_modules/socket.io/client-dist/'));

app.use(hrRoutes);
app.use(adminRoutes);
app.use(interviewerRoutes);
app.use(subHrRoutes);
realTimeFeedbackController.realTimeFeedback(io);
detailFeedbackController.detailFeedback(io);

app.set("view engine","ejs");
app.set("views","./views");


app.use('/',(req,res,next)=>{
    res.render('home.ejs',{
        data:req.session.isLoggedIn
    });
});

sequelize.sync()
    .then(result => {
        http.listen(port,()=>{
            console.log(`Server is running at port no ${port}`);
        });
    })
    .catch(err =>{
        console.log(err);
    });