const express=require('express')
const Category=require('../database/Category')
const router=express.Router();
const multer=require('multer')
const path=require('path')
const mongoose=require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const storage = multer.diskStorage({
    destination: 'uploads/catImg', // You'll need to create this folder
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage });

router.post('/category',upload.single('image'),async(req,res)=>{
    const basePath=`${req.protocol}://${req.get('host')}/uploads/productImg/`
    const img=req.file.filename
    const category=new Category({
        name:req.body.name,
        image:`${basePath}${img}`
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

router.get('/category/:categoryId',async(req,res)=>{
    const id=req.params.categoryId
    try {
        if(!ObjectId.isValid(id)){
            res.status(400).json({msg:'InvalidID'})
            return
        }
        const category=await Category.findById(id)
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ msg: 'Category not found' });
        }
    } catch (err) {
        res.status(400).json({msg:`${err}`})
    }
})

module.exports=router   