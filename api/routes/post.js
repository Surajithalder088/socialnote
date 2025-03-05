

const express=require("express")
const app=express();
const mongose=require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User=require("../model/user")
const Post=require("../model/post")
const uploadOnCloudinary=require("../utils/cloudinary")
const authenticateToken=require('../middlewares/authenticate');
const upload = require("../middlewares/multer.middleware");

const router=express.Router();

router.post("/file",upload.single('file'),async(req,res)=>{
    try{
    const localfile=req.file.path;
    if(!localfile){
        return res.status(400).json('failed to upload on backend')
       }
       console.log("uploading to cloud",localfile);
    const response= await uploadOnCloudinary(localfile)
    console.log("uploading to cloud",response);
    
      res.status(200).json(response)
    }catch(error){
        res.status(400).json(error)
    }
})
router.post('/create',authenticateToken,async(req,res)=>{
    try{
        /*
      const localfile=req.file.path;
      const response= await uploadOnCloudinary(localfile)
        if(!response){
         return res.status(400).json('failed to upload on cloud')
        }
        let photo=response.url
        */
    const {photo,description}=req.body;
    const user=req.user.id;
    const newPost= new Post({photo,description,user});
    await newPost.save();
    const newuser=await User.findOneAndUpdate({_id:user},
    { $addToSet: {post:newPost._id } },
    { new: true }
    )
      
       res.status(201).json({message :"successful "})
    }catch(err){
        res.status(400).json({messege:"failed to  posted",error:err.messege})
    }

})
router.patch('/:id/update',authenticateToken,async(req,res)=>{
    try{
    const {description}=req.body;
   
    const newPost= await Post.findOneAndUpdate({_id:req.params.id},{description},{new:true});
      await newPost.save();
       res.status(201).json({message :"successful "})
    }catch(err){
        res.status(400).json({messege:"failed to  update",error:err.messege})
    }

})

router.get('/:id',authenticateToken,async(req,res)=>{
    try{
 
    const newPost= await Post.findOne({_id:req.params.id})
      
       res.status(200).json({newPost})
    }catch(err){
        res.status(400).json({messege:"failed to get",error:err.messege})
    }

})

router.get('/posts/user/:userid',authenticateToken,async (req,res)=>{
    const {userid}=req.params;
    try{
    const posts=await Post.find({user:userid}).populate('user')
    if(!posts.length){
      return  res.status(404).json({message:"No posts is available for this user"})
    }
    res.status(200).json(posts)
    }catch(error){
        res.status(500).json({message:"server error",error})
    }
    
})


router.get('/posts',async(req,res)=>{
    try{
     
    const posts=await Post.find()
    
   // const me=await User.findOne({_id:req.user.id})
    res.status(200).json({posts})
    }catch(error){
        res.status(400).json({message :"unable to fetch ",error:error.message})
    }
    
})

router.post('/:id/delete',async(req,res)=>{
    try{ 
        const newPost= await Post.findOneAndDelete({_id:req.params.id});
        const newuser=await User.findOneAndUpdate({_id:req.body.id},
            { $pull: {posts:newPost._id } },
            { new: true }
            )
    
       res.status(201).json({message :"successful ",newPost})
    }catch(err){
        res.status(400).json({messege:"failed to delete",error:err.messege})
    }

})

router.get('/:id/like/:userid',authenticateToken,async(req,res)=>{
    try{
        const userid=req.params.userid
    const post= await Post.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: {likes: userid } },
        { new: true }
      );
    
       res.status(201).json({messege:"you liked this post"})
    }catch(err){
        res.status(400).json({messege:"failed to  like",error:err.messege})
    }

})

router.get('/:id/dislike/:userid',authenticateToken,async(req,res)=>{
    try{
        const userid=req.params.userid
    const post= await Post.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: {likes: userid } },
        { new: true }
      );
    
       res.status(201).json({messege:"you disliked this post"})
    }catch(err){
        res.status(400).json({messege:"failed to  dislike",error:err.messege})
    }

})




module.exports=router;