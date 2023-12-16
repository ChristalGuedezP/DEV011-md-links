const { convertAbsolute, isValidMdFile, readFileContent, extractLinks } = require("./functions");

function mdLinks(path, validate = false) {
  return new Promise((resolve, reject) => {
    const convertedRoute = convertAbsolute(path);

    if (!isValidMdFile(convertedRoute)) {
      reject(new Error("El archivo no es de tipo Markdown (.md)"));
      return;
    }

    readFileContent(convertedRoute)
      .then((content) => {
        const links = extractLinks(content, convertedRoute, validate);
        resolve(links);
      })
      .catch((error) => {
        reject(new Error(`Error al leer el archivo: ${error.message}`));
      });
  });
}

module.exports = {
  mdLinks,
};