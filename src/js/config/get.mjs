/*This file should get the JSON config*/
import * as get_data_dir from "../get_data_dir.mjs";
import * as fs from "fs";
import * as setup_config from './setup.mjs';

let ran_times = 0;
export let configuration;
let got_config;

export async function GetConfig() {
  if (!got_config) {
    ran_times++;
    console.log("Getting config...");
    if (ran_times > 3) {
      console.log("Error");
      process.exit(1);
    }
    console.log("Data dir is " + get_data_dir.GetDataDir());
    if (!fs.existsSync(setup_config.config_path)) {
      console.log("Config Doesnt exist");
      setup_config.WriteConfig();
      await GetConfig();
    } else {
      configuration = JSON.parse(fs.readFileSync(setup_config.config_path).toString());
      console.log("\nPrinting config.");
      console.log(JSON.stringify(configuration, null, 2));

    }
  }
  return configuration;
}