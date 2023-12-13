const path = require('path');
const { mdLinks } = require('../index.js');

describe('mdLinks', () => {
  test('should return an array of links for a valid Markdown file', () => {
    const filePath = path.join(__dirname, 'path/to/your/test.md');
    return mdLinks(filePath)
      .then((links) => {
        expect(Array.isArray(links)).toBe(true);
        expect(links.length).toBeGreaterThan(0);
        // Agrega más expectativas según sea necesario
      });
  });

  test('should reject with an error for an invalid file path', () => {
    const invalidPath = path.join(__dirname, 'invalid/path.md');
    return expect(mdLinks(invalidPath)).rejects.toThrowError('El archivo no es de tipo Markdown (.md)');
  });
});