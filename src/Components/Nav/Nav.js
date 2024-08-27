import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import { FaHome, FaUserPlus, FaUsers } from 'react-icons/fa'; // Import icons

function Nav() {
  return (
    <div className="sidebar">
      <ul className='sidebar-ul'>
        <li className='sidebar-ll'>
          <Link to="/" className="active sidebar-a">
            <FaHome className="sidebar-icon" />
            <h1>Home</h1>
          </Link>
        </li>
        <li className='sidebar-ll'>
          <Link to="/adduser" className="active sidebar-a">
            <FaUserPlus className="sidebar-icon" />
            <h1>Add User</h1>
          </Link>
        </li>
        <li className='sidebar-ll'>
          <Link to="/userdetails" className="active sidebar-a">
            <FaUsers className="sidebar-icon" />
            <h1>User Details</h1>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Nav;
