#!/usr/bin/env node
//console.log("si funciona!!");
//ejecutable--importar funciones:
const { mdLinks } = require(".");
const { showStats } = require("./functions");
const path = require("path");

// La variable ruta obtiene la ruta del archivo que se pasa como tercer argumento al ejecutar el script desde la CLI
const ruta = process.argv[2]; //asigna a la variable ruta el tercer elemento del array

// Determinar si la opción --validate está presente en los argumentos de la CLI
const validateLinks = process.argv.includes("--validate");

// Determinar si la opción --stats está presente en los argumentos de la CLI
const showStatistics = process.argv.includes("--stats");

// Convertir la ruta a una ruta absoluta
const rutaAbsoluta = path.resolve(ruta); // Convierte la ruta a absoluta

// Llamar a la función mdLinks
mdLinks(rutaAbsoluta, validateLinks)
  .then((res) => {
    // Mostrar estadísticas con la opción de validación si --stats está activada
    if (showStatistics) {
      showStats(res, validateLinks); // Pasar validateLinks a showStats
    } else {
      console.log("Esta es la respuesta", res);
    }
  })
  .catch((err) => console.log("Este es el error", err));

// process.argv sería un array que contiene:
// process.argv[0]: Ruta del ejecutable de Node.js.
// process.argv[1]: Ruta del script que se está ejecutando.
// process.argv[2]: Primer argumento proporcionado por el usuario.