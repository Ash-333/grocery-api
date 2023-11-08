const express=require('express')
const Category=require('../database/Category')
const router=express.Router();
const mongoose=require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const addCategory=async(req,res)=>{
    const basePath=`https://${req.get('host')}/uploads/productImg/`
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
}

const getAllCategory=async(req,res)=>{
    const category=await Category.find()
    try{
        res.json(category)
    }catch(err){
        res.status(400).json({error:`${err}`})
    }
}

const getACategory=async(req,res)=>{
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
}

const deleteCategory=async (req, res) => {
    try {
      const id = req.params.categoryId;
  
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'Invalid ID' });
      }

      const category = await Category.findByIdAndRemove(id);
  
      if (category) {
        res.json({ msg: 'Category deleted successfully' });
      } else {
        res.status(404).json({ msg: 'Category not found' });
      }
    } catch (error) {
      res.status(500).json({ error: `${error}` });
    }
  }

module.exports={addCategory,getAllCategory,getACategory,deleteCategory}  