const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    category:{
        type:String
        // type:mongoose.Schema.Types.ObjectId,
        // ref:'Category'
    },
    image:{
        type:String
    }
})

const Product=mongoose.model("Products",productSchema)
module.exports=Product