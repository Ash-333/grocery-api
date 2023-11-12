const Product=require('../database/Products')
const fs = require("fs");
const cloudinary = require("../config/cloudinaryConfig");

const addProduct= async(req,res)=>{
    try {
        if(req.isAdmin){
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "productImg",
          });
          await fs.unlinkSync(req.file.path);
            const product=new Product({
                name:req.body.name,
                price:req.body.price,
                category:req.body.category,
                image:result.secure_url,
                description:req.body.description
            })
            await product.save()
            res.status(200).json(product)
        }
        else{
            res.status(403).json({msg:'Unauthorized request'})
        }
    } catch (error) {
        res.status(400).json({msg:`${error}`})
    }
}

const updateProduct=async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
  
      if (req.isAdmin) {
        const product = await Product.findByIdAndUpdate(id, updates, { new: true });
  
        if (!product) {
          return res.status(404).json({ msg: 'Product not found' });
        }
  
        res.json(product);
      } else {
        res.status(403).json({ msg: 'Unauthorized request' });
      }
    } catch (error) {
      res.status(400).json({ msg: `${error}` });
    }
  }


const deleteProduct=async (req, res) => {
    try {
      const { id } = req.params;
  
      if (req.isAdmin) {
        const product = await Product.findByIdAndRemove(id);
  
        if (!product) {
          return res.status(404).json({ msg: 'Product not found' });
        }
  
        res.json({ msg: 'Product deleted successfully' });
      } else {
        res.status(403).json({ msg: 'Unauthorized request' });
      }
    } catch (error) {
      res.status(400).json({ msg: `${error}` });
    }
}

const getAll=async(req,res)=>{
    const product=await Product.find().populate('category','name')
    try {
        res.json(product)
    } catch (error) {
        res.status(400).json({msg:`${error}`})
    }
}

const getByCategory=async(req,res)=>{  
    try {
        const product=await Product.find({category:req.params.category}).populate('category','name')
    res.json(product)
    } catch (error) {
        res.status(400).json({msg:`${error}`})  
    }
}

const getByName=async(req,res)=>{
    try {
        const product=await Product.find({name:{$regex:new RegExp(req.query.q,'i')}}).populate('category','name')
        res.status(200).json(product)
    } catch (err) {
        res.status(400).json({msg:err})        
    }
}

module.exports={getAll,getByCategory,getByName,addProduct,updateProduct,deleteProduct}