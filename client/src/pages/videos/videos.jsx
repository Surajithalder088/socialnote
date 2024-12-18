import React from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'

const Videos = () => {
  return (
    <>
 
    <Topbar/>
    <div className="homeContainer">
      <Sidebar/>
      <Feed video={1}/>
      {//<Rightbar people={1}/>
      }
    </div>
    
 </>
  )
}

export default Videos