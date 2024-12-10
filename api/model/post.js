const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({
    photo:{
        type:String,
      
    },
    description:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required:true
    },
 
  
    likes:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    comment:{
        type:Number
    },

   
 
    createdAt: { type: Date, default: Date.now },
   dateofbirth: { type: Date },

})

module.exports=mongoose.model('Post', postSchema);