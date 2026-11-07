import React from 'react';
import '../../../scss/navbar.scss'

const Navbar = ({page, navigate}) => {
  return (
      <nav className={"NavBar"}>
        <button
          className={page === 'library' ? 'active' : ''}
          onClick={() => {navigate('library');}}
        >
          Library
        </button>
        <button
          className={page === 'home' ? 'active' : ''}
          onClick={() => {navigate('home');}}
        >
          Home
        </button>

        <button
            className={page === 'settings' ? 'active' : ''}
            onClick={() => {navigate('settings');}}
        >Settings</button>

      </nav>
  );
};

export default Navbar;