const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({

  })

  win.loadFile(path.join(__dirname, '../html/index.html'))
}

app.whenReady().then(() => {
  createWindow()
})