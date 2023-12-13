//este es el archivo ejecutableeeeeeee
const { mdLinks } = require("..");

const validateLinks = process.argv.includes("--validate")
//console.log('Soy el process argv: ', process.argv);
const ruta = process.argv[2]
console.log(validateLinks, ruta);


mdLinks('src/pruebas.md')
//mdLinks('C:/Users/chris/OneDrive/Documentos/DEV011-md-links/docs/04-milestone.md')
//mdLinks(ruta)
//mdLinks(ruta, { validate: validateLinks })
.then(res => console.log("esta es la respuesta", res))
.catch(err => console.log("este es el error", err))
