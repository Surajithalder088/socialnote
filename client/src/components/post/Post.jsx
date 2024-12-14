import './post.css'
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState,useEffect, useContext } from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import {format} from'timeago.js'
const api=import.meta.env.VITE_API;

const Post = ({post}) => {

    const [like,setLike]=useState(post.likes.length)
    const [isLiked,setIsLiked]=useState(false)
    const [user,setUser]=useState({})
    const {user:currentuser}=useContext(AuthContext)
    useEffect(()=>{
        setIsLiked(post.likes.includes(currentuser.existingUser._id))
         setUser(post.user)

    },[currentuser.existingUser._id,post.user])

 const deleteHandler=async()=>{
    try{ let id={
        id: currentuser.existingUser._id
    }
   
          const res=await axios.post(`${api}/post/api/v1/${post._id}/delete`,id,{withCredentials:true})
            console.log("done",res);
            
    }catch(err){
        console.log(err);
        
    }
  
 }


        let res
    const likeHandler=async()=>{
       // console.log(post._id,currentuser.existingUser._id);
        
        try{
            if(isLiked!==true){
     await axios.get(`${api}/post/api/v1/${post._id}/like/${currentuser.existingUser._id}`,{withCredentials:true})

       console.log(" liked");
       
    }else{
        await axios.get(`${api}/post/api/v1/${post._id}/dislike/${currentuser.existingUser._id}`,{withCredentials:true})
       console.log("dis liked");
       
         
    }
        }catch(error){
            console.log("error to like the post frombackend",error);
            
        }
        
        
        setLike(isLiked?like-1 : like+1)
        setIsLiked(isLiked?false : true)
        if(isLiked){}
    }
    
  return (
    <div className='post'>
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to= {`/profile/${user._id}`} style={{textDecoration:"none",color:"black"}} >
                    <img className='postProfileImage' src={
                        user.img || "http://res.cloudinary.com/dbxx49ers/image/upload/v1734202452/lml0ghr271z4xxat9ogt.png"
                    }
                   
                     alt='pic'/>
                    <span className="postUsername">
                        {user?.name||"Anoying"}
                    </span>
                    </Link>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>

                    {
                        (user._id===currentuser.existingUser._id)?(<>
                        <div className="postTopRight"  >
                    <DeleteIcon onClick={deleteHandler}/>
                   
                         </div>
                        </>):""
                    }
                


            </div>
            <div className="postCenter">
                <span className="postText">{post ?.description}</span>
                <img  className='postImg' src={post?.photo} alt=''/>
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <FavoriteIcon className={(isLiked)?'likeIcon':'icon'}  onClick={likeHandler}/>
                    <span className="postLikeCounter">{like}</span>
                    
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment} people commented</span>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Post