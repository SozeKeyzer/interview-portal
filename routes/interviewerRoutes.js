const express = require('express');

const interviewerController = require('../controller/interviewerController');

const router = express.Router();

router.get('/interviewerRegistration', interviewerController.getInterviewerRegister);
router.post('/interviewerRegistration', interviewerController.postInterviewerRegister);
router.get('/logout',interviewerController.getLogout);
router.post('/interviewerLogin',interviewerController.postInterviewerLogin);

router.get('/interviewerDashboard',interviewerController.getInterviewerDashboard)

router.get('/interviewerProfile',interviewerController.getInterviewerProfile)
router.post('/interviewerProfile',interviewerController.postInterviewerProfile)

router.get('/interviewerFreeSlot',interviewerController.getInterviewerFreeSlot)
router.post('/interviewerFreeSlot',interviewerController.postInterviewerFreeSlot)
router.post('/interviewerFreeWeekSlot',interviewerController.postInterviewerFreeWeekSlot)

router.get('/interview',interviewerController.getInterview)
router.get('/detailedFeedbackForm',interviewerController.getDetailedFeedbackForm)
router.post('/detailedFeedbackForm',interviewerController.postDetailedFeedbackForm)

module.exports = router;
