import React from 'react';
import '../scss/library/library.css'
import '../scss/library/sidebar.css'
import '../scss/library/playbutton.css'

function LibraryGamePage({name}) {
  return (
      <div className={"LibraryGamePage"}>
        <h2>{name}</h2>
        <button className={"LibraryGameButton"}>Play</button>
      </div>
  );
}

function SidebarGame({name}) {
  return (
      <div className={"LibrarySidebarGame"}>
        <button>{name}</button>
      </div>
  );
}

function Sidebar() {
  return (
    <div className={"LibrarySidebar"}>
      <SidebarGame name="Test"></SidebarGame>
      <SidebarGame name="Test"></SidebarGame>
    </div>
  );
}

function Library() {
  return (
      <div className={"LibraryRoot"}>
        <br/>
        <br/>
        <Sidebar/>
        <LibraryGamePage name={"Test game"}></LibraryGamePage>
      </div>
  );
}

export default Library;