const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },

    isAdmin:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,
        require:true
    },
    fcmToken:{
        type:String,
        required:true
    }
})

const User=mongoose.model('Users',userSchema)
module.exports=User