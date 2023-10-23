const express=require('express')
const router=express.Router()
const {auth}=require('../middleware/auth')
const {getCart,addItemToCart,updateQuantity,deleteItem,addToCart}=require('../controller/Cart')

router.post('/cart',auth,addToCart)
router.post('/cart/:userId/add-item',auth,addItemToCart)
router.put('/cart/:userId/update-item/:productId',auth,updateQuantity)
router.delete('/cart/:userId/remove-item/:productId',auth,deleteItem)
router.get('/cart/:userId',auth,getCart)

module.exports=router