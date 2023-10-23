const express=require('express')
const router=express.Router();
const {signup,signin,forgetPassword,resetPassword}=require('../controller/Users')

router.post('/register',signup)
router.post('/login',signin)
router.post('/forget-password',forgetPassword)
router.post('/reset-password',resetPassword)

module.exports=router