import './online.css'

const Online = ({user}) => {
  return (
    <li className="rightbarFriend">
              <div className="rightbarProfileImgContainer">
                <img  className="rightbarProfileImg" src={user.img} alt=""/>
                <span className="rightbarOnline"></span>
              </div>
              <span className="rightbarUsername">{user.name}</span>
            </li>
  )
}

export default Online