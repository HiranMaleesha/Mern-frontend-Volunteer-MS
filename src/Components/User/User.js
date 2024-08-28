import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './User.css';

function User(props) {
  const { _id, name, Gmail, ContactNo, address,Role } = props.user;
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
    <div className="volunteer-card">
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {Gmail}</p>
      <p><strong>Contact Number:</strong> {ContactNo}</p>
      <p><strong>Address:</strong> {address}</p>
      <p><strong>Role:</strong> {Role}</p>

      <div className="action-buttons">
        <Link to={`/userdetails/${_id}`} className="update-btn">Update</Link>
        <button onClick={deleteHandler} className="delete-btn">Delete</button>
      </div>
    </div>
  );
}

export default User;
