import React, { useEffect, useState } from "react";
import axios from "axios";
import User from "../User/User";
import "./Users.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  const response = await axios.get(URL);
  console.log(response.data);
  return response.data;
};

function UserDetails() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHandler().then((data) => {
      console.log(data.users);
      setUsers(data.users);
    });
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
  };

  const handleAddUserClick = () => {
    navigate("/adduser");
  };

  const generateReport = () => {
    const doc = new jsPDF();

    // Add table headers
    const tableHeader = ["Name", "Contact", "Email", "Role", "Address"];

    // Prepare table data
    const tableData = users.map((user) => [
      user.name,
      user.ContactNo,
      user.Gmail,
      user.Role,
      user.address,
    ]);

    doc.autoTable({
      head: [tableHeader],
      body: tableData,
      styles: {
        fontStyle: "bold",
        fontSize: 12,
        cellPadding: 10,
        overflow: "linebreak",
      },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 30 },
        2: { cellWidth: 40 },
        3: { cellWidth: 30 },
        4: { cellWidth: 50 },
      },
    });

    doc.save("user_details_report.pdf");
  };

  return (
    <div className="user-details-container" id="user-details-container">
      <div className="report-container">
        <button className="report-btn" onClick={generateReport}>
          Generate Report
        </button>
      </div>
      <h1>Volunteer Details List</h1>
      <div className="search-add-container">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search User details"
        />
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
        <div className="add-user-container">
          <button className="add-user-btn" onClick={handleAddUserClick}>
            Add Volunteer
          </button>
        </div>
      </div>

      {noResults ? (
        <div>
          <p>No Users Found</p>
        </div>
      ) : (
        <div className="user-list">
          {users && users.map((user, i) => <User key={i} user={user} />)}
        </div>
      )}
    </div>
  );
}

export default UserDetails;