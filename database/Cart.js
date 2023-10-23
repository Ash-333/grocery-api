const mongoose=require('mongoose')

const cartSchema= new mongoose.Schema({
    "userId": {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    "items": [
      {
        "productId": {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Products'
        },
        "quantity": Number,
        "price": Number
      }
    ],
    "total": Number,
    "createdAt": Date,
    "updatedAt": Date
  })

  const Cart=mongoose.model("Cart",cartSchema)
  module.exports=Cart