import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../scss/navbar.css'
import Home from '../home.jsx';
import Library from "../library.jsx";

const Navbar = ({navigate}) => {
  return (
      <nav className={"NavBar"}>
        <button onClick={() => {navigate('library');}}>Library</button>
        <button onClick={() => {navigate('home');}}>Home</button>
        <button>Settings</button>
      </nav>
  );
};

export default Navbar;