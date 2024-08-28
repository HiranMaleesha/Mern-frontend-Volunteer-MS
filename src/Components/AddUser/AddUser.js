import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddUser.css'; 

function AddUser() {

  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    Gmail: "",
    ContactNo: "",
    address: "",
    Role: "" 
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await sendRequest();
    window.alert("User added successfully!");
    history('/userdetails');
  }

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/users",
      {
        name: String(inputs.name),
        Gmail: String(inputs.Gmail),
        ContactNo: String(inputs.ContactNo),
        address: String(inputs.address),
        Role: String(inputs.Role) 
      }
    ).then(res => res.data);
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h1>Add User</h1>

        <form onSubmit={handleSubmit} className="form">
          <label>Name:</label>
          <input type="text" name="name" onChange={handleChange} value={inputs.name} required />

          <label>Gmail:</label>
          <input type="text" name="Gmail" onChange={handleChange} value={inputs.Gmail} required />

          <label>Contact Number:</label>
          <input type="text" name="ContactNo" onChange={handleChange} value={inputs.ContactNo} required />

          <label>Address:</label>
          <input type="text" name="address" onChange={handleChange} value={inputs.address} required />

          <label>Role:</label>
          <select name="Role" onChange={handleChange} value={inputs.Role} required>
            <option value="" disabled>Select a role</option>
            <option value="Singer">Singer</option>
            <option value="Dancer">Dancer</option>
            <option value="Announcer">Announcer</option>
            <option value="Entrance Team">Entrance Team</option>
            <option value="Ticket Checker">Ticket Checker</option>
          </select>

          <button className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default AddUser;
