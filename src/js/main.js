console.log("Lets fucking learn using bloat!!!2");

const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    win.loadFile('src/html/index.html')
}

app.whenReady().then(() => {
    createWindow()
})