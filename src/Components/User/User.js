import React from 'react'

function User(props) {
  const {_id, name, Gmail, ContactNo, address } = props.user;
  return (
    <div>
      <br></br>
      <h1>ID : {_id}</h1>
      <h1>name : {name}</h1>
      <h1>Gmail : {Gmail}</h1>
      <h1>Contact number : {ContactNo}</h1>
      <h1>address : {address}</h1>
      <button>Update</button>
      <button>Delete</button>
    </div>
  )
}

export default User;
