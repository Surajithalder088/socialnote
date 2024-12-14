import './profile.css'
import EditIcon from '@mui/icons-material/Edit';
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
import SmsIcon from '@mui/icons-material/Sms';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router'
const api=import.meta.env.VITE_API;

const Profile = () => {
  const {user:currentuser}=useContext(AuthContext)
  const[followed,setFollowed]=useState(false)
  const[followfetch,setFollowfetch]=useState(false)
const navigate=useNavigate();
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
      const res=await axios.get(`${api}/follow/api/v1/${userId}/out`,{withCredentials:true})
     console.log(res);
    // dispatch({type:"UNFOLLOW",payload:userId})
      
     }else{
       const res=await axios.get(`${api}/follow/api/v1/${userId}/in`,{withCredentials:true})
      console.log(res);
     // dispatch({type:"FOLLOW",payload:userId})
     }
  
   }catch(error){
     console.log(error);
     
   } 
   setFollowed(!followed)
   setFollowfetch(false)
    
  }

  const messageHandler=async()=>{
      const conversationdata={
         senderId:currentuser.existingUser._id,
    recieverId:userId
      }
      try{
        const res =await axios.post(`${api}/conversation/api/v1/`,conversationdata)
      if(res){
    console.log(res);
        navigate("/messenger")
      }
      }catch(err){
        console.log(err);
        
      }
      

      
      
  }

  useEffect(()=>{
  const fetchFollow=async()=>{
    const response= await axios.get(`${api}/auth/api/v1/${currentuser.existingUser._id}/profile`,{withCredentials:true})
   setFollowed(response.data.user.followings.includes(userId))
   }
   fetchFollow()
  },[userId])

  useEffect( ()=>{
    
    const fetchingUser=async()=>{
      console.log(userId);
      
    try{
      const res= await axios.get(`${api}/auth/api/v1/${userId}/profile`,{withCredentials:true})
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
                <img  className="profileCoverImg"
                 src={user.img?user.img :"http://res.cloudinary.com/dbxx49ers/image/upload/v1734202452/lml0ghr271z4xxat9ogt.png"} alt=""/>

                <img  className="profileUserImg" src={user.img?user.img :"http://res.cloudinary.com/dbxx49ers/image/upload/v1734202452/lml0ghr271z4xxat9ogt.png"}alt=""/>
                
            </div>
            <div className="profileInfo">
              <div className='profileInfoName'>
                <h4 className="">{user.name}</h4>
                {
                  currentuser.existingUser._id===userId &&(
                    <EditIcon  className='editIcon'/>
                  )
                }
                
                
                </div>
                <span className="profileInfoDesc"> good human !</span>
            
    <div className="followMessage">
            {currentuser.existingUser._id!==userId &&(
        <button className="rightbarFollowButton" onClick={followHandler}>
       {followed?"Unfollow":"Follow"}
             {followed?<CloseIcon/>:<AddIcon/>}
       
        </button>
      )}
      {currentuser.existingUser._id!==userId &&(
        <button className="rightbarFollowButton" onClick={messageHandler}>
          Message
             {followed?<SmsIcon/>:<AddIcon/>}
       
        </button>
      )}</div>
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