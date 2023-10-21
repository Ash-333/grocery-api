const express=require('express')
const app=express.Router();
const User=require('../database/User.js')

app.post('/register',async(req,res)=>{
    const user = await User.findOne({username:req.body.username})

    if(user){
        return res.status(400).json({msg:"User already exists"})
    }

    const newUser=new User(req.body)
    await newUser.save()

    res.status(201).json(newUser)
})

module.exports=app