/*This file should get the JSON config*/
import * as get_data_dir from "../get_data_dir.mjs";
import * as fs from "fs";
import * as setup_config from './setup.mjs';

export function GetConfig() {
  console.log("Data dir is " + get_data_dir.GetDataDir());
  if (!fs.existsSync(setup_config.config_path)) {
    console.log("Config Doesnt exist");
    setup_config.WriteConfig();
  }
}