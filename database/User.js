const mongoose=require('mongoose')

const user=new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    username:{
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
    }
})

const UserSchema=mongoose.model('Users',user)
module.exports=UserSchema