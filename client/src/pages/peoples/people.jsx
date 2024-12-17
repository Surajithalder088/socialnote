import React from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'

import Rightbar from '../../components/rightbar/rightbar';
import './people.css'

const People = () => {

  let people=1;
  return (
    <>
 
    <Topbar/>
    <div className="homeContainer">
      <Sidebar/>
     
      <Rightbar people={people}/>
      
    </div>
    
 </>
  )
}

export default People