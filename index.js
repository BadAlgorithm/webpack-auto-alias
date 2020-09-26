const path = require('path')
const fs = require('fs')

module.exports = ({workingDir, overrides}) => {
  const _workingDir =  workingDir | './src'
  const srcPathDirectory = `${__dirname}/${_workingDir}`
  const files = fs.readdirSync(srcPathDirectory, { withFileTypes: true })
  return files.reduce((aliases, file) => {
    const fileName = file.name
    const isDirectory = file.isDirectory()
    let filePath = `${_workingDir}/${fileName}`
    filePath = isDirectory ? filePath : `${fileName}/`
    const resolvePath = path.resolve(__dirname, filePath)
    const aliasName = isDirectory ? fileName : path.basename(resolvePath, '.js')
    aliases[aliasName] = resolvePath
    return aliases
  }, {})
}
