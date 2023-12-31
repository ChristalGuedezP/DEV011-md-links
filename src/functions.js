//pequeñas funciones: absolutas, relativas, etc
const path = require('path');
const fs = require('fs').promises;
const axios = require('axios');
// const { mdLinks } = require('.');

const isAbsolutePath = (route) => path.isAbsolute(route);
const convertAbsolute = (route) => (isAbsolutePath(route) ? route : path.resolve(route));
const isValidMdFile = (route) => path.extname(route) === '.md';

const readFileContent = (route) => fs.readFile(route, 'utf-8');

const extractLinks = (content, file, validate = false) => {
  const linkRegex = /\[([^\]]*)\]\(([^)]*)\)/g;
  const matches = [...content.matchAll(linkRegex)];

  const linkPromises = matches.map((match) => {
    const link = {
      text: match[1],
      href: match[2],
      file,
    };

    if (validate) {
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

  return Promise.all(linkPromises);
};

const showStats = (links) => {
  const totalLinks = links.length;
  const uniqueLinks = new Set(links.map(link => link.href));

  console.log('Estadísticas:');
  console.log('Total de enlaces:', totalLinks);
  console.log('Enlaces únicos:', uniqueLinks.size);
};

module.exports = {
  isAbsolutePath,
  convertAbsolute,
  isValidMdFile,
  readFileContent,
  extractLinks,
  showStats,
};
