import { useContext, useEffect, useState } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import './feed.css'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'


/*
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
    
    photo:'3.jpg',
    userId:2,
    like:22,date:"5/5/24",
    comment:5
  },
  {
    id:3,
    desc:"hii desc here",
    photo:'2.jpg',
    userId:1,
    like:22,date:"5/5/24",
    comment:5
  },
  {
    id:4,
    desc:"hii desc here",
    photo:'6.jpg',
    userId:2,
    like:22,date:"5/5/24",
    comment:5
  },
  {
    id:5,
    
    photo:'8.jpg',
    userId:1,
    like:22,date:"5/5/24",
    comment:5
  },
]
*/


const Feed = ({userId}) => {
 const[posts,setPosts]=useState([])
let visible=true;
const user=useContext(AuthContext)
 const id= user.user.existingUser._id;
 if(userId && userId!==id){
  visible=false //hiding share as profile is not of auth user
 }
  useEffect( ()=>{
    const fetching=async()=>{
      let res ={};
      if(userId){
         res= await axios.get(`http://localhost:7000/post/api/v1/posts/user/${userId}`,{withCredentials:true})
       // console.log(id);
        
         
         setPosts(res.data.sort((p1,p2)=>{
          return new Date(p2.createdAt)- new Date(p1.createdAt)
         }))

      }
      else { res= await axios.get('http://localhost:7000/follow/api/v1/followings-posts',{withCredentials:true})


      setPosts(res.data.posts)

      }

    }
    fetching()
    
  },[posts])
  


  return (
    <div className='feed'>
      <div className="feedWrapper">
        {visible?<Share/>:""}
          
        
        
        {posts.map((p)=>(
        <Post key={p._id} post={p}/>  
        ))}
        
        
      </div>
      </div>
  )
}

export default Feed