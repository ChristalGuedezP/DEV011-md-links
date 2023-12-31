#!/usr/bin/env node
//console.log("si funciona!!");

const { mdLinks } = require(".");
const { showStats } = require("./functions");
const path = require("path");

const ruta = process.argv[2];
const validateLinks = process.argv.includes("--validate");
const showStatistics = process.argv.includes("--stats");

const rutaAbsoluta = path.resolve(ruta); // Convierte la ruta a absoluta

mdLinks(rutaAbsoluta, validateLinks)
  .then((res) => {
    if (showStatistics) {
      showStats(res);
    } else {
      console.log("Esta es la respuesta", res);
    }
  })
  .catch((err) => console.log("Este es el error", err));