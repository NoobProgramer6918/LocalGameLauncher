import React from 'react';
import { createRoot } from 'react-dom/client';
import Navbar from "./elements/navbar";

function SidebarGame({name}) {
  return (
      <div className={"LibrarySidebarGame"}>
        <p>{name}</p>
        <button>View</button>
      </div>
  );
}

function Sidebar() {
  return (
    <div className={"LibrarySidebar"}>

      <SidebarGame name="Test"></SidebarGame>
    </div>
  );
}

function Library() {
  return (
      <div>
        <br/>
        <br/>
        <Sidebar/>
      </div>
  );
}

export default Library;