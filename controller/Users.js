const express=require('express')
const router=express.Router();
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const crypto=require('crypto')
const dotenv=require('dotenv').config()
const User=require('../database/User.js')
const resetTokenSchema=require('../database/ResetToken.js')
const sendResetEmail=require('../config/mailer.js')

const signup=async(req,res)=>{
    const {name,email,isAdmin,password,fcmToken}=req.body

    try {
        const user = await User.findOne({email:email})
        
        if(user){
            res.status(400).json({msg:"User already exists"})
            return;
        }

        const hashedPW=await bcrypt.hash(password,10)
        const newUser=new User({
            name:name,
            email:email,
            isAdmin:isAdmin,
            password:hashedPW,
            fcmToken:fcmToken   
        })
        await newUser.save()

        const token=jwt.sign({email:newUser.email,id:newUser._id},process.env.SECRET_KEY)
        res.status(201).json({user:newUser,token:token})
    } catch (error) {
        res.status(500).json({msg:`${error}`})
    }
}

const signin=async(req,res)=>{
    const {email,password}=req.body
    
    try {
        const isUser=await User.findOne({email:email})
        if(!isUser){
            return res.status(400).json({msg:'user not found'})
        }
        const matchPassword=await bcrypt.compare(password,isUser.password)

        if(!matchPassword){
            res.status(400).json({msg:'Invalid Credentials'})
        }

        const token=jwt.sign({email:isUser.email,id:isUser._id},process.env.SECRET_KEY)
        res.status(200).json({user:isUser,token:token})
    } catch (error) {
        res.status(500).json({msg:`${error}`})
    }
}

const forgetPassword=async(req,res)=>{
    const email=req.body.email
    
    try {
        const user=await User.findOne({email})

        if(!user){
            return res.status(200).json({msg:'User not found'})
        }

        const resetToken = Math.floor(10000000 + Math.random() * 90000000).toString();
        const expires = new Date();
        expires.setHours(expires.getHours() + 1);

        const resetTokenModel = new resetTokenSchema({
            email,
            token: resetToken,
            expires,
          });
          await resetTokenModel.save();

          sendResetEmail(email, resetToken);
      
          res.status(200).json({ msg: 'Reset token sent to your email' });

    } catch (error) {
        res.status(500).json({msg:`${error}`})
    }
}


const resetPassword=async(req,res)=>{
    const {email,token,newPassword}=req.body

    try {
        const resetToken=await resetTokenSchema.findOne({email,token})
        if(!resetToken || resetToken.expires<new Date()){
            return res.status(400).json({msg:'Invalid or expired token'})
        }

        const user=await User.findOne({email})

        if(!user){
            return res.status(400).json({msg:'User not found'})
        }

        const hashedPW=await bcrypt.hash(newPassword,10)
        user.password=hashedPW
        await user.save()

        await resetTokenSchema.deleteOne({ email: email, token: resetToken })
        res.status(200).json({msg:'Password reset successfull'})
    } catch (error) {
        res.status(500).json({msg:`${error}`})
    }
}

module.exports={signup,signin,forgetPassword,resetPassword}