import React from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'

import Rightbar from '../../components/rightbar/rightbar'
import './people.css'

const people = () => {
  return (
    <>
 
    <Topbar/>
    <div className="homeContainer">
      <Sidebar/>
     
      <Rightbar people={1}/>
      <Rightbar people={1}/>
    </div>
    
 </>
  )
}

export default people