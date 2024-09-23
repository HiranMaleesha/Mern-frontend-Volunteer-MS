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

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    // Clear the error for this field when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "",
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Name validation
    if (!inputs.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (inputs.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputs.Gmail.trim()) {
      newErrors.Gmail = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(inputs.Gmail)) {
      newErrors.Gmail = "Invalid email format";
      isValid = false;
    }

    // Contact Number validation
    const phoneRegex = /^\d{10}$/;
    if (!inputs.ContactNo.trim()) {
      newErrors.ContactNo = "Contact number is required";
      isValid = false;
    } else if (!phoneRegex.test(inputs.ContactNo)) {
      newErrors.ContactNo = "Contact number must be 10 digits";
      isValid = false;
    }

    // Address validation
    if (!inputs.address.trim()) {
      newErrors.address = "Address is required";
      isValid = false;
    }

    // Role validation
    if (!inputs.Role) {
      newErrors.Role = "Please select a role";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
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
        <h1>Add User </h1>

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
          />
          {errors.Gmail && <span className="error">{errors.Gmail}</span>}

          <label>Contact Number:</label>
          <input
            type="text"
            name="ContactNo"
            onChange={handleChange}
            value={inputs.ContactNo}
            required
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
          />
          {errors.address && <span className="error">{errors.address}</span>}

          <label>Role:</label>
          <select
            name="Role"
            onChange={handleChange}
            value={inputs.Role}
            required
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

          <button className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
