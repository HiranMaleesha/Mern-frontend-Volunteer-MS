import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './User.css';


function User(props) {
  const {_id, name, Gmail, ContactNo, address } = props.user;

  const history = useNavigate();

  const deleteHandler = async() => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if(userConfirmed){
      try{
    await axios.delete(`http://localhost:5000/users/${_id}`);
    window.alert("User details deleted successfully!");
    history("/userdetails");
    window.location.reload();
  }catch(error){
    console.error("error deleting user details",error);
  }
}
  };

  return (
    <div>
      <br></br>
      <h1>ID : {_id}</h1>
      <h1>name : {name}</h1>
      <h1>Gmail : {Gmail}</h1>
      <h1>Contact number : {ContactNo}</h1>
      <h1>address : {address}</h1>
      <Link to = {`/userdetails/${_id}`}>Update</Link>
      <button onClick={deleteHandler}>Delete</button>
    </div>
  )
}
export default User;
