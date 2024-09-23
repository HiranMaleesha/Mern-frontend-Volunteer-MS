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
        Role: '' // Added Role to state
    });
    const history = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/users/${id}`);
                setInputs(response.data.user || {});
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchHandler();
    }, [id]);

    const sendRequest = async () => {
        try {
            await axios.put(`http://localhost:5000/users/${id}`, {
                name: String(inputs.name),
                Gmail: String(inputs.Gmail),
                ContactNo: String(inputs.ContactNo),
                address: String(inputs.address),
                Role: String(inputs.Role) // Added Role to the request
            });
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendRequest();
        window.alert("User details updated successfully");
        history('/userdetails');
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
                    <label>Gmail:</label>
                    <input
                        type="text"
                        name="Gmail"
                        onChange={handleChange}
                        value={inputs.Gmail || ''}
                        required
                    />
                    <label>Contact Number:</label>
                    <input
                        type="text"
                        name="ContactNo"
                        onChange={handleChange}
                        value={inputs.ContactNo || ''}
                        required
                    />
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        onChange={handleChange}
                        value={inputs.address || ''}
                        required
                    />
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
                    <button type="submit" className="submit-btn">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;
