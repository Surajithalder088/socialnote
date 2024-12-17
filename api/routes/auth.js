
const express=require("express")
const app=express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User=require("../model/user")
const authenticateToken=require('../middlewares/authenticate')

const router=express.Router();
const JWT_SECRET = '123456';

router.post('/signup',async(req,res)=>{
    const{name,email,password}=req.body;

     try{
        const existingUser=await User.findOne({email});
       
    if(existingUser) return res.json({messege:'user already exist, go to login ',existingUser})
        
        const hashedPassword = await bcrypt.hash(password, 10);
       const newUser=new User({name,email,password :hashedPassword});
       await newUser.save()
        
      

        res.status(201).json({message :"successful "})
        }catch(err){
            res.status(404).json(err);
        }
})

router.post('/login',async(req,res)=>{
    const{email,password}=req.body;

  try{
    const existingUser=await User.findOne({email})
    if(!existingUser) 
        return res.status(400).json({ error: 'Invalid credentials' });
    
       console.log(existingUser.password);
            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
           
            if(!isPasswordCorrect){
                return res.status(400).json({ error: 'Invalid credentials' })}
            console.log('token'); 
                // Generate JWT and send it as a cookie
    const token = jwt.sign({ id: existingUser._id }, JWT_SECRET, { expiresIn: '1h' });
   
    
    res.cookie('token', token, {
      httpOnly: true, // Prevents client-side access to the cookie
      secure:false, //process.env.NODE_ENV === 'production', // Only use https in production
      sameSite:'Lax',
      maxAge: 3600000, // 1 hour
    });

   let tok=req.cookies.token;
            res.status(201).json({existingUser})
        }catch(error){
            res.status(400).json({messege:'failed to logged in',err:error.message});
        }
})

router.get('/profile',authenticateToken,async(req,res)=>{
    try{
        if(!req.user) return  res.status(404).json({messege:"not logged in"})
    const user=await User.findById({_id:req.user.id}).select("-password").populate('post')
        const username=user ;
    res.status(200).json({message :"successful ",user})
   }catch(err){
    res.status(404).json({messege:"user not found"})
   }
})

router.get('/:id/profile',authenticateToken,async(req,res)=>{
    try{
        if(!req.user) return  res.status(404).json({messege:"not logged in"})
    const me=await User.findById({_id:req.user.id}).select("-password")
        const user=await User.findById({_id:req.params.id}).select("-password").populate('post')
       
    res.status(200).json({user})
   }catch(err){
    res.status(404).json({messege:"user not found"})
   }
})
router.get('/people',async(req,res)=>{
    try{
    const users=await User.find().populate('post').sort({createdAt:-1});
    //const me=await User.findOne({_id:req.user.id})
    res.status(200).json({message :"successful ",users})
    }catch(error){
        res.status(400).json({message :"unable to fetch ",error:error.message})
    }
    
})
  // Logout Route
router.post('/logout', authenticateToken,(req, res) => {
    res.clearCookie('token'); // Clears the JWT token cookie
    let user=req.user;
    res.status(200).json({message :"successful "})

  });

router.patch('/profile/update',authenticateToken,async(req,res)=>{
    try{

    const {name,img}=req.body;
    const user=await User.findOneAndUpdate({_id:req.user.id},{name,img})
    user.save(); 
        const saveduser=await User.findById({_id:req.user.id}).select("-password")
    res.status(200).json({message :"successful "})
    }catch(err){
        res.status(400).json({messese:"failed to update"})
    }
  })
  
module.exports=router;