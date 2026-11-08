// const app_init = require('./init_app');
import * as electron from "electron";
import * as path from "node:path";
import InitApp from "./init_app.mjs";

const createWindow = () => {
  const win = new electron.BrowserWindow({
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  });

  win.loadFile(path.join(import.meta.dirname, "../html/index.html"));
}

electron.app.whenReady().then(() => {
  createWindow();
  InitApp();
})