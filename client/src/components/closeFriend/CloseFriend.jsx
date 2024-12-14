import './closeFriend.css'

const CloseFriend = ({user}) => {
  return (
    <li className="sidebarFriend">
    <img className="sidebarFriendImg"src={user.img?user.img:"http://res.cloudinary.com/dbxx49ers/image/upload/v1734202452/lml0ghr271z4xxat9ogt.png"} alt=""  />
    <span className="sidebarFriendName">{user.name}</span>
  </li>
  )
}

export default CloseFriend