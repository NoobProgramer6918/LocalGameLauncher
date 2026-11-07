import * as check_os from "./check_os.mjs";
import * as get_os from "./check_os.mjs";
import os from "os";

const dev_prefix = "NoobProgramer/lgl";

let data_found = false;
let data_dir = "";

function DataDirOf(os_name) {
  switch (os_name) {
    case "win":
      return os.homedir() + "/AppData/Local/" + dev_prefix;
    case "linux":
      return os.homedir() + "/.config/" + dev_prefix;
    default:
      console.error("get_data_dir: Unknown OS.");
      process.exit(1);
  }
}

export function GetDataDir() {
  if (!data_found) {
    data_dir = DataDirOf(get_os.GetOS());
  }
  return data_dir;
}