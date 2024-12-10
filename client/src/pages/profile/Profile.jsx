import './profile.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/rightbar'
import { useState,useEffect, useContext } from 'react';
import axios from 'axios'
import {useParams} from 'react-router'
import { loginCall } from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';


const Profile = () => {
  const {user:currentuser}=useContext(AuthContext)
  const[followed,setFollowed]=useState(false)
  const[followfetch,setFollowfetch]=useState(false)

      const {id}=useParams();
     const userId=id;
  

  const [user,setUser]=useState({})
  /*let id=useParams().id
  console.log(id);
  id=Number(id)
  */


  const followHandler=async()=>{
    
    console.log("clicked");
    console.log(currentuser.existingUser._id);
    setFollowfetch(true)
    
    try{
      if(followed){
      const res=await axios.get(`http://localhost:7000/follow/api/v1/${userId}/out`,{withCredentials:true})
     console.log(res);
    // dispatch({type:"UNFOLLOW",payload:userId})
      
     }else{
       const res=await axios.get(`http://localhost:7000/follow/api/v1/${userId}/in`,{withCredentials:true})
      console.log(res);
     // dispatch({type:"FOLLOW",payload:userId})
     }
  
   }catch(error){
     console.log(error);
     
   } 
   setFollowed(!followed)
   setFollowfetch(false)
    
  }

  useEffect(()=>{
  const fetchFollow=async()=>{
    const response= await axios.get(`http://localhost:7000/auth/api/v1/${currentuser.existingUser._id}/profile`,{withCredentials:true})
   setFollowed(response.data.user.followings.includes(userId))
   }
   fetchFollow()
  },[userId])
  useEffect( ()=>{
    
    const fetchingUser=async()=>{
      console.log(userId);
      
    try{
      const res= await axios.get(`http://localhost:7000/auth/api/v1/${userId}/profile`,{withCredentials:true})
      console.log("this is response",res);
      
    setUser(res.data.user)
    }  catch(error){
      console.log("error",error);
      
    }
    }
    fetchingUser()
    
  },[id])

  
  return (
    < >
    <Topbar />
    <div className="profile" key={id}>
      <Sidebar/>
      <div className="profileRight">
        <div className="profileRightTop">
            <div className="profileCover">
                <img  className="profileCoverImg" src={user.img?user.img :"/public/profile.png"} alt=""/>
                <img  className="profileUserImg" src={user.img?user.img :"/public/profile.png"}alt=""/>
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.name}</h4>
                <span className="profileInfoDesc"> good human !</span>
            

            {currentuser.existingUser._id!==userId &&(
        <button className="rightbarFollowButton" onClick={followHandler}>
       {followed?"Unfollow":"Follow"}
             {followed?<CloseIcon/>:<AddIcon/>}
       
        </button>
      )}
      </div>
        </div>
        <div className="profileRightButtom">
      <Feed userId={userId}/>
      <Rightbar userId={userId}/>
      </div>
      </div>
    </div>
    </>
  )
}

export default Profile