const express=require('express')
const router=express.Router()
const multer=require('multer')
const upload=require('../middleware/uploader')
const {auth,checkAdminStatus}=require('../middleware/auth')
const {addCategory,getAllCategory,getACategory,deleteCategory}=require('../controller/Category')


  router.post('/category',auth,checkAdminStatus,upload.single('image'),addCategory)
  router.delete('/category/:categoryId',auth,checkAdminStatus,deleteCategory)
  router.get('/category/:categoryId',auth,getACategory)
  router.get('/category',auth,getAllCategory)

module.exports=router 