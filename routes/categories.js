const router = require("express").Router();
const UserModel = require("../models/User");
const PostModel = require("../models/Post");
const CategoryModel = require("../models/Category");

//Create Category
router.post("/" , async(req, res) =>{
    const newCat = new CategoryModel(req.body)
    try {
        const saveCat = await newCat.save()
        res.status(200).json(saveCat);
    } catch (error) {
      res.status(500).json(error);
    }
})

router.get("/" , async(req, res) =>{
    try {
        const cats = await CategoryModel.find()
        res.status(200).json(cats);
    } catch (error) {
      res.status(500).json(error);
    }
})



module.exports = router

