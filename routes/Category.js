const express=require('express')
const router=express.Router()
const multer=require('multer')
const path=require('path')
const {auth,checkAdminStatus}=require('../middleware/auth')
const {addCategory,getAllCategory,getACategory,deleteCategory}=require('../controller/Category')

const storage = multer.diskStorage({
    destination: 'uploads/catImg',
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage });

  router.post('/category',auth,checkAdminStatus,upload.single('image'),addCategory)
  router.delete('/category/:categoryId',auth,checkAdminStatus,deleteCategory)
  router.get('/category/:categoryId',auth,getACategory)
  router.get('/category',auth,getAllCategory)

module.exports=router