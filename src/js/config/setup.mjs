import * as fs from "fs";
import * as url from "url";
import * as get_data_dir from "../get_data_dir.mjs";

// Locate `baseconfig.json` relative to this file, so it works regardless of the launch directory.
const base_config_path = url.fileURLToPath(new URL("./baseconfig.json", import.meta.url));

export const config_path = get_data_dir.GetDataDir() + "/config.json";

export function MakeConfig() { // Reads and returns `baseconfig.json`
  // Make it work with bundling preferably. Tho that can be done later.
  return JSON.parse(fs.readFileSync(base_config_path, "utf8"));
}

export function WriteConfig() { // This function writes the config from `MakeConfig()` to `config_path`
  fs.mkdirSync(get_data_dir.GetDataDir(), { recursive: true });
  fs.writeFileSync(config_path, JSON.stringify(MakeConfig(), null, 2) + "\n");
}