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
    await product.save()
    res.status(200).json(product)
})

router.get('/product',async(req,res)=>{
    const product=await Product.find()
    res.json(product)
})

router.get('/product/:category',async(req,res)=>{
    const product=await Product.find({category:req.params.category})
    res.json(product)
})

router.get('/product/search',async(req,res)=>{
    const product=await Product.find({name:{$regex:new RegExp(req.query.q,'i')}})
    res.status(200).json(product)
})

module.exports=router
