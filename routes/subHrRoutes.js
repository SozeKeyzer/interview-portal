const express=require('express');
const router=express.Router();
const subHrController=require('../controller/subHrController');

router.post('/subHrRegistration',subHrController.postSubHrRegistration);
router.get('/subHrProfiles',subHrController.getSubHrProfiles);
router.post('/subHrProfiles',subHrController.postSubHrProfiles);
router.get('/delSubHr',subHrController.delSubHr);

module.exports=router;