const { app, ipcMain, BrowserWindow } = require('electron')
const fs = require('fs')
const path = require('path')

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 1024 + 550,
    height: 720,
    backgroundColor: '#fff',
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 13, y: 10 },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile(path.join(__dirname, 'public/index.html'))
  mainWindow.webContents.openDevTools()

  /**
   * Invoke from frontend
   */
  ipcMain.handle('load-aliases', (e, path) => {
    const aliases = loadAliases(path)
    return aliases
  })

  ipcMain.handle('save-aliases', (e, filePath, aliases) => {
    saveAliases(filePath, aliases)
    return true
  })
})

/**
 * Load aliases
 */
const loadAliases = (filePath) => {
  const aliases = []

  try {
    const data = fs.readFileSync(filePath, 'utf-8')

    // Get content between those lines
    let splittedAlias = data.split('# saila-app-alias start')
    splittedAlias = splittedAlias[1].split('# saila-app-alias end')

    // Destructure aliases and explode it to array
    const aliasesString = splittedAlias[0]
      .split('\n')
      .filter((a) => a.length)
      .slice()

    // Transform alias to structured array of objects
    aliasesString.map((a) => {
      const alias = a.split('alias ')[1].split('=')[0]
      const command = a.split('=')[1].substring(1).slice(0, -1)
      aliases.push({
        alias,
        command
      })
    })

    return aliases
  } catch (err) {
    return { error: true }
  }
}

/**
 * Save aliases
 */
const saveAliases = (filePath, aliases) => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8')

    // Get content between those lines
    let firstPart = data.split('# saila-app-alias start')
    secondPart = firstPart[1].split('# saila-app-alias end')

    let newAliases = firstPart[0]
    newAliases += `
# saila-app-alias start
`
    aliases.map((a, index) => {
      newAliases += `alias ${a.alias}="${a.command}"
`
      if (index + 1 == aliases.length) {
        newAliases += `# saila-app-alias end
${secondPart[1]}`
      }
    })

    fs.writeFileSync(filePath, newAliases)
  } catch (err) {
    return { error: true }
  }
}
