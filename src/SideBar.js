import React from 'react'
import './SideBar.css'
import logo from './assets/img/img.png'
import {Link} from 'react-router-dom'

function SideBar() {
  return (
    <div className='sidebar'>
       {/* Side Bar Header Section */}
       <div className="sidebar__header">
          <img src={logo} alt="logo" />
          <h1>StoryFlix</h1>
       </div>
       <div className="sidebar__option">
            <Link className='link' to="/">Insert Episode</Link>
            <Link className='link' to="/Insert_Albem">Insert Album</Link>
        </div>
    </div>
  )
}

export default SideBar