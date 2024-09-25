import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateUser.css';

function UpdateUser() {
    const [inputs, setInputs] = useState({
        name: '',
        Gmail: '',
        ContactNo: '',
        address: '',
        Role: ''
    });
    const [errors, setErrors] = useState({});
    const [validFields, setValidFields] = useState({
        name: true,
        Gmail: true,
        ContactNo: true,
        address: true,
        Role: true
    });
    const history = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/users/${id}`);
                setInputs(response.data.user || {});
                // Validate all fields after fetching
                Object.keys(response.data.user).forEach(key => 
                    validateField(key, response.data.user[key])
                );
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchHandler();
    }, [id]);

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

        setErrors(prevErrors => ({
            ...prevErrors,
            [fieldName]: errorMessage
        }));

        setValidFields(prevValidFields => ({
            ...prevValidFields,
            [fieldName]: isValid
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevState => ({
            ...prevState,
            [name]: value,
        }));
        validateField(name, value);
    };

    const sendRequest = async () => {
        try {
            await axios.put(`http://localhost:5000/users/${id}`, {
                name: String(inputs.name),
                Gmail: String(inputs.Gmail),
                ContactNo: String(inputs.ContactNo),
                address: String(inputs.address),
                Role: String(inputs.Role)
            });
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(validFields).every(Boolean)) {
            await sendRequest();
            window.alert("User details updated successfully");
            history('/userdetails');
        } else {
            console.log("Form has errors");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h1>Update User</h1>
                <form onSubmit={handleSubmit} className="form">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={inputs.name || ''}
                        required
                    />
                    {errors.name && <span className="error">{errors.name}</span>}

                    <label>Gmail:</label>
                    <input
                        type="text"
                        name="Gmail"
                        onChange={handleChange}
                        value={inputs.Gmail || ''}
                        required
                    />
                    {errors.Gmail && <span className="error">{errors.Gmail}</span>}

                    <label>Contact Number:</label>
                    <input
                        type="text"
                        name="ContactNo"
                        onChange={handleChange}
                        value={inputs.ContactNo || ''}
                        required
                    />
                    {errors.ContactNo && <span className="error">{errors.ContactNo}</span>}

                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        onChange={handleChange}
                        value={inputs.address || ''}
                        required
                    />
                    {errors.address && <span className="error">{errors.address}</span>}

                    <label>Role:</label>
                    <select
                        name="Role"
                        onChange={handleChange}
                        value={inputs.Role || ''}
                        required
                    >
                        <option value="" disabled>Select a role</option>
                        <option value="Singer">Singer</option>
                        <option value="Dancer">Dancer</option>
                        <option value="Announcer">Announcer</option>
                        <option value="Entrance Team">Entrance Team</option>
                        <option value="Ticket Checker">Ticket Checker</option>
                    </select>
                    {errors.Role && <span className="error">{errors.Role}</span>}

                    <button type="submit" className="submit-btn" disabled={!Object.values(validFields).every(Boolean)}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;