import InitApp from "./init_app";

const { app, BrowserWindow } = require('electron')
const path = require('path');

InitApp();

const createWindow = () => {
  const win = new BrowserWindow({

  })

  win.loadFile(path.join(__dirname, '../html/index.html'))
}

app.whenReady().then(() => {
  createWindow()
})