import React, { useEffect, useState } from 'react';
import axios from "axios";
import User from '../User/User';
import './Users.css';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
}

function UserDetails() {
  const [users, setUsers] = useState([]);
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

  return (
    <div className="user-details-container">
      <h1>Volunteer details List</h1>
      <div className="search-add-container">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search User details"
        />
        <button className='search-btn' onClick={handleSearch}>Search</button>
        
        <div className="add-user-container">
  <button className="add-user-btn" onClick={handleAddUserClick}>Add Volunteer</button>
</div>
      </div>

      {noResults ? (
        <div>
          <p>No Users Found</p>
        </div>
      ) : (
        <div className="user-list">
          {users &&
            users.map((user, i) => (
              <User key={i} user={user} />
            ))}
        </div>
      )}
    </div>
  )
}

export default UserDetails;
