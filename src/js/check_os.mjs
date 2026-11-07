import * as os from "os";
import * as process from "node:process";
import * as electron from "electron";

let operating_system = "null";
let got_os = false;

export function GetOS() {
  if (!got_os) {
    switch (os.type()) {
      case "Windows_NT":
        console.log("Windows NT");
        operating_system = "win";
        break;
      case "Linux":
        console.log("Linux");
        operating_system = "linux";
        break;
      default:
        electron.dialog.showMessageBoxSync({message: "Fih says os not supported"});
        process.exit(1);
        return null;
    }
  }
  return operating_system;
}