const router = require("express").Router();
const UserModel = require("../models/User");
const PostModel = require("../models/Post");

//Create Post
router.post("/", async(req, res) =>{
    const newPost = new PostModel(req.body)
    try {
        const savePost = await newPost.save()
        res.status(200).json(savePost)
    } catch (error) {
        res.status(401).json(error)
    }  
})

// Update Post
router.put("/:id", async(req, res) =>{
   try {
        const post = await PostModel.findById(req.params.id)
        if(post.username === req.body.username){
            try {
                const updatedPost = await PostModel.findByIdAndUpdate(req.params.id,{
                    $set : req.body
                },{new : true} )
                res.status(200).json(updatedPost)
            } catch (error) {
                res.status(500).json(error); 
            }  
        }else{
            res.status(401).json("You can update only your post");
        }

   } catch (error) {
        res.status(500).json(error);
   }
})

// Delete Post
router.delete("/:id", async(req, res) =>{
    try {
         const post = await PostModel.findById(req.params.id)
         if(post.username === req.body.username){
             try {
                await post.delete()
                 res.status(200).json("Post has been deleted... ")
             } catch (error) {
                 res.status(500).json(error); 
             }  
         }else{
             res.status(401).json("You can delete only your post");
         }
 
    } catch (error) {
         res.status(500).json(error);
    }
 })
// // Get Post
router.get("/:id", async (req, res) => {
    try {
      const post = await PostModel.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // // Get Post
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if(username){
            posts = await PostModel.find({username})
        }else if(catName){
            posts = await PostModel.find({categories : {
                $in : [catName]
            }})
        }else{
            posts = await PostModel.find()
        }
        res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router

