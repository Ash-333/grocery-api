const express=require('express')
const router=express.Router()
const {auth,checkAdminStatus}=require('../middleware/auth')
const {createNewOrder,getAllOrder,getOrderOfUser,updateOrderStatus}=require('../controller/Order')

router.post('/order',auth,createNewOrder)
router.get('/order',auth,checkAdminStatus,getAllOrder)
router.get('/order/:id',auth,getOrderOfUser)
router.put('/order/:id/status',auth,checkAdminStatus,updateOrderStatus)

module.exports=router