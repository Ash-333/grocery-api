const Category = require("../database/Category");
const mongoose = require("mongoose");
const fs = require("fs");
const cloudinary = require("../config/cloudinaryConfig");
const ObjectId = mongoose.Types.ObjectId;

const addCategory = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "catImg",
    });
    await fs.unlinkSync(req.file.path);
    const category = new Category({
      name: req.body.name,
      image: result.secure_url,
    });
    await category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const getAllCategory = async (req, res) => {
  const category = await Category.find();
  try {
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
};

const getACategory = async (req, res) => {
  const id = req.params.categoryId;
  try {
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ msg: "InvalidID" });
      return;
    }
    const category = await Category.findById(id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ msg: "Category not found" });
    }
  } catch (err) {
    res.status(400).json({ msg: `${err}` });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const id = req.params.categoryId;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid ID" });
    }

    const category = await Category.findByIdAndRemove(id);

    if (category) {
      res.json({ msg: "Category deleted successfully" });
    } else {
      res.status(404).json({ msg: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
};

module.exports = { addCategory, getAllCategory, getACategory, deleteCategory };
