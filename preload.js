const fs = require('fs')
const { contextBridge } = require('electron')

/**
 * Read content of file that should have alias
 */
const getAlias = () => {
  const aliases = []

  const data = fs.readFileSync('/Users/rafaelsantos/.zshrc', 'utf-8')

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
}

contextBridge.exposeInMainWorld('aliases', getAlias())
