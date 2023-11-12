const express=require('express')
const router=express.Router()
const multer=require('multer')
const upload=require('../middleware/uploader')
const {auth,checkAdminStatus}=require('../middleware/auth')
const {getAll,getByCategory,getByName,addProduct,updateProduct,deleteProduct} = require('../controller/Products')


router.get('/product/search',getByName)
router.get('/product',getAll)
router.get('/product/:category',getByCategory)
router.post('/product',auth,checkAdminStatus,upload.single('image'),addProduct)
router.put('/product/:id',auth,checkAdminStatus,updateProduct)
router.delete('/product/:id',auth,checkAdminStatus,deleteProduct)

module.exports=router