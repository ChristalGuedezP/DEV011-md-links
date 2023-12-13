//pequeñas funciones: absolutas, relativas, etc
const path = require('path');
const fs = require('fs');

const isAbsolutePath = (route) => path.isAbsolute(route);
const convertAbsolute = (route) => (isAbsolutePath(route) ? route : path.resolve(route));
const isValidMdFile = (route) => path.extname(route) === '.md';

const readFileContent = (route) => fs.promises.readFile(route, 'utf-8');

const extractLinks = (content, file) => {
  const linkRegex = /\[([^\]]*)\]\(([^)]*)\)/g;
  const matches = [...content.matchAll(linkRegex)];
  
  const links = matches.map((match) => ({
    text: match[1], // Texto que acompaña al enlace
    href: match[2], // URL del enlace
    file, // Ruta del archivo
  }));

  return links;
};

//console.log(convertAbsolute('C:/Users/chris/OneDrive/Documentos/DEV011-md-links/docs/04-milestone.md'));//absoluta---raiz del sistema hasta el archivo
//console.log(convertAbsolute('docs/04-milestone.md'));
//console.log(isAbsolutePath('C:/Users/chris/OneDrive/Documentos/DEV011-md-links/docs/04-milestone.md'));//absoluta---raiz del sistema hasta el archivo
//console.log(isAbsolutePath('docs/04-milestone.md'));

module.exports = {
  isAbsolutePath,
  convertAbsolute,
  isValidMdFile,
  readFileContent,
  extractLinks,
};
//investigar modulo process

