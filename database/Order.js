const mongoose=require('mongoose')

const orderSchema=new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    items: [
      {
        productId: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Products'
        },
        quantity: Number,
        price: Number
      }
    ],
    total: Number,
    shippingAddress: {
      street: String,
      city: String,
      state: String,
    },
    shippingMethod: String,
    paymentMethod: String,
    status: String,
    createdAt: Date,
    updatedAt: Date
})

const Order=mongoose.model('Order',orderSchema)
module.exports=Order