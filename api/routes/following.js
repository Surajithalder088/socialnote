
const express=require("express")
const app=express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User=require("../model/user");
const Post=require("../model/post")
const authenticateToken=require('../middlewares/authenticate')


const router=express.Router();
const JWT_SECRET = '123456';

router.get("/:id/in",authenticateToken,async(req,res)=>{
        try{ const ismatched=req.params.id===req.user.id ;
            if(ismatched) return res.status(400).json({message :"you can not follow yourself !"})
                    
              
                const user=await User.findByIdAndUpdate({_id:req.params.id},
                    {$addToSet :{followers:req.user.id}},
                    {new:true}
                )
                const me=await User.findByIdAndUpdate({_id:req.user.id},
                    {$addToSet :{ followings:req.params.id}},
                    {new:true}
                )
                let name=user.firstname;
             
                
                res.status(200).json({message :"started following "})

        }catch(err){
            res.status(400).json({message:"failed to follow",err})
        }
})

router.get("/:id/out",authenticateToken,async(req,res)=>{
    try{     const ismatched=req.params.id===req.user.id ;
        if(ismatched) return res.status(400).json({message :"you can not unfollow yourself !"})
            const user=await User.findOneAndUpdate({_id:req.params.id},
                {$pull :{followers:req.user.id}},
                {new:true}
            )
            const me=await User.findOneAndUpdate({_id:req.user.id},
                {$pull :{ followings:req.params.id}},
                {new:true}
            )
            let name=user.firstname;
          
            res.status(200).json({message :"started unfollowing "})
    }catch(err){
        res.status(400).json({message:"failed to unfollow",err})
    }
})

router.get('/followings-posts',authenticateToken,async(req,res)=>{
    try{
          const me=req.user.id;
        const followilg= await User.findOne({_id:me},'followings') //getting folling list and my id
        let List=followilg.followings;
           //  console.log(followilgList);
          const followilgList=List.concat(me) // to get all post including my post--list of ids
          const list=await User.find({_id:{$in:followilgList}}) //list of documents 
     
       const posts= await Post.find({user:{$in:followilgList}}).sort({createdAt:-1}).populate('user') //fetching all posts whome author is in list
       
//--------------------getting user document 
        const user= await User.findOne({_id:me})
        res.status(200).json({posts})
    }catch(err){
        res.status(400).json({message:"failed load followings posts"});
    }
      
})


router.get('/followings-posts-videos',authenticateToken,async(req,res)=>{
    try{
          const me=req.user.id;
        const followilg= await User.findOne({_id:me},'followings') //getting folling list and my id
        let List=followilg.followings;
           //  console.log(followilgList);
          const followilgList=List.concat(me) // to get all post including my post--list of ids
          const list=await User.find({_id:{$in:followilgList}}) //list of documents 
     
       const posts= await Post.find(
        {user:{$in:followilgList},photo:{$exists:true,$ne:null,$ne:''},"photo":/mp4$/}
    ).sort({createdAt:-1}).populate('user') //fetching all posts whome author is in list
       
//--------------------getting user document 
        const user= await User.findOne({_id:me})
        res.status(200).json({posts})
    }catch(err){
        res.status(400).json({message:"failed load followings posts"});
    }
      
})
// get followings list ofa authenticate user
router.get('/followings',authenticateToken,async(req,res)=>{
    try{
          const me=req.user.id;
        const followilg= await User.findOne({_id:me},'followings') //getting folling list and my id
        let followilgList=followilg.followings;
        const list=await User.find({_id:{$in:followilgList}})

         res.status(200).json({list});
    }catch(err){
        res.status(400).json({message:"failed load followings"});
    }
      
})
// get followings list ofa perticular user
router.get('/followings/:userid',authenticateToken,async(req,res)=>{
    try{
          const userid=req.params.userid;
        const followilg= await User.findOne({_id:userid},'followings') //getting folling list and my id
        let followilgList=followilg.followings;
        const list=await User.find({_id:{$in:followilgList}})

         res.status(200).json({list});
    }catch(err){
        res.status(400).json({message:"failed load followings"});
    }
      
})


module.exports=router;