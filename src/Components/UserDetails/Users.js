import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Users.css';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
}

function UserDetails() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users));
  }, []);

  // Search function
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
    navigate("/adduser"); // Navigate to the add user page
  };

  const handleUserClick = (user) => {
    setSelectedUser(user); // Show user details on click
  };

  return (
    <div>
      <h1>User details display page</h1>
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        name="search"
        placeholder="Search User details"
      ></input>
      <button onClick={handleSearch}> Search </button>
      <button onClick={handleAddUserClick}>Add User</button>

      {noResults ? (
        <div>
          <p>No Users Found</p>
        </div>
      ) : (
        <div className="user-list">
          <table>
            <thead>
              <tr>
                <th>Volunteer ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={i} onClick={() => handleUserClick(user)}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => navigate(`/edituser/${user.id}`)}>Edit</button>
                    <button onClick={() => navigate(`/deleteuser/${user.id}`)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedUser && (
        <div className="user-details">
          <h2>Details for {selectedUser.name}</h2>
          <p><strong>ID:</strong> {selectedUser.id}</p>
          <p><strong>Name:</strong> {selectedUser.name}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Role:</strong> {selectedUser.role}</p>
        </div>
      )}
    </div>
  );
}

export default UserDetails;
