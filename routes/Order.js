const express=require('express')
const router=express.Router()
const {auth,checkAdminStatus}=require('../middleware/auth')
const {createNewOrder,getAllOrder,getOrderOfUser,updateOrderStatus,getOrderById}=require('../controller/Order')

router.post('/order',auth,createNewOrder)
router.get('/order/:orderId',auth,getOrderById)
router.get('/order',auth,checkAdminStatus,getAllOrder)
router.get('/order/:userId',auth,getOrderOfUser)
router.put('/order/:userId/status',auth,checkAdminStatus,updateOrderStatus)

module.exports=router