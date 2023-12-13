const { convertAbsolute, isValidMdFile, readFileContent, extractLinks } = require('./functions');

function mdLinks(path) {
  return new Promise((resolve, reject) => {
    const convertedRoute = convertAbsolute(path);

    if (!isValidMdFile(convertedRoute)) {
      reject(new Error('El archivo no es de tipo Markdown (.md)'));
      return;
    }

    readFileContent(convertedRoute)
      .then((content) => {
        const links = extractLinks(content, convertedRoute);
        resolve(links);
      })
      .catch((error) => {
        reject(new Error(`Error al leer el archivo: ${error.message}`));
      });
  });
}
  //  const validateAbsolute = isAbsolutePath(path)
  //     if (validateAbsolute) {
  //       resolve(validateAbsolute)
  //     }else{
  //       reject(validateAbsolute)//al no ser absoluta lo rechaza a pesar de tener lo mismo
  
 
  module.exports = {
    mdLinks
  }
