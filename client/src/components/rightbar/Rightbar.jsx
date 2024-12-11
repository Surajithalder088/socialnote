import { useContext, useEffect,useState } from 'react'
import  axios from'axios';
import { Link } from "react-router-dom";
import Online from '../online/Online'
import './rightbar.css'
import { AuthContext } from '../../context/AuthContext';
import {useNavigate}from'react-router-dom'



const Users=[{id:1,name:"raj roy",img:'6.jpg'},{id:2,name:"sarad paul",img:'2.jpg'},
  {id:2,name:"sarad paul",img:'2.jpg'},{id:2,name:"sarad paul",img:'2.jpg'},{id:2,name:"sarad paul",img:'2.jpg'},
  {id:2,name:"sarad paul",img:'2.jpg'},{id:2,name:"sarad paul",img:'2.jpg'},{id:2,name:"sarad paul",img:'2.jpg'}
]

const Rightbar = ({userId}) => {

  const [friends,setFriends]=useState([])
 
 const {user:currentuser }=useContext(AuthContext)
 const navigate=useNavigate()





  const HomeRightbar=()=>{
    return(
      <><div className="rightbarHome">
         <div className="birthdayContainer">
          <img className="birthdayImg" src="/public/birth.jpg" alt=""  />
          <span className="birthdayText"><b>Pola</b> and <b>others 3 </b> have birthday today</span>
        </div>
        <p>Check new product</p>
        <img  className="rightbarAd" 
        src="http://res.cloudinary.com/dbxx49ers/image/upload/v1733832772/fiflwmgwpgurl02hpghs.jpg"
         alt=""  />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
           {Users.map(u=>(
            <Online key={u.id} user={u}/>
           ))} 
        </ul></div>
      </>
    )
  }
  const ProfileRightbar=({userId})=>{

  
   
     
   

    useEffect(()=>{
      //setFollowed(currentuser.existingUser.followings.includes(userId))
      
    },[currentuser,userId])

    useEffect(()=>{
      const getFriends=async()=>{
        try{
          const friendList=await axios.get(`http://localhost:7000/follow/api/v1/followings/${userId}`,{withCredentials:true})
       
        setFriends(friendList.data.list)
       //  console.log(friends);
        }catch(error){
          console.log("error to get friends  :",error);
          
        }
      }
      getFriends()
    },[currentuser,userId])
    

    
    return(
      <>
     
      <h4 className='rightbarTitle'>User Information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">{""}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Working:</span>
          <span className="rightbarInfoValue">{""}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarInfoValue">{""}</span>
        </div>

      </div>
       <div style={{cursor:'pointer'}} onClick={()=>{console.log("clicked");
        }}>click me</div>
      <h4 className='rightbarTitle'>User Friends </h4> 
     
      <div className="rigthbarFollowings">
       
        {friends.map(friend=>(
          
        <div className="rightbarFollowing"  style={{cursor:'pointer'}} onClick={()=>{console.log('link click')}}>
          
          <img src="/public/8.jpg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">{friend.name}</span>
          <span className="rightbarFollowingName">{friend.email}</span>
       
        </div>
      ))}
      </div>
      </>
    )
  }
  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {userId?<ProfileRightbar userId={userId}/> :<HomeRightbar/>}
      </div>
      </div>
  )
}

export default Rightbar