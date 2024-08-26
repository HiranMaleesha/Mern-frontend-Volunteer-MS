import React from 'react'
import './Nav.css'
import {Link} from "react-router-dom";

function Nav() {
  return (
    <div>
      <ul className='home-ul'>
        <li className='home-ll'>
          <Link to="/" className="active home-a">
          <h1>Home</h1>
          </Link>
        </li>
        <li className='home-ll'>
        <Link to="/adduser" className="active home-a">
          <h1>Add User</h1>
          </Link>
        </li>
        <li className='home-ll'>
        <Link to="/userdetails" className="active home-a">
          <h1>user details</h1>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Nav
