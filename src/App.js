import React from "react";
import './App.css';
import Home from "./Components/Home/Home";
import { Route,Routes } from 'react-router-dom';
import Users from "./Components/UserDetails/Users";  
import AddUser from "./Components/AddUser/AddUser";


function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/adduser" element={<AddUser/>}/>
          <Route path="/userdetails" element={<Users/>}/>
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
