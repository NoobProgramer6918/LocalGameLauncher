import React, { useState, useEffect } from 'react';
import * as get_config from "../config/get.mjs";
import * as run_game from "../rungame.mjs";
import '../../scss/library/library.scss'
import '../../scss/library/sidebar.scss'
import '../../scss/library/playbutton.scss'

let current_library_game = {};

function LibraryGamePage({name, exec_path}) {
  return (
      <div className={"LibraryGamePage"}>
        <h2>{name}</h2>

        <button onClick={() => {
          run_game.RunGame(exec_path)
        }} className={"LibraryGameButton"}>Play
        </button>
      </div>
  );
}

function SidebarGame({name, executable}) {
  return (
      <div className={"LibrarySidebarGame"}>
        <button>{name}</button>
      </div>
  );
}

function GetGames({games}) {

  let games_list = [];
  for (let i = 0; i < games.length; i++) {
    games_list.push(React.createElement(SidebarGame, {
      name: games.at(i)["name"],
      executable: games.at(i)["executable"],
      key: i
    }));
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