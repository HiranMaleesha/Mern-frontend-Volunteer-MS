import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddUser.css";

function AddUser() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    Gmail: "",
    ContactNo: "",
    address: "",
    Role: "",
  });
  const [errors, setErrors] = useState({});
  const [validFields, setValidFields] = useState({
    name: false,
    Gmail: false,
    ContactNo: false,
    address: false,
    Role: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let isValid = true;
    let errorMessage = "";

    switch (fieldName) {
      case "name":
        if (!value.trim()) {
          errorMessage = "Name is required";
          isValid = false;
        } else if (value.trim().length < 2) {
          errorMessage = "Name must be at least 2 characters long";
          isValid = false;
        } else if (!/^[a-zA-Z\s]*$/.test(value)) {
          errorMessage = "Name can only contain letters and spaces";
          isValid = false;
        }
        break;
      case "Gmail":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          errorMessage = "Email is required";
          isValid = false;
        } else if (!emailRegex.test(value)) {
          errorMessage = "Invalid email format";
          isValid = false;
        }
        break;
      case "ContactNo":
        const phoneRegex = /^\d{10}$/;
        if (!value.trim()) {
          errorMessage = "Contact number is required";
          isValid = false;
        } else if (!phoneRegex.test(value)) {
          errorMessage = "Contact number must be 10 digits";
          isValid = false;
        }
        break;
      case "address":
        if (!value.trim()) {
          errorMessage = "Address is required";
          isValid = false;
        }
        break;
      case "Role":
        if (!value) {
          errorMessage = "Please select a role";
          isValid = false;
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));

    setValidFields((prevValidFields) => ({
      ...prevValidFields,
      [fieldName]: isValid,
    }));
  };

  const isFieldDisabled = (fieldName) => {
    const fieldOrder = ["name", "Gmail", "ContactNo", "address", "Role"];
    const currentIndex = fieldOrder.indexOf(fieldName);
    
    for (let i = 0; i < currentIndex; i++) {
      if (!validFields[fieldOrder[i]]) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(validFields).every(Boolean)) {
      console.log(inputs);
      await sendRequest();
      window.alert("User added successfully!");
      history("/userdetails");
    } else {
      console.log("Form has errors");
    }
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:5000/users", {
        name: String(inputs.name),
        Gmail: String(inputs.Gmail),
        ContactNo: String(inputs.ContactNo),
        address: String(inputs.address),
        Role: String(inputs.Role),
      })
      .then((res) => res.data);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h1>Add User</h1>

        <form onSubmit={handleSubmit} className="form">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={inputs.name}
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}

          <label>Gmail:</label>
          <input
            type="text"
            name="Gmail"
            onChange={handleChange}
            value={inputs.Gmail}
            required
            disabled={isFieldDisabled("Gmail")}
          />
          {errors.Gmail && <span className="error">{errors.Gmail}</span>}

          <label>Contact Number:</label>
          <input
            type="text"
            name="ContactNo"
            onChange={handleChange}
            value={inputs.ContactNo}
            required
            disabled={isFieldDisabled("ContactNo")}
          />
          {errors.ContactNo && (
            <span className="error">{errors.ContactNo}</span>
          )}

          <label>Address:</label>
          <input
            type="text"
            name="address"
            onChange={handleChange}
            value={inputs.address}
            required
            disabled={isFieldDisabled("address")}
          />
          {errors.address && <span className="error">{errors.address}</span>}

          <label>Role:</label>
          <select
            name="Role"
            onChange={handleChange}
            value={inputs.Role}
            required
            disabled={isFieldDisabled("Role")}
          >
            <option value="" disabled>
              Select a role
            </option>
            <option value="Singer">Singer</option>
            <option value="Dancer">Dancer</option>
            <option value="Announcer">Announcer</option>
            <option value="Entrance Team">Entrance Team</option>
            <option value="Ticket Checker">Ticket Checker</option>
          </select>
          {errors.Role && <span className="error">{errors.Role}</span>}

          <button className="submit-btn" disabled={!Object.values(validFields).every(Boolean)}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;