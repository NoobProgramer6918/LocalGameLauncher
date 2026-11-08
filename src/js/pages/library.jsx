import React, { useState, useEffect } from 'react';
import * as get_config from "../config/get.mjs";
import '../../scss/library/library.scss'
import '../../scss/library/sidebar.scss'
import '../../scss/library/playbutton.scss'

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

function GetGames({games}) {

  let games_list = [];
  for (let i = 0; i < games.length; i++) {
    games_list.push(React.createElement(SidebarGame, {name: games.at(i)["name"]}));
  }
  return games_list;

}

function Sidebar({games}) {
  return (
      <div className={"LibrarySidebar"}>
        <GetGames games={games}/>
      </div>
  );
}

function Library() {
  const [games, setGames] = useState(null);

  useEffect(() => {
    get_config.GetConfig().then(config => {
      setGames(config?.list ?? []);
    });
  }, []);

  if (games === null) {
    return (
        <div className={"LibraryRoot"}>
          <p>Loading&hellip;</p>
        </div>
    );
  }

  return (
      <div className={"LibraryRoot"}>
        <br/>
        <br/>
        <Sidebar games={games}/>
        <LibraryGamePage name={"Test game"}></LibraryGamePage>
      </div>
  );
}

export default Library;