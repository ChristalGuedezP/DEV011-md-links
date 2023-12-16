const { mdLinks } = require('../src/index');

// Mock de las funciones dependientes
jest.mock('../src/functions', () => ({
  convertAbsolute: jest.fn(),
  isValidMdFile: jest.fn(),
  readFileContent: jest.fn(),
  extractLinks: jest.fn(),
}));

describe('mdLinks', () => {
  test('should resolve with an array of links for a valid Markdown file', async () => {
    // Definir el comportamiento específico para las funciones mock
    const validFilePath = '/path/to/valid.md';
    const validFileContent = '[Link](https://example.com)';

    require('../src/functions').convertAbsolute.mockReturnValue(validFilePath);
    require('../src/functions').isValidMdFile.mockReturnValue(true);
    require('../src/functions').readFileContent.mockResolvedValue(validFileContent);
    require('../src/functions').extractLinks.mockReturnValue([{ href: 'https://example.com', text: 'Link' }]);

    // Llamar a la función y verificar el resultado usando async/await
    const result = await mdLinks(validFilePath);

    // Verificar que el resultado sea el esperado
    expect(result).toEqual([{ href: 'https://example.com', text: 'Link' }]);
  });

  test('should reject with an error for an invalid Markdown file', async () => {
    // Definir el comportamiento para una ruta de archivo no válido
    const invalidFilePath = '/path/to/invalid.txt';

    require('../src/functions').convertAbsolute.mockReturnValue(invalidFilePath);
    require('../src/functions').isValidMdFile.mockReturnValue(false);

    // Llamar a la función y verificar que se haya rechazado con el error esperado
    await expect(mdLinks(invalidFilePath)).rejects.toThrowError('El archivo no es de tipo Markdown (.md)');
  });

  // Puedes agregar más pruebas según sea necesario para cubrir diferentes casos y condiciones.
});
