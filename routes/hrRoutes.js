const express=require('express');
const router=express.Router();
const hrController=require('../controller/hrController');
const { route } = require('./interviewerRoutes');

router.get('/hrRegistration',hrController.getHrRegister);
router.post('/hrRegistration',hrController.postHrRegister);
router.post('/hrlogin',hrController.postHrLogin);
router.get('/hrlogout',hrController.getLogout);
router.get('/hrDashboard',hrController.getHrDashboard);
router.get('/hrProfile',hrController.getHrProfile);
router.get('/createInterview',hrController.createInterview);
router.get('/singleInterview',hrController.singleInterview);
router.get('/companyProfile',hrController.getCompanyProfile);
router.get('/product',hrController.getProduct);
router.post('/postProduct',hrController.postProduct);
router.post('/postProductTopic',hrController.postProductTopic);
router.post('/postInterviewData',hrController.postInterviewData);
router.get('/scheduledInterview',hrController.scheduledInterview);
router.get('/selectedTopic',hrController.selectedTopic);
router.post('/deletePurchasedTopics',hrController.deletePurchasedTopics);
router.get('/displayRealTime',hrController.displayRealTime);
router.get('/displayDetailFeedback',hrController.displayDetailFeedback);
router.post('/uploadInterviewDetails',hrController.batchInterview);
router.get('/cancelInterview',hrController.cancelInterview);
router.post('/interviewCancelled',hrController.interviewCancelled);
// router.get('/hrLogin');
// router.post('/hrLogin');

// router.get('/hrDashboard');
// router.post('/hrDashboard');

module.exports=router;

