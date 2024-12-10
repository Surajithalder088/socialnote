import './closeFriend.css'

const CloseFriend = ({user}) => {
  return (
    <li className="sidebarFriend">
    <img className="sidebarFriendImg"src={user.img} alt=""  />
    <span className="sidebarFriendName">{user.name}</span>
  </li>
  )
}

export default CloseFriend