const { app, ipcMain, BrowserWindow } = require('electron')
const fs = require('fs')
const path = require('path')
const isDev = require('electron-is-dev')

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 1024 + (isDev ? 550 : 0),
    height: 720,
    backgroundColor: '#fff',
    titleBarStyle: 'hidden',
    autoHideMenuBar: true,
    trafficLightPosition: { x: 13, y: 10 },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.removeMenu()

  mainWindow.loadFile(path.join(__dirname, 'public/index.html'))
  if (isDev) {
    mainWindow.webContents.openDevTools()
  }

  /**
   * Invoke from frontend
   */
  ipcMain.handle('load-aliases', (e, path) => {
    const aliases = loadAliases(path)
    return aliases
  })

  ipcMain.handle('save-aliases', (e, filePath, aliases) => {
    const err = saveAliases(filePath, aliases)
    return err
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
    if (typeof splittedAlias[1] !== 'undefined') {
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
    }

    return []
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
    let splittedFileContent = data.split(`# saila-app-alias start`)

    // Check if there is alias in the file and prepare content
    let lastPart = ''
    let firstPart = ''
    if (typeof splittedFileContent[1] !== 'undefined') {
      secondPart = splittedFileContent[1].split(`# saila-app-alias end\n`)
      firstPart = splittedFileContent[0]
      lastPart = secondPart[1]
    } else {
      firstPart = `${splittedFileContent[0]}\n`
      lastPart = ''
    }

    // Structure correct alias contents
    let newAliases = firstPart
    newAliases += `# saila-app-alias start\n`
    aliases.map((a, index) => {
      newAliases += `alias ${a.alias}="${a.command}"\n`
      if (index + 1 == aliases.length) {
        newAliases += `# saila-app-alias end\n${lastPart}`
      }
    })

    fs.writeFileSync(filePath, newAliases, { mode: 0o777 })
  } catch (err) {
    return { error: err }
  }
}
