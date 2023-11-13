const Order=require('../database/Order')
const admin=require('../config/firebase')

const createNewOrder=async(req,res)=>{
    try {
      const order=new Order(req.body)
      await order.save()
      res.status(200).json(order)
    } catch (error) {
        res.status(500).json({msg:`${error}`})
    }
}

const getAllOrder=async(req,res)=>{
    try {
        const order=await Order.find();
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({msg:`${error}`})        
    }
}

const getOrderOfUser=async(req,res)=>{
    try {
        const userId=req.params.userId
        const order=await Order.find({userId})

        if(!order){
            res.status(400).json({msg:"no order found"})
        }
        
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({msg:`${error}`})             
    }
}

const getOrderById=async(req,res)=>{
    try {
        const orderId=req.params.orderId
        const order=await Order.findOne({ _id: orderId })

        if(!order){
            res.status(400).json({msg:"no order found"})
        }
        
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({msg:`${error}`})             
    }
}

const updateOrderStatus=async(req,res)=>{
    try {
        if(req.isAdmin){
            const id=req.params._id
            const status=req.body
            const order= await Order.findByAndUpdate(id,{status},{new:true})
            if(!order){
                return res.status(400).json({msg:'Order not found'})
            }

            const user=await User.findById(order.userId)

            if(!user || !user.fcmToken){
                return res.status(400).json({msg:'User or FCM token not found'})
            }

            const fcmMessage={
                notification:{
                    title:'Order Status Updated',
                    body:`Your order is now ${status}`
                },
                token:user.fcmToken
            }

            await admin.messaging().send(fcmMessage)

            res.status(200).json(order)
        }
        else{
            res.status(403).json({ msg: 'Unauthorized request' });
        }
    } catch (error) {
        res.status(500).json({msg:`${error}`})           
    }
}

module.exports={createNewOrder,getOrderById,getAllOrder,getOrderOfUser,updateOrderStatus}