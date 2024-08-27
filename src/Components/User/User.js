import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './User.css';

function User(props) {
  const { _id, name, Gmail, ContactNo, address } = props.user;
  const navigate = useNavigate();

  const deleteHandler = async () => {
    const userConfirmed = window.confirm("Are you sure you want to delete this volunteer?");
    if (userConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/users/${_id}`);
        window.alert("Volunteer details deleted successfully!");
        navigate("/userdetails");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting volunteer details", error);
      }
    }
  };

  return (
    <div className="volunteer">
      <h2>Volunteer Information</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {Gmail}</p>
      <p><strong>Contact Number:</strong> {ContactNo}</p>
      <p><strong>Address:</strong> {address}</p>

      <Link to={`/userdetails/${_id}`}>Update</Link>
      <button onClick={deleteHandler}>Delete</button>
    </div>
  );
}

export default User;
