//este es el archivo ejecutableeeeeeee
const { mdLinks } = require(".");
const path = require("path");

const ruta = process.argv[2];

// Verificar si se proporciona el parámetro --validate
const validateLinks = process.argv.includes("--validate");

mdLinks(ruta, validateLinks)
  .then((res) => console.log("Esta es la respuesta", res))
  .catch((err) => console.log("Este es el error", err));