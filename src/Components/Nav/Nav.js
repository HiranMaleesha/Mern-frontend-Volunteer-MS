import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className="sidebar">
      <ul className='sidebar-ul'>
        <li className='sidebar-ll'>
          <Link to="/" className="active sidebar-a">
            <h1>Home</h1>
          </Link>
        </li>
        <li className='sidebar-ll'>
          <Link to="/adduser" className="active sidebar-a">
            <h1>Add User</h1>
          </Link>
        </li>
        <li className='sidebar-ll'>
          <Link to="/userdetails" className="active sidebar-a">
            <h1>User Details</h1>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Nav;
