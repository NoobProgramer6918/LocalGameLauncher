import React from "react";
import '../../scss/settings.scss'

function Settings() {
  return (
      <div>
        <h1>Settings</h1>
        <br/>
        <label>Game directory. (relative to home) </label>
        <input id={"settings_game_dir"} name={"settings_game_dir"}/>
        <br/>
        <button className={"ApplyButton"}>Apply</button>
      </div>
  );
}

export default Settings;