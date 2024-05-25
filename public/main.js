const fs = require('fs')
const path = require('path')

function getFilePaths(folderPath) {
  const paths = []
  const files = fs.readdirSync(folderPath)
  for (const file of files) {
    const filePath = path.join(folderPath, file)
    const stats = fs.statSync(filePath)
    if (stats.isFile()) {
      paths.push(filePath)
    } else if (stats.isDirectory()) {
      const subPaths = getFilePaths(filePath)
      paths.push(...subPaths)
    }
  }
  return paths
}

const json = {
  audios: getFilePaths('audios').map(
    (path) => '/' + path.replaceAll('\\', '/')
  ),
  sprites: getFilePaths('sprites').map(
    (path) => '/' + path.replaceAll('\\', '/')
  ),
}

fs.writeFile(
  '../src/utilities/media/all-src.json',
  JSON.stringify(json),
  (err) => {
    console.log(err ?? 'Success')
  }
)
