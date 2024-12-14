import { useContext, useEffect,useState } from 'react'
import  axios from'axios';
import { Link } from "react-router-dom";
import Online from '../online/Online'
import './rightbar.css'
import { AuthContext } from '../../context/AuthContext';
import {useNavigate}from'react-router-dom'
const api=import.meta.env.VITE_API;


const Users=[{id:1,name:"raj roy",img:'6.jpg'},{id:2,name:"sarad paul",img:'2.jpg'},
  {id:2,name:"sarad paul",img:'2.jpg'},{id:2,name:"sarad paul",img:'2.jpg'},{id:2,name:"sarad paul",img:'2.jpg'},
  {id:2,name:"sarad paul",img:'2.jpg'},{id:2,name:"sarad paul",img:'2.jpg'},{id:2,name:"sarad paul",img:'2.jpg'}
]

const Rightbar = ({userId,people}) => {

  const [friends,setFriends]=useState([])

  const[allUser,setAllUser]=useState([])
 const {user:currentuser }=useContext(AuthContext)
 const navigate=useNavigate()

  useEffect(() => {
     const allUsers=async()=>{
      try{
         const res=await axios.get(`${api}/auth/api/v1/people`)

      setAllUser(res.data.users)
      }catch(err){
        console.log(err);
        
      }

     }
     allUsers()
    }, [currentuser])


   useEffect(()=>{
      const getFriends=async()=>{
        try{
          const friendList=await axios.get(`${api}/follow/api/v1/followings/${userId}`,{withCredentials:true})
       
        setFriends(friendList.data.list)
       //  console.log(friends);
        }catch(error){
          console.log("error to get friends  :",error);
          
        }
      }
      getFriends()
    },[userId])


  const HomeRightbar=()=>{
  
    const navigator=(id)=>{
      navigate(`/profile/${id}`)
    }
    return(
      <><div className="rightbarHome">

        {
         people?"":(<>
         <div className="ad" >
         <div className="birthdayContainer">
          <img className="birthdayImg" src="http://res.cloudinary.com/dbxx49ers/image/upload/v1734202452/lml0ghr271z4xxat9ogt.png" alt=""  />
          <span className="birthdayText">Check how many of your friendshas birthday today</span>
        </div>
        <h4 className="rightbarTitle">Check new products</h4>
        <img  className="rightbarAd" 
        src="http://res.cloudinary.com/dbxx49ers/image/upload/v1733832772/fiflwmgwpgurl02hpghs.jpg"
         alt=""  />
         </div>
         </>)
        }
        


        <h4 className="rightbarTitle">New users</h4>
        <ul className="rightbarFriendList">
           {allUser.map(u=>(
            <div className='people' >
               <Link to={`/profile/${u._id}`}  style={{textDecoration:"none",color:"black"}}>
            <Online key={u._id} user={u}  />
            {
              people?(<div className='people'>
         
              <spam className="peopleAboute">followers :{u.followers.length}</spam>
              <spam className="peopleAboute">followings :{u.followers.length}</spam>
               
              <spam className="peopleAboute"> Total posts :{u.post.length}</spam>
              </div>):""
            }
            </Link>
            </div>
           ))} 
        </ul></div>
      </>
    )
  }
  const ProfileRightbar=({userId})=>{


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
          <Link to={`/profile/${friend._id}`}  style={{textDecoration:"none",color:"black"}}>
        <div className="rightbarFollowing"  style={{cursor:'pointer'}} onClick={()=>{console.log('link click')}}>
          
          <img src={friend?.img?friend.img:"/public/profile.png"}
           alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">{friend.name}</span>
          <span className="rightbarFollowingName">{friend.email}</span>
       
        </div></Link>
      ))}
      </div>
      </>
    )
  }
  return (
    <div className='rightbar' >
      <div className="rightbarWrapper">
        {userId?<ProfileRightbar userId={userId}/> :<HomeRightbar/>}
      </div>
      </div>
  )
}

export default Rightbar