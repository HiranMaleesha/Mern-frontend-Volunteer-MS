import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function UpdateUser() {
    const [inputs, setInputs] = useState({
        name: '',
        Gmail: '',
        ContactNo: '',
        address: ''
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
        history('/userdetails');
    };

    return (
        <div>
            <h1>Update User</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                </label>
                <br />
                <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={inputs.name || ''}
                    required
                />
                <br /><br />

                <label>
                    Gmail:
                </label>
                <br />
                <input
                    type="text"
                    name="Gmail"
                    onChange={handleChange}
                    value={inputs.Gmail || ''}
                    required
                />
                <br /><br />

                <label>
                    Contact Number:
                </label>
                <br />
                <input
                    type="text"
                    name="ContactNo"
                    onChange={handleChange}
                    value={inputs.ContactNo || ''}
                    required
                />
                <br /><br />

                <label>
                    Address:
                </label>
                <br />
                <input
                    type="text"
                    name="address"
                    onChange={handleChange}
                    value={inputs.address || ''}
                    required
                />
                <br /><br />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default UpdateUser;
