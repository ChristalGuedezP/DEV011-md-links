// cli.js

const mdLinks = require('./index');

const filePath = process.argv[2];

mdLinks(filePath)
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.error(error.message);
  });
