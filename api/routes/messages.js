const router=require("express").Router();
const Message=require('../model/message')


//add
router.post("/",async(req,res)=>{
    const newMessage= new Message(req.body)
    try{
        const savedMessage=await newMessage.save()
        res.status(200).json(savedMessage)
    }catch(error){
        res.status(500).json({message:" internel server error",error})
    }
})

//get
router.get("/:conversationId",async(req,res)=>{
    try{
    const messages=await Message.find({conversationId:req.params.conversationId})
    res.status(200).json(messages)
    }catch(error){
        res.status(500).json({message:"internal server error",error})
    }
})


module.exports=router;