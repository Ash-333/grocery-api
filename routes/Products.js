const express=require('express')
const router=express.Router();
const Product=require('../database/Products')
const multer=require('multer')
const path=require('path')

const storage = multer.diskStorage({
    destination: 'uploads/productImg', // You'll need to create this folder
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage });

router.post('/product',upload.single('image'),async(req,res)=>{
    const img=req.file.filename
    const basePath=`${req.protocol}://${req.get('host')}/uploads/productImg/`
    const product=new Product({
        name:req.body.name,
        price:req.body.price,
        category:req.body.category,
        image:`${basePath}${img}`
    })
    try {
        await product.save()
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({msg:`${error}`})
    }
})

router.get('/product',async(req,res)=>{
    const product=await Product.find()
    try {
        res.json(product)
    } catch (error) {
        res.status(400).json({msg:`${error}`})
    }
})

router.get('/product/:category',async(req,res)=>{
    const category=req.params.category
    
    try {
        const product=await Product.find({category:req.params.category})
    res.json(product)
    } catch (error) {
        res.status(400).json({msg:`${error}`})
    }
})

router.get('/product/search',async(req,res)=>{
    try {
        const product=await Product.find({name:{$regex:new RegExp(req.query.q,'i')}})
        res.status(200).json(product)
    } catch (err) {
        res.status(400).json({msg:err})        
    }
})

module.exports=router
