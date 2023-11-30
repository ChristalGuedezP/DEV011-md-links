// functions.test.js

const { mdLinks } = require('./functions');

describe('mdLinks', () => {
  it('debería resolver a un array de objetos con enlaces', () => {
    const filePath = 'ruta/al/archivo.md';

    return mdLinks(filePath).then((result) => {
      // Aquí es donde verificarías que el resultado (result) sea el esperado.
      // Puedes usar las funciones de expect de Jest para esto.
      expect(result).toEqual(/* el valor esperado */);
    });
  });

  // Agrega más pruebas según sea necesario para cubrir diferentes casos y condiciones.
});
