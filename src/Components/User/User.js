import React from 'react'
import { Link } from 'react-router-dom';

function User(props) {
  const {_id, name, Gmail, ContactNo, address } = props.user;

  console.log("User ID:", _id);
  return (
    <div>
      <br></br>
      <h1>ID : {_id}</h1>
      <h1>name : {name}</h1>
      <h1>Gmail : {Gmail}</h1>
      <h1>Contact number : {ContactNo}</h1>
      <h1>address : {address}</h1>
      <Link to = {`/userdetails/${_id}`}>Update</Link>
      <button>Delete</button>
    </div>
  )
}

export default User;
