const express = require('express');

const adminCtrl = require('../controller/adminController');

const router = express.Router();


router.get('/adminDashboard',adminCtrl.getAdminDashboard)

router.get('/hrValidation',adminCtrl.getHrValidation)

router.post('/hrValidation',adminCtrl.postHrValidation)


router.get('/interviewerValidation',adminCtrl.getInterviewerValidation)

router.post('/interviewerValidation',adminCtrl.postInterviewerValidation)


module.exports = router;
