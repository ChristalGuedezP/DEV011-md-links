//-----> pequeñas funciones: absolutas, relativas, etc
//-----> modulos que son necesarios:
const path = require('path');
const fs = require('fs').promises;
const axios = require('axios');
//-----> const { mdLinks } = require('.'); ----no esta en el codigo pero por si acaso :3

//-----> verifica si la ruta es absoluta
const isAbsolutePath = (route) => path.isAbsolute(route);
//-----> Convierte una ruta a absoluta si es relativa
const convertAbsolute = (route) => (isAbsolutePath(route) ? route : path.resolve(route));
//-----> Verifica si la extensión del archivo es .md (Markdown)
const isValidMdFile = (route) => path.extname(route) === '.md';
//-----> Lee el contenido de un archivo
const readFileContent = (route) => fs.readFile(route, 'utf-8');
//-----> Extrae los enlaces de un contenido de archivo Markdown
const extractLinks = (content, file, validate = false) => {
  //-----> Expresión regular para encontrar enlaces en formato [texto](url)
  const linkRegex = /\[([^\]]*)\]\(([^)]*)\)/g;
  const matches = [...content.matchAll(linkRegex)];

    //-----> Mapeo de enlaces con o sin validación
    const linkPromises = matches.map((match) => {
    const link = {
      text: match[1],
      href: match[2],
      file,
    };

    if (validate) {
      //-----> Validar enlace con el axios.head
      return axios.head(link.href)
        .then((response) => {
          link.status = response.status;
          link.ok = response.status >= 200 && response.status < 400 ? 'ok' : 'fail';
          return link;
        })
        .catch((error) => {
          link.status = error.response ? error.response.status : 'Unknown';
          link.ok = 'fail';
          return link;
        });
    } else {
      return link;
    }
  });

  //-----> Devuelve una promesa con todos los enlaces mapeados
  return Promise.all(linkPromises);
};
//-----> Estadisticas en general
const showStats = (links, validateLinks) => {
  const totalLinks = links.length;
  const uniqueLinks = new Set(links.map(link => link.href));

  console.log('Estadísticas:');
  console.log('Total de enlaces:', totalLinks);
  console.log('Enlaces únicos:', uniqueLinks.size);

  //-----> Estadísticas adicionales si la validación está habilitada
  if (validateLinks) {
    const validLinks = links.filter(link => link.ok === 'ok').length;
    const brokenLinks = totalLinks - validLinks;

    console.log('Links Válidos:', validLinks);
    console.log('Links Rotos:', brokenLinks);
  }
};
//-----> Exportar lo necesario para los modulos
module.exports = {
  isAbsolutePath,
  convertAbsolute,
  isValidMdFile,
  readFileContent,
  extractLinks,
  showStats,
};
