import './online.css'

const Online = ({user}) => {
  return (
    <li className="rightbarFriend">
              <div className="rightbarProfileImgContainer">
                <img  className="rightbarProfileImg" 
                src={user.img?user.img:"http://res.cloudinary.com/dbxx49ers/image/upload/v1734202452/lml0ghr271z4xxat9ogt.png"}
                 alt=""/>
                <span className="rightbarOnline"></span>
              </div>
              <span className="rightbarUsername">{user.name}</span>
            </li>
  )
}

export default Online