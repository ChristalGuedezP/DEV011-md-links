const path = require('path');
const axios = require('axios');
const { isAbsolutePath, convertAbsolute, isValidMdFile, readFileContent, extractLinks, showStats } = require('../src/functions');

describe('isAbsolutePath', () => {
  test('should return true for absolute path', () => {
    expect(isAbsolutePath('/absolute/path')).toBe(true);
  });
  test('should return false for relative path', () => {
    expect(isAbsolutePath('relative/path')).toBe(false);
  });
});
describe('convertAbsolute', () => {
  test('should return the absolute path if it is already absolute', () => {
    const absolutePath = '/absolute/path';
    expect(convertAbsolute(absolutePath)).toBe(absolutePath);
  });
  test('should convert a relative path to absolute', () => {
    const relativePath = 'relative/path';
    const expectedPath = path.join(process.cwd(), relativePath);
    expect(convertAbsolute(relativePath)).toBe(expectedPath);
  });
});
describe('isValidMdFile', () => {
  test('should return true for a valid .md file', () => {
    const validMdFilePath = 'valid.md';
    expect(isValidMdFile(validMdFilePath)).toBe(true);
  });
  test('should return false for a non-Markdown file', () => {
    const nonMdFilePath = 'invalid.txt';
    expect(isValidMdFile(nonMdFilePath)).toBe(false);
  });
  describe('readFileContent', () => {
    test('should read content from an existing file', () => {
      const filePath = './src/pruebas.md';
  
      return readFileContent(filePath).then(content => {
        const expectedContent = [
          '[Link Job Prep](https://laboratoria1.gitbook.io/jobprep-dev-es/ruta-a-busqueda-de-vacantes)',
          '[Google](https://google.com)',
          '[Link de node](https://nodejs.org/)',
          '[Link de nada （っ＾▿＾）](https://naditajsorg/)',
        ];
  
        expectedContent.forEach(expectedLine => {
          expect(content).toContain(expectedLine);
        });
      }).catch(error => {
        console.error('Error during readFileContent test:', error);
        throw error;
      });
    });
  
    test('should reject with an error for a non-existing file', () => {
      const nonExistingFilePath = 'nonexistent.md';
  
      return expect(readFileContent(nonExistingFilePath)).rejects.toThrowError('ENOENT: no such file or directory');
    });
  });
  describe('showStats', () => {
    test('should display correct statistics for links', () => {
      // Mock data for testing
      const links = [
        { href: 'https://example.com/page1', text: 'Page 1' },
        { href: 'https://example.com/page2', text: 'Page 2' },
        { href: 'https://example.com/page1', text: 'Page 1' },
        { href: 'https://example.com/page3', text: 'Page 3' },
      ];
  
      // Mock console.log to capture the output
      const consoleLogSpy = jest.spyOn(console, 'log');
      consoleLogSpy.mockImplementation(() => {});
  
      // Call the function
      showStats(links);
  
      // Assertions
      expect(consoleLogSpy).toHaveBeenCalledWith('Estadísticas:');
      expect(consoleLogSpy).toHaveBeenCalledWith('Total de enlaces:', links.length);
  
      const uniqueLinks = new Set(links.map(link => link.href));
      expect(consoleLogSpy).toHaveBeenCalledWith('Enlaces únicos:', uniqueLinks.size);
  
      // Restore console.log
      consoleLogSpy.mockRestore();
    });
  });
  describe('extractLinks', () => {
    it('should extract links with validation', async () => {
      // Contenido y archivo de ejemplo
      const content = '[Ejemplo 1](https://example.com/1)\n[Ejemplo 2](https://example.com/2)';
      const file = 'example.md';
  
      // Simula la respuesta de axios.head sin realizar una solicitud HTTP real
      const mockedAxiosHead = jest.fn((url) => Promise.resolve({ status: 200 }));
      axios.head = mockedAxiosHead;
  
      // Llama a la función extractLinks con validación
      const links = await extractLinks(content, file, true);
  
      // Verifica que los enlaces sean los esperados
      expect(links).toEqual([
        { text: 'Ejemplo 1', href: 'https://example.com/1', file, status: 200, ok: 'ok' },
        { text: 'Ejemplo 2', href: 'https://example.com/2', file, status: 200, ok: 'ok' },
      ]);
  
      // Verifica que axios.head haya sido llamado correctamente
      expect(mockedAxiosHead).toHaveBeenCalledWith('https://example.com/1');
      expect(mockedAxiosHead).toHaveBeenCalledWith('https://example.com/2');
    });
  });
  });