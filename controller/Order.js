const Order=require('../database/Order')

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

const updateOrderStatus=async(req,res)=>{
    try {
        if(req.isAdmin){
            const id=req.param
            const status=req.body
            const order= await Order.findByAndUpdate(id,{status},{new:true})
            if(!order){
                return res.status(400).json({msg:'Order not found'})
            }
            res.status(200).json(order)
        }
        else{
            res.status(403).json({ msg: 'Unauthorized request' });
        }
    } catch (error) {
        res.status(500).json({msg:`${error}`})           
    }
}

module.exports={createNewOrder,getAllOrder,getOrderOfUser,updateOrderStatus}
