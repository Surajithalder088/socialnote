import './post.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState,useEffect, useContext } from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import {format} from'timeago.js'


const Post = ({post}) => {

    const [like,setLike]=useState(post.likes.length)
    const [isLiked,setIsLiked]=useState(false)
    const [user,setUser]=useState({})
    const {user:currentuser}=useContext(AuthContext)
    useEffect(()=>{
        setIsLiked(post.likes.includes(currentuser.existingUser._id))
    },[currentuser.existingUser._id])

    useEffect( ()=>{
        const fetchingUser=async()=>{
         // const res= await axios.get(`http://localhost:7000/auth/api/v1/:id/profile`)

        setUser(post.user)
        }
        fetchingUser()
        
      },[post.user])
        let res
    const likeHandler=async()=>{
       // console.log(post._id,currentuser.existingUser._id);
        
        try{
            if(isLiked!==true){
     await axios.get(`http://localhost:7000/post/api/v1/${post._id}/like/${currentuser.existingUser._id}`,{withCredentials:true})
       console.log(" liked");
       
    }else{
        await axios.get(`http://localhost:7000/post/api/v1/${post._id}/dislike/${currentuser.existingUser._id}`,{withCredentials:true})
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
                    <Link to= {`/profile/${user._id}`} >
                    <img className='postProfileImage' src={
                        user.img || "/public/profile.png"
                    }
                   
                     alt='pic'/>
                    <span className="postUsername">
                        {user?.name||"Anoying"}
                    </span>
                    </Link>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                    <MoreVertIcon/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post ?.description}</span>
                <img  className='postImg' src={post?.photo} alt=''/>
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <FavoriteIcon className='likeIcon'  onClick={likeHandler}/>
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