import React from 'react'
import "./message.css"
import {format} from'timeago.js'

const Message = ({message,own}) => {
  return (
    <div className={(own===true)?"message own" :"message"}>
        <div className="messageTop">
          {(own===true)?<>
          <p className="messageText">{message.text}</p>
            <img src="http://res.cloudinary.com/dbxx49ers/image/upload/v1733607093/mhgagojvyk3yr5stfsxx.jpg" 
            alt="" className="messageImg" />
            </>
            :<>

            <img src="http://res.cloudinary.com/dbxx49ers/image/upload/v1733607093/mhgagojvyk3yr5stfsxx.jpg" 
              alt="" className="messageImg" />
              <p className="messageText">{message.text}</p>
              </>
          }
        </div>
        <div className="messageBottom">{format(message.updatedAt)}</div>
    </div>
  )
}

export default Message