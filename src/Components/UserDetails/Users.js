import React, { useEffect, useState } from 'react';
import Nav from '../Nav/Nav';
import axios from "axios";
import User from '../User/User';

const URL ="http://Localhost:5000/users";

const fetchHandler = async () =>{
  return await axios.get(URL).then((res) => res.data);
}

function UserDetails() {

  const [users, setUsers] = useState();
  useEffect(()=> {
    fetchHandler().then((data) => setUsers(data.users));
  },[])


  return (
    <div>
        <Nav/>
        <h1>User details display page</h1>
        <div>
          {users && users.map((user, i) => (
            <div key={i}>
              <User user={user}/>
            </div>
          ))}
        </div>
    </div>
  )
}

export default UserDetails
