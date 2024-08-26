import React, { useState  } from 'react'
import { useNavigate } from 'react-router-dom';
import Nav from '../Nav/Nav';
import axios from 'axios';

function AddUser() {

  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    Gmail:"",
    ContactNo:"",
    address:"",

  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
       ...prevState,
        [e.target.name]: e.target.value,
       }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history('/userdetails'))
  }

  const sendRequest = async()=>{
    await axios.post("http://localhost:5000/users",
      {
        name : String(inputs.name),
        Gmail : String(inputs.Gmail),
        ContactNo : String(inputs.ContactNo),
        address : String(inputs.address),
      }
    ).then(res => res.data);
  }

  return (
    <div>
        <Nav/>
      <h1>Add User</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Name:
        </label>
        <br></br>
        <input type="text" name="name" onChange={handleChange} value={inputs.name} required></input>
        <br></br>
        <br></br>

        <label>
          Gmail:
        </label>
        <br></br>
        <input type="text" name="Gmail" onChange={handleChange} value={inputs.Gmail} required></input>
        <br></br>
        <br></br>

        <label>
          Contact Number:
        </label>
        <br></br>
        <input type="text" name="ContactNo" onChange={handleChange} value={inputs.ContactNo} required></input>
        <br></br>
        <br></br>

        <label>
          Address:
        </label>
        <br></br>
        <input type="text" name="address" onChange={handleChange} value={inputs.address} required></input>
        <br></br>
        <br></br>

        <button>Submit</button>
      </form>
    </div>
  )
}

export default AddUser
