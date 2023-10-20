const express=require('express')
const Category=require('../database/Category')
const router=express.Router();
const multer=require('multer')
const path=require('path')

const storage = multer.diskStorage({
    destination: 'uploads/catImg', // You'll need to create this folder
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage });

router.post('/category',upload.single('image'),async(req,res)=>{
    const category=new Category({
        name:req.body.name,
        image:req.file?req.file.path:null
    })
    try{
        await category.save()
        res.json(category)
    }catch(err){
        res.status(500).json({error:err})
    }
})

router.get('/category',async(req,res)=>{
    const category=await Category.find()
    try{
        res.json(category)
    }catch(err){
        res.status(400).json({error:`${err}`})
    }
})

module.exports=router   