const express=require("express")
const router=express.Router();
const Conversation=require('../model/conversation')

//new conv

router.post('/',async(req,res)=>{

const existing =await Conversation.find({members:req.body.senderId})  // getting all conversations of auth user
try{
if(existing){
    for(const e of existing){
          // finding the one conversation
        if( e.members.includes(req.body.recieverId)){
        return res.status(200).json({message:" they exist",e})
        //res.status(200).json({message:" they exist",e})
 
     }else{
       console.log("no match");
       
     }
    
    }

}

    const newConversation =new Conversation({
        members:[req.body.senderId,req.body.recieverId]
    })
   
        const savedConversation=await newConversation.save();
        res.status(200).json(savedConversation)

    }catch(error){
        res.status(500).json({message:"internal server error",error})
    }
    
})

//get conv of a user

router.get("/:userId",async(req,res)=>{
    try{
        const conversations= await Conversation.find({
            members:{$in:[req.params.userId]}
        })
        res.status(200).json(conversations)
    }catch(error){
        res.status(500).json({message:"internal server error",error})
    }
})


module.exports=router;