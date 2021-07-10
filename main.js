const { app, BrowserWindow } = require('electron')
const path = require('path')

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 1024 + 550,
    height: 720,
    backgroundColor: '#fff',
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile(path.join(__dirname, 'public/index.html'))
  mainWindow.webContents.openDevTools()
})
