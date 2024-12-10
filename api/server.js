
const express=require("express")
const http=require('http')
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')
const path=require('path')
const cors =require('cors')
const dotenv=require('dotenv')
dotenv.config({path:path.resolve(__dirname,'../.env')})
const app=express();
const server=http.createServer(app)
const authRoutes= require('./routes/auth')
const postRoutes= require('./routes/post')
const followRoutes= require('./routes/following')
const authenticateToken =require("./middlewares/authenticate")
const Post=require("./model/post")


{
//app.set("view engine",'ejs')
//app.set('views',path.join(__dirname,'views'))
//app.use(express.static(path.join(__dirname,'../client/dist')));

const option={
    origin:"http://localhost:5173",
    methods:"GET,POST,PUT,DELETE",
    credentials:true,
}
const __dirname=path.resolve()

app.use(express.Router());
app.use(cookieParser());
app.use(express.json())
app.use(cors(option))
app.use(express.urlencoded({extended:true}))
app.use('/auth/api/v1',authRoutes);
app.use('/post/api/v1',postRoutes);
app.use('/follow/api/v1',followRoutes);
}
app.use('/temp', express.static(path.join(__dirname,"public/temp")))

const posts=[
    {
      id:1,
      desc:"hii desc here",
      photo:'4.jpg',
      userId:1,
      date:"5/5/24",
      like:22,
      comment:5
    },
    {
      id:2,
      
     desc:"without pic like tweet",
      userId:2,
      like:2,date:"5/5/24",
      comment:5
    },
    {
      id:3,
      desc:"hii desc here",
      photo:'2.jpg',
      userId:3,
      like:42,date:"5/5/24",
      comment:5
    },
    {
      id:4,
      desc:"hii desc here",
      photo:'6.jpg',
      userId:2,
      like:25,date:"5/5/24",
      comment:5
    },
    {
      id:5,
      
      photo:'8.jpg',
      userId:4,
      like:22,date:"5/5/24",
      comment:5
    },
    {
      id:6,
      desc:"hii desc here",
      photo:'11.jpg',
      userId:1,
      like:22,date:"5/5/24",
      comment:5
    },
    {
      id:7,
      desc:"hii desc here",
      photo:'1.jpg',
      userId:1,
      like:22,date:"5/5/24",
      comment:5
    },
    {
      id:8,
      desc:"hii desc here",
      photo:'4.jpg',
      userId:4,
      like:22,date:"5/5/24",
      comment:5
    },
  ]
app.get('/api/post',async(req,res)=>{
    try{
      const post=await Post.find().sort({createdAt:-1}).populate('user')
        res.json({post})
    }catch(err){
        res.status(404).json({message:" issue"})
    }
})
app.get('/api/post/:id',async(req,res)=>{
  try{
    const id= req.params.id
    const post =posts.filter(p=>p.userId===Number(id))
    console.log(post);
    
      res.json({post})
  }catch(err){
      res.status(404).json({message:" issue"})
  }
})


if(process.env.NODE_ENV=="production"){
  app.use(express.static(path.join(__dirname,'../client/dist')))  //serving frontend on same route
  app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'../client/dist','index.html'))
})
}

const users=[{id:1,name:"raj roy",img:'1.jpg'},{id:2,name:"sarad paul",img:''},
    {id:3,name:"parad paul",img:'1.jpg'},{id:4,name:"narad paul",img:'5.jpg'}
]
app.get('/api/user/:id',async(req,res)=>{
    try{
        const id= req.params.id
        const u=users.find(user=>user.id===Number(id))
        res.json( {u})
       
        
    }catch(err){
        res.status(404).json({message:" issue"})
    }
})

/*


    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'../client/dist',index.html))
    })

*/

const dbConnect=async()=>{
    await mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true}).then(()=>{
        console.log('connected to database');
        
    }).catch((err)=>{console.log(`Failed to connect database : ${err}`)})
}

server.listen(7000,()=>{
  
    console.log('running on 7000');
      dbConnect();
})

