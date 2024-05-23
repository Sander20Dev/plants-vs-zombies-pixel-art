const fs = require('fs');
const path = require('path');

function getFilePaths(folderPath) {
  const paths = [];
  const files = fs.readdirSync(folderPath);
  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
      paths.push(filePath);
    } else if (stats.isDirectory()) {
      const subPaths = getFilePaths(filePath);
      paths.push(...subPaths);
    }
  }
  return paths;
}

const folderPath = 'sprites'; // Reemplaza con la ruta de tu carpeta
const filePaths = getFilePaths(folderPath);

filePaths.forEach((filePath) => {
  console.log('\'/' + filePath.replaceAll('\\', '/') + '\',');
});
