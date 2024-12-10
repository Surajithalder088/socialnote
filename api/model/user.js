const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
       required:true
    },
   img:{
    type:String,
    default:null
   },
    userid:{
        type:String,
      
        unique:true
    },
   email:{
    type:String,
    required:true,
        unique:true
    },
    password:{
       
        type:String,
        required:true,
    },
    post:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'Post'
    }],
    followings:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    followers:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    createdAt: { type: Date, default: Date.now },
   dateofbirth: { type: Date },

})

module.exports=mongoose.model('User', userSchema);