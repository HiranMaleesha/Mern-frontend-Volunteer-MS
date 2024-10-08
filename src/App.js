import React from "react";
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Users from "./Components/UserDetails/Users";  
import AddUser from "./Components/AddUser/AddUser";
import UpdateUser from "./Components/UpdateUser/UpdateUser";



function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Users/>}/>
          <Route path="/adduser" element={<AddUser/>}/>
          <Route path="/userdetails" element={<Users/>}/>
          <Route path="/userdetails/:id" element={<UpdateUser/>}/>
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
