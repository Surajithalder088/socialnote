import React from 'react'
import"./chatOnline.css"

const ChatOnline = () => {
  return (
    <div className='chatOnline'>
        <div className="chatOnlineFriend">
            <div className="chatOnlineImgContainer">
                <img 
                className="chatOnlineImg"
                src="http://res.cloudinary.com/dbxx49ers/image/upload/v1733607093/mhgagojvyk3yr5stfsxx.jpg"
                 alt="" />
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">Raja Ray</span>
        </div>

    </div>
  )
}

export default ChatOnline