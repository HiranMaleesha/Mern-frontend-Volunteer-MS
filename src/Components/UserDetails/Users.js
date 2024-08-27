import React, { useEffect, useState } from 'react';
import axios from "axios";
import './Users.css'; // Make sure this matches the styles you need
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
}

function UserDetails() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users));
  }, []);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredUsers = data.users.filter((user) =>
        Object.values(user).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setUsers(filteredUsers);
      setNoResults(filteredUsers.length === 0);
    });
  }

  const handleAddUserClick = () => {
    navigate("/adduser");
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div id="app">
      <header className="header">
        <h1>Volunteer Management System</h1>
        <button className="createVolunteer" onClick={handleAddUserClick}>Add Volunteer</button>
      </header>
      <div className="search-bar">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search Volunteer details"
        />
        <button onClick={handleSearch}>Search</button>
        {noResults && <p className="no-results">No Volunteers Found</p>}
      </div>
      <div className="container">
        <div className="volunteers">
          <div className="volunteers__names">
            <h2 className="section-title">Volunteer List</h2>
            <ul className="volunteers__names--list">
              {users.map((user) => (
                <li
                  key={user._id}
                  onClick={() => handleUserClick(user)}
                  className={`volunteers__names--item ${selectedUser && selectedUser._id === user._id ? 'selected' : ''}`}
                >
                  {user.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="volunteers__single">
            <h2 className="section-title">Volunteer Information</h2>
            <div className="volunteers__single--info">
              {selectedUser ? (
                <div className="card">
                  <p><strong>Name:</strong> {selectedUser.name}</p>
                  <p><strong>Email:</strong> {selectedUser.Gmail}</p>
                  <p><strong>Contact Number:</strong> {selectedUser.ContactNo}</p>
                  <p><strong>Address:</strong> {selectedUser.address}</p>
                  <div className="actions">
                    <Link to={`/userdetails/${selectedUser._id}`} className="btn btn-primary">Update</Link>
                    <button onClick={() => handleUserClick(null)} className="btn btn-secondary">Clear</button>
                  </div>
                </div>
              ) : (
                <p>Select a volunteer to see details</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
